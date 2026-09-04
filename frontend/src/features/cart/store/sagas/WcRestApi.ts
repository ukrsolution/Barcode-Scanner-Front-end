// import { SagaIterator } from "redux-saga";
// import { call, put, select } from "redux-saga/effects";
// import * as cartActions from "../actions";
// import * as searchActions from "../../../../store/search/actions";
// import * as settingsActions from "../../../../store/settings/actions";
// import * as postsActions from "../../../../store/posts/actions";
// import * as logActions from "../../../../store/log/actions";
// import * as services from "../../../../services";
// import * as actionsSounds from "../../../features/sounds/store/actions";
// import { getSearchFilter } from "../../../../store/search/sagas";
// import { resetBeforeSearch } from "../../../../store/posts/sagas";
// import { CartDetailsProps } from "../models";
// import { CartItemProps } from "../models";
// import { prepareErrors } from "../../../../hooks/errors";
// import { getCartItems, getNewOrderStatus } from "../selectors";
// import { foundBy, nothingIsFound } from "../../../../helpers/search";

// function* getCurrentItems(): SagaIterator {
//     const items = yield select(getCartItems);

//     return items.map((i: any): CartItemProps => {
//         return {
//             ID: i.ID,
//             post_parent: i.post_parent,
//             post_type: i.post_type,
//             product_type: i.product_type,
//             variation_id: i.variation_id,
//             quantity: i.quantity,
//             previousQuantity: i.quantity,
//             attributes: i.variation || {},
//             updatedAction: ''
//         };
//     });
// }

// function* markUpdatedItems(currentItems: Array<any>, newItems: Array<any>) {
//     try {
//         return newItems.map((n: any) => {
//             // find previous item
//             const prevItem: any = currentItems.find((p: any) =>
//                 p.ID === n.ID
//                 && p.variation_id === n.variation_id
//                 && p.post_parent === n.post_parent
//                 && JSON.stringify(p.attributes) === JSON.stringify(n.variation)
//             );

//             // find changes
//             if (prevItem && prevItem.ID) {
//                 // check quantity
//                 if (prevItem.quantity !== n.quantity) n.updatedAction = 'quantity';
//                 else n.updatedAction = prevItem.updatedAction;
//             } else {
//                 // new item
//                 n.updatedAction = 'new';
//             }

//             return n;
//         });
//     } catch (e) {
//         yield put(logActions.logError(`markUpdatedItems. ${e.message}`));
//         return newItems;
//     }
// }

// function* addItem({ payload: { query } }: any): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));
//         yield call(resetBeforeSearch);

//         const orderId: number | null = null;
//         const filter = yield call(getSearchFilter);
//         const currentItems = yield call(getCurrentItems);
//         const data: any = yield call(services.cart.addItem, query, filter, currentItems, orderId);
//         const foundProducts: Array<any> = data?.foundProducts || [];
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};
//         const findByTitle: boolean = data?.findByTitle || false;
//         const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

//         // mark items which was updated
//         const newCartItems: Array<any> = yield call(markUpdatedItems, currentItems, cartItems);

//         // update cart items
//         yield put(cartActions.updateItemsList(newCartItems));
//         yield put(cartActions.updateDetails(cartDetails));

//         yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, foundBy(query), searchActions.messageTypes.GENERAL));

//         if (foundProducts.length && findByTitle === true) {
//             // show products list
//             yield put(postsActions.actions.updatePostsList({ list: foundProducts }));
//             yield put(postsActions.actions.updatePreviousPostsList({ list: foundProducts }));
//         } else if (
//             cartErrors.length
//             && foundProducts.length === 1
//             && foundProducts[0].post_type === 'product_for_cart'
//             && Object.keys(foundProducts[0].requiredAttributes).length) {
//             // show product required attributes
//             yield put(cartActions.updateItemAttributes(foundProducts[0]));
//         } else if (!foundProducts.length) {
//             // not found
//             // yield put(actionsSounds.soundPlay(actionsSounds.tones.fail));
//             yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, nothingIsFound(query), searchActions.messageTypes.GENERAL));
//         }

//         yield put(cartActions.itemsScrollBottom());
//         yield put(searchActions.updateLoaderStatus(false));
//     } catch (e) {
//         yield put(logActions.logError(`addItem. ${e.message}`));
//     }

