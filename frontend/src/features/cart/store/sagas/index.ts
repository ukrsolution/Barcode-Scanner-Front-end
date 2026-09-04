import { SagaIterator } from "redux-saga";
import { call, delay, fork, put, select, takeEvery } from "redux-saga/effects";
import * as cartActions from "../actions";
import * as searchActions from "../../../../store/search/actions";
import * as settingsActions from "../../../../store/settings/actions";
import * as postsActions from "../../../../store/posts/actions";
import * as logActions from "../../../../store/log/actions";
import * as services from "../../../../services";
// import * as actionsSounds from "../../../features/sounds/store/actions";
import { getSearchFilter } from "../../../../store/search/sagas";
import { resetBeforeSearch } from "../../../../store/posts/sagas";
import { CartDetailsProps } from "../models";
import { CartItemProps } from "../models";
import { prepareErrors } from "../../../../hooks/errors";
import { Selectors as selectors } from "../selectors";
import { foundBy, nothingIsFound } from "../../../../helpers/search";
import { Selectors as customSearchFiltersSelectors } from "../../../../store/customSearchFilters/selectors";
import * as usersSelectors from "../../../../store/users/selectors";
import * as settingsSelectors from "../../../../store/settings/selectors";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import { ActionType } from "typesafe-actions";

let canCartUpdateMessage = true;

function* getCurrentItems(): SagaIterator {
    const items = yield select(selectors.getCartItems);

    return items.map((i: any): CartItemProps => {
        return {
            ID: i.ID,
            post_parent: i.post_parent,
            post_type: i.post_type,
            product_type: i.product_type,
            variation_id: i.variation_id,
            quantity: i.quantity,
            previousQuantity: i.quantity,
            attributes: i.variation || {},
            cartKey: i.cart_key || "",
            updatedAction: ''
        };
    });
}

function* markUpdatedItems(currentItems: Array<any>, newItems: Array<any>) {
    try {
        return newItems.map((n: any) => {
            // find previous item
            const prevItem: any = currentItems.find((p: any) =>
                p.ID === n.ID
                && p.variation_id === n.variation_id
                && p.post_parent === n.post_parent
                && JSON.stringify(p.attributes) === JSON.stringify(n.variation)
            );

            // find changes
            if (prevItem && prevItem.ID) {
                // check quantity
                if (prevItem.quantity !== n.quantity) n.updatedAction = 'quantity';
                else n.updatedAction = prevItem.updatedAction;
            } else {
                // new item
                n.updatedAction = 'new';
            }

            return n;
        });
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `markUpdatedItems. ${e.message}`, error: e }));
        return newItems;
    }
}

function* addItemQty({ payload: { query, qty } }: ActionType<typeof cartActions.actions.addItemQty>): SagaIterator {
    try {
        yield put(cartActions.actions.updateItemQuantityLoader({ status: true }));
        yield put(cartActions.actions.addItem({ query, byId: true, autoFill: false, setQty: qty }));
    } catch (e: any) {
        if (!e.cancelStatus) {
            yield put(logActions.actions.logError({ message: `addItemQty. ${e.message}`, error: e }));
            yield put(cartActions.actions.updateItemQuantityLoader({ status: false }));
        }
    }
}