//     yield put(searchActions.finished());
// }

// function* removeItem({ payload: { cartKey } }: any): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));

//         const orderId: number | null = null;
//         const currentItems = yield call(getCurrentItems);
//         const data: any = yield call(services.cart.removeItem, cartKey, currentItems, orderId);
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};
//         const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

//         // update cart items
//         yield put(cartActions.updateItemsList(cartItems));
//         yield put(cartActions.updateDetails(cartDetails));
//         yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, cartErrors.join(", "), searchActions.messageTypes.ERROR));

//         yield put(searchActions.updateLoaderStatus(false));
//     } catch (e) {
//         yield put(logActions.logError(`removeItem. ${e.message}`));
//     }

//     yield put(searchActions.finished());
// }

// function* updateItemQuantity({ payload: { quantity, itemIndex } }: any): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));

//         // get cart list
//         let currentItems: Array<any> = yield call(getCurrentItems);

//         // change quantity
//         currentItems = currentItems.map((item: any, index: number) => {
//             return index === itemIndex ? { ...item, quantity, previousQuantity: item.quantity } : item;
//         });

//         const data: any = yield call(services.cart.updateQuantity, currentItems);
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};
//         const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

//         // // update cart items
//         yield put(cartActions.updateItemsList(cartItems));
//         yield put(cartActions.updateDetails(cartDetails));
//         yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, cartErrors.join(", "), searchActions.messageTypes.ERROR));

//     } catch (e) {
//         yield put(logActions.logError(`updateItemQuantity. ${e.message}`));
//     }

//     yield put(searchActions.autoFocus(true, searchActions.focusTypes.SEARCH));
//     yield put(searchActions.updateLoaderStatus(false));
//     yield put(searchActions.finished());
// }

// function* updateAttributes({ payload: { item, attributes } }: any): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));

//         // get cart list
//         // eslint-disable-next-line prefer-const
//         let currentItems: Array<CartItemProps> = yield call(getCurrentItems);

//         // add new product to list
//         const newItem: CartItemProps = {
//             ID: item.ID,
//             post_parent: item.post_parent,
//             post_type: item.post_type,
//             product_type: item.product_type,
//             variation_id: item.variation_id,
//             quantity: 1,
//             previousQuantity: 1,
//             attributes: attributes,
//             updatedAction: 'new'
//         };
//         currentItems.push(newItem);

//         const data: any = yield call(services.cart.updateAttributes, currentItems);
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};
//         const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);

//         // mark items which was updated
//         const newCartItems: Array<any> = yield call(markUpdatedItems, currentItems, cartItems);

//         // update cart items
//         yield put(cartActions.updateItemsList(newCartItems));
//         yield put(cartActions.updateDetails(cartDetails));
//         yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, cartErrors.join(", "), searchActions.messageTypes.ERROR));
//         yield put(cartActions.updateItemAttributes({}));

//     } catch (e) {
//         yield put(logActions.logError(`updateAttributes. ${e.message}`));
//     }

//     yield put(searchActions.autoFocus(true, searchActions.focusTypes.SEARCH));
//     yield put(searchActions.updateLoaderStatus(false));
//     yield put(searchActions.finished());
// }

// function* orderCreate({ payload: { isOpen, userId } }: any): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));

//         let orderId: number | null = null;
//         const currentItems = yield call(getCurrentItems);
//         const orderStatus = yield select(getNewOrderStatus);
//         const data: any = yield call(services.cart.orderCreate, { currentItems, orderId, clearCart: isOpen, orderStatus, userId });
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};
//         const cartErrors: Array<any> = yield call(prepareErrors, data?.cartErrors || []);
//         const orderAdminUrl: string = data?.orderAdminUrl || "";
//         orderId = data?.orderId || orderId;

//         if (isOpen && orderId && orderAdminUrl) {
//             // open order in a new tab
//             window.open(orderAdminUrl, "_blank");
//         } else {
//             yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, cartErrors.join(", "), searchActions.messageTypes.ERROR));
//         }

//         if (orderId) {
//             // reset cart items
//             yield put(cartActions.updateItemsList([]));
//             yield put(cartActions.updateDetails({ cart_subtotal: "", cart_total: "", total_tax: "" }));

//             yield put(cartActions.orderCreated(orderId, orderAdminUrl));
//         }
//         else {
//             yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, cartErrors.join(", "), searchActions.messageTypes.ERROR));
//         }

//         if (!orderId) {
//             // update cart items
//             yield put(cartActions.updateItemsList(cartItems));
//             yield put(cartActions.updateDetails(cartDetails));
//         }

//         yield put(searchActions.updateLoaderStatus(false));
//     } catch (e) {
//         yield put(logActions.logError(`orderCreate. ${e.message}`));
//     }

//     yield put(searchActions.finished());
// }

// function* clearCart(): SagaIterator {
//     try {
//         yield put(searchActions.updateLoaderStatus(true));

//         const orderId: number | null = null;
//         const data: any = yield call(services.cart.clear, orderId);
//         const cartItems: Array<any> = data?.cartItems || [];
//         const cartDetails: CartDetailsProps = data?.cartDetails || {};

//         // update cart items
//         yield put(cartActions.updateItemsList(cartItems));
//         yield put(cartActions.updateDetails(cartDetails));
//         yield put(cartActions.orderCreated(0, ''));

//         yield put(searchActions.updateLoaderStatus(false));

//         yield put(searchActions.updateMessage(postsActions.buttonActions.CREATE_ORDER, "", searchActions.messageTypes.GENERAL));

//     } catch (e) {
//         yield put(logActions.logError(`removeItem. ${e.message}`));
//     }

//     yield put(searchActions.finished());
// }

// function* getStatuses(): SagaIterator {
//     try {
//         const data: any = yield call(services.cart.getStatuses);
//         const statuses: Array<any> = data?.statuses || {};

//         yield put(cartActions.updateStatuses(statuses));
//     } catch (e) {
//         yield put(logActions.logError(`getStatuses. ${e.message}`));
//     }
// }

// function* prepareOldItems(): SagaIterator {
//     try {
//         const oldItems: Array<any> = yield select(getCartItems);
//         const items: Array<any> = oldItems.map((item: any) => {
//             return { ...item, updatedAction: "" }
//         });

//         yield put(cartActions.updateItemsList(items));
//     } catch (e) {
//         yield put(logActions.logError(`prepareOldItems. ${e.message}`));
//     }
// }

// function* clearOldData(): SagaIterator {
//     try {
//         yield put(cartActions.orderCreated(0, ''));
//     } catch (e) {
//         yield put(logActions.logError(`clearOldData. ${e.message}`));
//     }
// }

export default [
    // takeEvery(cartActions.actionTypes.CART_RA_ADD_ITEM, addItem),
    // takeEvery(cartActions.actionTypes.CART_RA_ADD_ITEM, clearOldData),

    // takeEvery(cartActions.actionTypes.CART_REMOVE_ITEM, removeItem),
    // takeEvery(cartActions.actionTypes.CART_REMOVE_ITEM, clearOldData),

    // takeEvery(cartActions.actionTypes.CART_UPDATE_ITEM_QUANTITY, updateItemQuantity),
    // takeEvery(cartActions.actionTypes.CART_UPDATE_ITEM_QUANTITY, clearOldData),

    // takeEvery(cartActions.actionTypes.CART_UPDATE_ATTRIBUTES, updateAttributes),
    // takeEvery(cartActions.actionTypes.CART_UPDATE_ATTRIBUTES, clearOldData),

    // takeEvery(cartActions.actionTypes.CART_ORDER_CREATE, orderCreate),
    // takeEvery(cartActions.actionTypes.CART_ORDER_CREATE, clearOldData),

    // takeEvery(cartActions.actionTypes.CART_CLEAR, clearCart),
    // takeEvery(cartActions.actionTypes.CART_GET_STATUSES, getStatuses),

    // takeEvery(settingsActions.actionTypes.APP_MODAL_OPENED, prepareOldItems),
    // takeEvery(settingsActions.actionTypes.APP_MODAL_OPENED, clearOldData),

    // takeEvery(settingsActions.actionTypes.SET_ACTIVE_MODAL_TAB, clearOldData),
];