function* addItem({ payload: { query, autoFill = false, byId, setQty } }: ActionType<typeof cartActions.actions.addItem>): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
        yield call(resetBeforeSearch);

        // clear custom order price
        if (!autoFill) yield put(cartActions.actions.setCustomOrderPrice({ price: undefined }));

        const orderId: number | null = null;
        const filter = yield call(getSearchFilter);
        const currentItems = yield call(getCurrentItems);
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);

        const data: any = yield call(services.cart.addItem, { query, filter, currentItems, orderId, autoFill, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, byId, setQty });
        const foundProducts: Array<any> = data?.foundProducts || [];
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const findByTitle: boolean = data?.findByTitle || false;
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

        // mark items which was updated
        const newCartItems: Array<any> = yield call(markUpdatedItems, currentItems, cartItems);

        // show modal to change item quantity
        if (data.increase_qty && data.item) {
            yield put(cartActions.actions.updateQty({ item: data.item }));
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
            yield put(cartActions.actions.updateItemQuantityLoader({ status: false }));
            return;
        } else {
            yield put(cartActions.actions.updateQty({ item: {} }));
        }

        // update cart items
        yield put(cartActions.actions.updateItemsList({ list: newCartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));

        if (cartErrors.length) {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message: cartErrors.join(", "),
                type: searchActions.messageTypes.ERROR,
                query: "",
                params: {}
            }));
        } else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message: foundBy(query),
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: {}
            }));
        }

        if (foundProducts.length && (findByTitle === true || autoFill === true)) {
            // show products list
            yield put(postsActions.actions.updatePostsList({ list: foundProducts }));
            yield put(postsActions.actions.updatePreviousPostsList({ list: foundProducts }));
        } else if (
            cartErrors.length
            && foundProducts.length === 1
            && foundProducts[0].post_type === 'product_for_cart'
            && Object.keys(foundProducts[0].requiredAttributes).length) {
            // show product required attributes
            yield put(cartActions.actions.updateItemAttributes({ item: foundProducts[0] }));
        } else if (!foundProducts.length) {
            // not found
            // yield put(actionsSounds.soundPlay(actionsSounds.tones.fail));
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message: nothingIsFound(query),
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: {}
            }));
        }

        yield put(cartActions.actions.itemsScrollBottom());
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(cartActions.actions.updateItemQuantityLoader({ status: false }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `addItem. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(cartActions.actions.updateItemQuantityLoader({ status: false }));
    }

    yield put(searchActions.actions.finished());
}

function* removeItem({ payload: { cartKey } }: any): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));

        const orderId: number | null = null;
        const currentItems = yield call(getCurrentItems);
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);
        const newCurrentItems = currentItems.filter((item: any) => item.cartKey !== cartKey);

        const data: any = yield call(services.cart.removeItem, cartKey, newCurrentItems, orderId, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId);
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

        // update cart items
        yield put(cartActions.actions.updateItemsList({ list: cartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message: cartErrors.join(", "),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `removeItem. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }

    yield put(searchActions.actions.finished());
}

function* updateItemQuantity({ payload: { quantity, itemIndex, productQty } }: any): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));

        // get cart list
        let currentItems: Array<any> = yield call(getCurrentItems);
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);

        // change quantity
        currentItems = currentItems.map((item: any, index: number) => {
            return index === itemIndex ? { ...item, quantity, previousQuantity: item.quantity } : item;
        });

        const data: any = yield call(services.cart.updateQuantity, { currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, productQty });
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

        // show modal to change item quantity
        if (data.increase_qty && data.item) {
            // add extra data
            data.item.updateQtyData = { newQty: quantity, itemIndex, action: "updateQuantity" };
            yield put(cartActions.actions.updateQty({ item: data.item }));
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
            yield put(cartActions.actions.updateItemQuantityLoader({ status: false }));
            yield put(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
            return;
        } else {
            yield put(cartActions.actions.updateQty({ item: {} }));
        }

        // // update cart items
        yield put(cartActions.actions.updateItemsList({ list: cartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message: cartErrors.join(", "),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));

    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `updateItemQuantity. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }

    yield put(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    yield put(searchActions.actions.finished());
}

function* updateAttributes({ payload: { item, attributes } }: any): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));

        // get cart list
        let currentItems: Array<CartItemProps> = yield call(getCurrentItems);

        // add new product to list
        const newItem: CartItemProps = {
            ID: item.ID,
            post_parent: item.post_parent,
            post_type: item.post_type,
            product_type: item.product_type,
            variation_id: item.variation_id,
            quantity: 1,
            previousQuantity: 1,
            attributes: attributes,
            updatedAction: 'new',
            cartKey: item.cart_key
        };
        currentItems.push(newItem);

        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);

        const data: any = yield call(services.cart.updateAttributes, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId);
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

        // mark items which was updated
        const newCartItems: Array<any> = yield call(markUpdatedItems, currentItems, cartItems);

        // update cart items
        yield put(cartActions.actions.updateItemsList({ list: newCartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message: cartErrors.join(", "),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(cartActions.actions.updateItemAttributes({ item: {} }));

    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `updateAttributes. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }

    yield put(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    yield put(searchActions.actions.finished());
}

function* orderCreate({ payload: { isOpen, userId, extraData } }: any): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
        canCartUpdateMessage = false;

        let orderId: number | null = null;
        const currentItems = yield call(getCurrentItems);
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        let orderStatus = yield select(selectors.getNewOrderStatus);
        const shippingMethod = yield select(selectors.getNewOrderShipping);
        const paymentMethod = yield select(selectors.getNewOrderPayment);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);

        orderStatus = "wc-pending"
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);
        const orderAdminUrl: string = data?.orderAdminUrl || "";
        orderId = data?.orderId || orderId;

        if (isOpen && orderId && orderAdminUrl) {
            // open order in a new tab
            window.open(orderAdminUrl, "_blank");
        } else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message: cartErrors.join(", "),
                type: searchActions.messageTypes.ERROR,
                query: "",
                params: {}
            }));
        }

        if (orderId) {
            // reset cart items
            yield put(cartActions.actions.updateItemsList({ list: [] }));
            yield put(cartActions.actions.updateDetails({ details: { cart_subtotal: "", cart_subtotal_c: "", cart_total: "", cart_total_c: "", total_tax: "", total_tax_c: "", shipping: "", shipping_c: "", shipping_tax: "" } }));

            yield put(cartActions.actions.orderCreated({ id: orderId, url: orderAdminUrl }));
        }
        else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message: cartErrors.join(", "),
                type: searchActions.messageTypes.ERROR,
                query: "",
                params: {}
            }));
        }

        if (!orderId) {
            // update cart items
            yield put(cartActions.actions.updateItemsList({ list: cartItems }));
            yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        }

        canCartUpdateMessage = false;
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `orderCreate. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }

    yield put(searchActions.actions.finished());
}

function* clearCart(): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));

        const orderId: number | null = null;
        const data: any = yield call(services.cart.clear, orderId);
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};

        // update cart items
        yield put(cartActions.actions.updateItemsList({ list: cartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        yield put(cartActions.actions.orderCreated({ id: 0, url: '' }));

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));

        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message: "",
            type: searchActions.messageTypes.GENERAL,
            query: "",
            params: {}
        }));

    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `clearCart. ${e.message}`, error: e }));
        const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message,
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }

    yield put(searchActions.actions.finished());
}

function* getStatuses(): SagaIterator {
    try {
        const data: any = yield call(services.cart.getStatuses);
        const statuses: Array<any> = data?.statuses || {};

        yield put(cartActions.actions.updateStatuses({ statuses }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `getStatuses. ${e.message}`, error: e }));
    }
}

// function* prepareOldItems(): SagaIterator {
//     try {
//         const oldItems: Array<any> = yield select(selectors.getCartItems);
//         const items: Array<any> = oldItems.map((item: any) => {
//             return { ...item, updatedAction: "" }
//         });

//         yield put(cartActions.updateItemsList(items));
//     } catch (e: any) {
//         if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `prepareOldItems. ${e.message}`, error: e }));
//     }
// }

function* restoreCart(): SagaIterator {
    try {
        yield call(recalculate, false, false);
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `restoreCart. ${e.message}`, error: e }));
    }
}

function* clearOldData(): SagaIterator {
    try {
        yield put(cartActions.actions.orderCreated({ id: 0, url: '' }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `clearOldData. ${e.message}`, error: e }));
    }
}

function* updateCustomPrices({ payload: { list } }: any): SagaIterator {
    try {
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);

        for (const item of list) {
            if (itemsCustomPrices[item.ID] !== undefined) {
                yield put(cartActions.actions.setCustomItemPrice({ itemId: item.ID, price: item.line_price, cartKey: item.cart_key ?? "" }));
            }
        }
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `updateCustomPrices. ${e.message}`, error: e }));
    }
}

function* newOrderShipping({ payload: { isRecalculate = true } }: any): SagaIterator {
    try {
        if (isRecalculate) yield call(recalculate, false, false, true);
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `newOrderShipping. ${e.message}`, error: e }));
    }
}

function* recalculate(isCheck: any, preloader = true, isExtraFields = false): SagaIterator {
    try {
        if (isCheck !== true && preloader) yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
        else if (isExtraFields) yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));

        const currentItems = yield call(getCurrentItems);
        const itemsCustomPrices = yield select(selectors.getItemsCustomPrices);
        const orderCustomPrice = yield select(selectors.getOrderCustomPrice);
        const orderCustomSubPrice = yield select(selectors.getOrderCustomSubPrice);
        const orderCustomTax = yield select(selectors.getOrderCustomTax);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const orderUserId = yield select(usersSelectors.getOrderUserId);
        let shippingMethod = "";
        let paymentMethod = "";
        if (isExtraFields) {
            shippingMethod = yield select(selectors.getNewOrderShipping);
            paymentMethod = yield select(selectors.getNewOrderPayment);
        }

        const data: any = yield call(services.cart.recalculate, { currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, shippingMethod, paymentMethod });
        const cartItems: Array<any> = data?.cartItems || [];
        const cartDetails: CartDetailsProps = data?.cartDetails || {};
        const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);
        const newShippingMethod: string = data?.shippingMethod ?? "";

        // update shipping method
        const curOrderShipping = yield select(selectors.getNewOrderShipping);
        if (newShippingMethod && curOrderShipping.trim() !== newShippingMethod.trim()) yield put(cartActions.actions.updateNewOrderShipping({ value: newShippingMethod, isRecalculate: false }));

        if (isCheck === true) return { cartItems, cartDetails, cartErrors };


        // update cart items
        yield put(cartActions.actions.updateItemsList({ list: cartItems }));
        yield put(cartActions.actions.updateDetails({ details: cartDetails }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.CREATE_ORDER,
            message: cartErrors.join(", "),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));

        if (isCheck !== true && preloader) yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        else if (isExtraFields) yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    } catch (e: any) {
        if (isCheck !== true && preloader) {
            if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `recalculate. ${e.message}`, error: e }));
            const message = e.message === "ECONNABORTED" ? "No connection to the website" : e.message;
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.CREATE_ORDER,
                message,
                type: searchActions.messageTypes.ERROR,
                query: "",
                params: {}
            }));
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        } else if (preloader) {
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        } else if (isExtraFields) {
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        }
    }

    yield put(searchActions.actions.finished());
}

function* interval() {
    while (true) {
        yield delay(5 * 1000);

        try {
            const isAppOpened: boolean = yield select(settingsSelectors.getIsAppOpened);
            const activeTab: number = yield select(settingsSelectors.getActiveModalTab);
            const cartChangesMsg: string = yield select(selectors.getCartChangesMsg);
            const loaderStatus: boolean = yield select(searchSelectors.getLoaderStatus);
            // @ts-ignore
            const createdOrder: any = yield select(selectors.getCreatedOrder);

            if (createdOrder.id ?? "") {
                // do nothing
            } else {
                // other checkers
                if (isAppOpened && activeTab === 2) {
                    // with message
                    if (!cartChangesMsg && !loaderStatus) {
                        const { cartDetails = {} } = yield call(recalculate, true, false);
                        const curCartDetails: CartDetailsProps = yield select(selectors.getCartDetails);

                        // reset flag if cannot display message
                        if (canCartUpdateMessage) {
                            // check cart total
                            if (cartDetails.cart_total !== curCartDetails.cart_total && (cartDetails.cart_total || curCartDetails.cart_total)) {
                                // show reload cart message if tab is opened
                                yield put(cartActions.actions.setCartChangesMsg({ message: "Cart was changed" }));
                            }
                        } else {
                            canCartUpdateMessage = true;
                        }

                    }
                } else {
                    // update cart without message
                    yield call(recalculate, false, false);
                }
            }

        } catch (error) {
            // ignore errors
        }

    }
}

export default [
    takeEvery(cartActions.actions.addItem, addItem),
    takeEvery(cartActions.actions.addItem, clearOldData),
    takeEvery(cartActions.actions.addItemQty, addItemQty),

    takeEvery(cartActions.actions.removeItem, removeItem),
    takeEvery(cartActions.actions.removeItem, clearOldData),

    takeEvery(cartActions.actions.updateItemQuantity, updateItemQuantity),
    takeEvery(cartActions.actions.updateItemQuantity, clearOldData),

    takeEvery(cartActions.actions.updateAttributes, updateAttributes),
    takeEvery(cartActions.actions.updateAttributes, clearOldData),

    takeEvery(cartActions.actions.orderCreate, orderCreate),
    takeEvery(cartActions.actions.orderCreate, clearOldData),

    takeEvery(cartActions.actions.clearCustomItemsPrices, clearCart),
    takeEvery(cartActions.actions.getStatuses, getStatuses),

    takeEvery(cartActions.actions.updateItemsList, updateCustomPrices),
    takeEvery(cartActions.actions.recalculate, recalculate),

    takeEvery(cartActions.actions.updateNewOrderShipping, newOrderShipping),

    // takeEvery(settingsActions.actionTypes.APP_MODAL_OPENED, prepareOldItems),
    // takeEvery(settingsActions.actionTypes.APP_MODAL_OPENED, clearOldData),
    takeEvery(settingsActions.actionTypes.APP_STARTED, restoreCart),
    takeEvery(settingsActions.actionTypes.SET_ACTIVE_MODAL_TAB, clearOldData),

    fork(interval)
];
