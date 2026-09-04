import { SagaIterator } from "redux-saga";
import { call, delay, put, select, takeEvery } from "redux-saga/effects";

import * as postsActions from "../actions";
import * as searchActions from "../../search/actions";
import * as settingsActions from "../../settings/actions";
import * as logActions from "../../log/actions";
import * as cartActions from "../../../features/cart/store/actions";
import * as services from "../../../services";
import { getSearchFilter } from "../../search/sagas";
import { Selectors } from "../selectors";
import { nothingIsFound, foundBy, foundListBy } from "../../../helpers/search";
import { parseUpdated, parseUpdatedResult } from "../../../helpers/date";
import { getActiveModalTab, getUpdated } from "../../settings/selectors";
import * as actionsSounds from "../../../features/sounds/store/actions";
import * as mobileCommandsActions from "../../mobile/commands/actions";
import { MobileCommandProps } from "../../../features/mobile/scanning/containers/ScanningContainer";
import usePluginParams from "../../../hooks/usePluginParams";
import { updateUsbs } from "../../../helpers/data";
import { Selectors as customSearchFiltersSelectors } from "../../customSearchFilters/selectors";
import { Selectors as searchSelectors } from "../../search/selectors";
import { ActionType } from "typesafe-actions";
// import * as modalsSelectors from "../../modals/selectors";

const pluginData = usePluginParams();

/**
 * search post
 * @param param0 
 */
function* searchToOpenPage({ payload: { query, autoFill } }: ActionType<typeof postsActions.actions.searchToOpenPage>): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
        yield call(resetBeforeSearch);

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.getPost, query, 0, filter, customFilter, autoFill);
        const posts: Array<any> = data?.posts || [];
        const findByTitle: boolean = data?.findByTitle || false;

        if (posts.length === 1 && findByTitle === false) {
            const post: any = posts[0];

            // open post in a new tab
            window.open(post.postEditUrl, "_blank");
        } else if (posts.length) {
            yield put(postsActions.actions.updatePostsList({ list: [] }));
            yield put(postsActions.actions.updatePreviousPostsList({ list: posts }));
        } else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
                message: "Not found",
                type: searchActions.messageTypes.GENERAL,
                query,
                params: {}
            }));
        }

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `authStatusUpdated. ${e.message}`, error: e }));
    }

    yield put(searchActions.actions.finished());
}

/**
 * manage product inventory
 * @param param0 
 */
function* managementInventory({ payload: { query, autoFill = false } }: ActionType<typeof postsActions.actions.managementInventory>): SagaIterator {
    try {
        if (!autoFill) {
            yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
            yield call(resetBeforeSearch);
        } else {
            yield put(searchActions.actions.updateLoaderAutofillStatus({ status: true }));
        }

        const updated = yield select(getUpdated);
        const sUpdated: parseUpdatedResult = parseUpdated(updated);

        const postAutoAction = yield select(Selectors.getPostAutoAction);

        let autoAction = "";
        autoAction = "";

        yield delay(10);

        if (["android", "ios"].includes(pluginData.platform)) {
            if (/*message.length > 0 &&*/ !sUpdated.status && sUpdated.message) {
                // console.log({ message });
                yield put(searchActions.actions.autofill({ query: " " }));
                yield put(postsActions.actions.updatePostManagement({ post: {} }));
                yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
                yield put(searchActions.actions.resetAllMessages());

                yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
                yield put(searchActions.actions.updateLoaderAutofillStatus({ status: false }));

                yield put(searchActions.actions.updateMessage({
                    place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
                    message: sUpdated.message,
                    type: searchActions.messageTypes.GENERAL,
                    query,
                    params: { checkAgain: true }
                }));

                yield put(searchActions.actions.finished());
                return;
            }
        }

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.getProduct, query, filter, customFilter, autoAction, autoFill);
        const orders: Array<any> = data?.orders || [];
        const products: Array<any> = data?.products || [];
        const findByTitle: boolean = data?.findByTitle || false;
        const qtyBeforeUpdate: Array<number> = data?.qtyBeforeUpdate || [];
        const usbs: any = data?.usbs || null;

        if (usbs) updateUsbs(usbs);

        // reset previous error
        yield put(postsActions.actions.updateQuantityError({ error: "" }));

        if (!products.length && orders.length) yield call(prepareSearchResult, {
            list: orders,
            findByTitle,
            keywords: [query],
            postAutoAction: autoAction,
            activeTab: postsActions.buttonActions.MANAGEMENT_ORDER,
            autoFill,
            qtyBeforeUpdate
        });
        else {
            // check manage stock for first product
            if (products[0] && !products[0].product_manage_stock) {
                // disable auto action
                products[0].useAction = false;
                products[0].product_quantity = "";

                if (autoAction !== searchActions.requestTypes.OPEN) autoAction = "";
            }

            yield call(prepareSearchResult, {
                list: products,
                findByTitle,
                keywords: [query],
                postAutoAction: autoAction,
                activeTab: postsActions.buttonActions.MANAGEMENT_INVENTORY,
                autoFill,
                qtyBeforeUpdate
            });
        }

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(searchActions.actions.updateLoaderAutofillStatus({ status: false }));
        yield put(searchActions.actions.finished());
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) {
            yield put(logActions.actions.logError({ message: `managementInventory. ${e.message}`, error: e }));
            yield put(searchActions.actions.autofill({ query: " " }));
            yield put(postsActions.actions.updatePostManagement({ post: {} }));
            yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
            yield put(searchActions.actions.resetAllMessages());

            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
            yield put(searchActions.actions.updateLoaderAutofillStatus({ status: false, }));
            yield put(postsActions.actions.miRequestError({ error: e.message }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "managementInventory", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            } else {
                yield put(searchActions.actions.updateMessage({
                    place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
                    message: e.message,
                    type: searchActions.messageTypes.GENERAL,
                    query,
                    params: {}
                }));
            }


            yield put(searchActions.actions.finished());
        }

    }
}

/**
 * manage product inventory
 * @param param0 
 */
function* managementInventoryFromPreview({ payload: { postId } }: ActionType<typeof postsActions.actions.managementInventoryFromPreview>): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId }));
        yield call(resetBeforeSearch);

        // send to mobile app
        const mobileData: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_PREVIEW_ITEM_LOADING,
            options: { status: true, documentHeight: 75 },
        };
        window.parent.postMessage(mobileData, "*");

        // active tab
        const activeTab: number = yield select(getActiveModalTab);

        const updated = yield select(getUpdated);
        const sUpdated = parseUpdated(updated);

        const postAutoAction = yield select(Selectors.getPostAutoAction);

        let autoAction = "";
        autoAction = "";
     

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.getProduct, `${postId}`, { ...filter, products: { ID: true } }, customFilter, autoAction, false);
        const orders: Array<any> = data?.orders || [];
        const products: Array<any> = data?.products || [];
        const findByTitle: boolean = data?.findByTitle || false;
        const autoFill = false;

        if (products.length) yield call(prepareSearchResult, {
            list: products,
            findByTitle,
            keywords: [`${postId}`],
            postAutoAction: autoAction,
            activeTab: postsActions.buttonActions.MANAGEMENT_INVENTORY,
            autoFill,
            qtyBeforeUpdate: []
        });
        else yield call(prepareSearchResult, {
            list: orders,
            findByTitle,
            keywords: [`${postId}`],
            postAutoAction: "",
            activeTab: postsActions.buttonActions.MANAGEMENT_ORDER,
            autoFill,
            qtyBeforeUpdate: []
        });

    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) {
            yield put(logActions.actions.logError({ message: `managementInventoryFromPreview. ${e.message}`, error: e }));
            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "managementInventoryFromPreview", errors: [e.message] }));

                if (!e.cancelStatus) {
                    yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
                }
            }
        }
    }

    yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    yield put(searchActions.actions.finished());
}


/**
 * manage order
 * @param param0 
 */
function* managementOrder({ payload: { query, autoFill = false } }: ActionType<typeof postsActions.actions.managementOrder>): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
        yield call(resetBeforeSearch);

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.getOrder, { query, filter, customFilter, autoFill });
        const orders: Array<any> = data?.orders || [];
        const products: Array<any> = data?.products || [];
        const findByTitle: boolean = data?.findByTitle || false;

        if (!orders.length && products.length) yield call(prepareSearchResult, {
            list: products,
            findByTitle,
            keywords: [query],
            postAutoAction: "",
            activeTab: postsActions.buttonActions.MANAGEMENT_INVENTORY,
            autoFill,
            qtyBeforeUpdate: []
        });
        else yield call(prepareSearchResult, {
            list: orders,
            findByTitle,
            keywords: [query],
            postAutoAction: "",
            activeTab: postsActions.buttonActions.MANAGEMENT_ORDER,
            autoFill,
            qtyBeforeUpdate: []
        });

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) {
            yield put(logActions.actions.logError({ message: `managementOrder. ${e.message}`, error: e }));
            yield put(searchActions.actions.autofill({ query: " " }));
            yield put(postsActions.actions.updateOrderManagement({ order: {} }));
            yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
            yield put(searchActions.actions.resetAllMessages());

            yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));

            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.MANAGEMENT_ORDER,
                message: e.message,
                type: searchActions.messageTypes.GENERAL,
                query,
                params: {}
            }));
        }
    }

    yield put(searchActions.actions.finished());
}

interface prepareSearchResultProps {
    list: Array<any>;
    findByTitle: boolean;
    keywords: Array<string>;
    postAutoAction: string;
    activeTab: string;
    autoFill: boolean;
    qtyBeforeUpdate: Array<number>;
}

function* prepareSearchResult({ list, findByTitle, keywords, postAutoAction = "", activeTab, autoFill, qtyBeforeUpdate }: prepareSearchResultProps) {
    // reset posts list from previous request
    yield put(postsActions.actions.updatePostsList({ list: [] }));

    if (!autoFill) {
        yield put(postsActions.actions.updatePostManagement({ post: {} }));
        yield put(postsActions.actions.updateOrderManagement({ order: {} }));
    }

    yield put(postsActions.actions.managementInventoryClearChanges());
    yield put(searchActions.actions.autofill({ query: "" }));
    // hide search field
    yield put(searchActions.actions.setMobileSearch({ status: false }));


    if (!autoFill && list.length === 1 && findByTitle === false) {
        const item: any = list[0];

        yield put(searchActions.actions.updateMessage({
            place: activeTab,
            message: foundBy(keywords.join(", ")),
            type: searchActions.messageTypes.GENERAL,
            query: "",
            params: {}
        }));

        if (item.post_type === "shop_order") {
            yield put(postsActions.actions.updateOrderManagement({ order: item }));
            yield put(settingsActions.setActiveModalTab(1));
        } else {
            yield put(postsActions.actions.updatePostManagement({ post: item }));
            yield put(settingsActions.setActiveModalTab(0));
        }

    } else if (list.length) {
        yield put(postsActions.actions.updatePostsList({ list }));
        yield put(postsActions.actions.updatePreviousPostsList({ list }));

        if (pluginData.platform) {
            yield put(searchActions.actions.updateMessage({
                place: activeTab, message: foundListBy(keywords.join(", ")),
                type: searchActions.messageTypes.LIST_GENERAL,
                query: "",
                params: {}
            }));
        } else {
            if (!autoFill) yield put(searchActions.actions.updateMessage({
                place: activeTab,
                message: foundBy(keywords.join(", ")),
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: {}
            }));
        }
    } else {
        if (!autoFill) yield put(searchActions.actions.updateMessage({
            place: activeTab,
            message: nothingIsFound(keywords.join(", ")),
            type: searchActions.messageTypes.GENERAL,
            query: keywords.join(", "),
            params: {}
        }));
    }
}

/**
 * manage order
 * @param param0 
 */
function* managementOrderFromPreview({ payload: { postId } }: ActionType<typeof postsActions.actions.managementOrderFromPreview>): SagaIterator {
    try {
        yield put(searchActions.actions.updateLoaderStatus({ status: true, postId }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.getOrder, { query: `${postId}`, filter: { ...filter, orders: { ID: true } }, customFilter: customFilter, autoFill: false });
        const orders: Array<any> = data?.orders || [];

        if (orders.length === 1) {
            const order: any = orders[0];

            yield put(postsActions.actions.updatePostsList({ list: [] }));
            yield put(postsActions.actions.updateOrderManagement({ order }));
            yield put(settingsActions.setActiveModalTab(1));
        } else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.MANAGEMENT_ORDER,
                message: "Not found",
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: {}
            }));
        }

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));

    } catch (e: any) {
        if (!e.cancelStatus) {
            yield put(logActions.actions.logError({ message: `managementOrderFromPreview. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "managementOrderFromPreview", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }

        yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        yield put(searchActions.actions.finished());
    }
}

/**
 * reset previous search results
 */
export function* resetBeforeSearch(): SagaIterator {
    // send to mobile app
    const mobileData: MobileCommandProps = {
        message: "mobile.postMessage",
        method: mobileCommandsActions.commands.CMD_PREVIEW_ITEM_LOADING,
        options: { status: true, documentHeight: 75 },
    };
    window.parent.postMessage(mobileData, "*");

    yield put(postsActions.actions.updatePostsList({ list: [] }));
    yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
    yield put(cartActions.actions.updateItemAttributes({ item: {} }));
    yield put(searchActions.actions.resetAllMessages());
    yield put(postsActions.actions.miRequestError({ error: "" }));
    // hide search field
    yield put(searchActions.actions.setMobileSearch({ status: false }));
}

function* enableProductManageStock({ payload: { productId, products: productsIds } }: ActionType<typeof postsActions.actions.enableProductManageStock>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.productEnableManageStock, productId, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `enableProductManageStock. ${e.message}`, error: e }));
    }

    yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    yield put(searchActions.actions.finished());
}

function* updateProductQuantity({ payload: { productId, quantity, products: productsIds } }: ActionType<typeof postsActions.actions.updateProductQuantity>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));
        yield put(postsActions.actions.updateQuantityError({ error: "" }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.updateProductQuantity, productId, quantity, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));

    } catch (e: any) {
        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: 0 }));
        yield put(postsActions.actions.updateQuantityError({ error: "Cannot update" }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductQuantity. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductQuantity", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductQuantityPlus({ payload: { productId, products } }: ActionType<typeof postsActions.actions.updateProductQuantityPlus>): SagaIterator {
    try {
        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const counterBefore = yield select(Selectors.getQuantityRequestCounter);

        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: true, requestCounter: counterBefore + 1 }));
        yield put(postsActions.actions.updateQuantityError({ error: "" }));

        yield call(services.posts.updateProductQuantityPlus, productId, products, filter, customFilter);
        // const products: Array<any> = data?.products || [];

        // if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        const counterAfter = yield select(Selectors.getQuantityRequestCounter);
        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: counterAfter - 1 }));
    } catch (e: any) {
        const counterAfter = yield select(Selectors.getQuantityRequestCounter);
        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: counterAfter - 1 }));
        yield put(postsActions.actions.updateQuantityError({ error: "Cannot update" }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductQuantityPlus. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductQuantityPlus", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductQuantityMinus({ payload: { productId, products } }: ActionType<typeof postsActions.actions.updateProductQuantityMinus>): SagaIterator {
    try {
        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const counterBefore = yield select(Selectors.getQuantityRequestCounter);

        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: true, requestCounter: counterBefore + 1 }));
        yield put(postsActions.actions.updateQuantityError({ error: "" }));

        yield call(services.posts.updateProductQuantityMinus, productId, products, filter, customFilter);
        // const products: Array<any> = data?.products || [];

        // if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        const counterAfter = yield select(Selectors.getQuantityRequestCounter);
        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: counterAfter - 1 }));
    } catch (e: any) {
        const counterAfter = yield select(Selectors.getQuantityRequestCounter);
        yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: counterAfter - 1 }));
        yield put(postsActions.actions.updateQuantityError({ error: "Cannot update" }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductQuantityMinus. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductQuantityMinus", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductRegularPrice({ payload: { productId, price, products: productsIds } }: ActionType<typeof postsActions.actions.updateProductRegularPrice>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.updateProductRegularPrice, productId, price, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductRegularPrice. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductRegularPrice", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductSalePrice({ payload: { productId, price, products: productsIds } }: ActionType<typeof postsActions.actions.updateProductSalePrice>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.updateProductSalePrice, productId, price, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductSalePrice. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductSalePrice", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductCustomPrice({ payload: { productId, field, price, products: productsIds } }: ActionType<typeof postsActions.actions.updateProductCustomPrice>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.updateProductCustomPrice, productId, field, price, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductCustomPrice. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductCustomPrice", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* updateProductMeta({ payload: { productId, key, value, products: productsIds } }: ActionType<typeof postsActions.actions.updateProductMeta>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const filter = yield call(getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.updateProductMeta, productId, key, value, productsIds, filter, customFilter);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `updateProductMeta. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "updateProductMeta", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* managementInventoryUpdateTitle({ payload: { productId, value } }: ActionType<typeof postsActions.actions.managementInventoryUpdateTitle>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const data: any = yield call(services.posts.updateTitle, productId, value);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `managementInventoryUpdateTitle. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "managementInventoryUpdateTitle", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));

    yield put(searchActions.actions.finished());
}

function* managementInventorySetImage({ payload: { postId, attachmentId } }: ActionType<typeof postsActions.actions.managementInventorySetImage>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const data: any = yield call(services.posts.setImage, postId, attachmentId);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));

        if (!e.cancelStatus && e.message) {
            yield put(logActions.actions.logError({ message: `managementInventorySetImage. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                yield put(mobileCommandsActions.requestError({ request: "managementInventorySetImage", errors: [e.message] }));
                yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
            }
        }
    }

    yield put(searchActions.actions.finished());
}

function* managementInventoryCreateNew({ payload: { query } }: ActionType<typeof postsActions.actions.managementInventoryCreateNew>): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        // send to mobile app
        const mobileData: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_CREATE_PRODUCT_LOADING,
            options: { status: true },
        };
        window.parent.postMessage(mobileData, "*");

        const data: any = yield call(services.posts.createNew, query);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
            message: "",
            type: searchActions.messageTypes.GENERAL,
            query: "",
            params: {}
        }));
    } catch (e: any) {
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) {
            if (e.message) yield put(logActions.actions.logError({ message: `managementInventoryCreateNew. ${e.message}`, error: e }));
            yield put(postsActions.actions.updateLoaderStatus({ status: false }));
        }
    }

    yield put(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));

    yield put(searchActions.actions.finished());
}

function* managementInventoryApplyChanges(): SagaIterator {
    try {
        yield put(postsActions.actions.updateLoaderStatus({ status: true }));

        const changes = yield select(Selectors.getPostChanges);

        const data: any = yield call(services.posts.update, changes);
        const products: Array<any> = data?.products || [];

        if (products.length) yield put(postsActions.actions.updatePostManagement({ post: products[0] }));
        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
            message: "",
            type: searchActions.messageTypes.GENERAL,
            query: "",
            params: {}
        }));


        yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    } catch (e: any) {
        if (e.message) {
            if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `managementInventoryApplyChanges. ${e.message}`, error: e }));

            if (["android", "ios"].includes(pluginData.platform)) {
                if (!e.cancelStatus) {
                    yield put(mobileCommandsActions.updateModal(e.message, e.config ?? {}));
                }
            }
        }
        // disable loader if it isn't canceled request
        if (!e.cancelStatus) yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    }
}

function* managementInventoryAutoAction({ payload: { action } }: ActionType<typeof postsActions.actions.managementInventoryAutoAction>): SagaIterator {
    try {
        // send to mobile app
        const mobileData: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_SET_AUTO_ACTION,
            options: { autoAction: action },
        };
        window.parent.postMessage(mobileData, "*");
    } catch (e: any) {
        if (!e.cancelStatus && e.message) yield put(logActions.actions.logError({ message: `managementInventoryAutoAction. ${e.message}`, error: e }));
    }
}

function* updateHistory({ payload: { query } }: ActionType<typeof postsActions.actions.managementInventory>): SagaIterator {
    try {
        // get history list
        const history: any[] = yield select(searchSelectors.getHistory);

        // remove duplicate queries
        let arr = history.filter((h: any) => h.query !== query);

        // add to first position
        arr.unshift({ query });

        // slice list
        arr = arr.slice(0, 7);

        // set history list
        yield put(searchActions.actions.setHistory({ history: arr }));
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `updateHistory. ${e?.message}`, error: e }));
    }
}

export default [
    takeEvery(postsActions.actions.searchToOpenPage, searchToOpenPage),
    takeEvery(postsActions.actions.managementInventory, managementInventory),
    takeEvery(postsActions.actions.managementInventory, updateHistory),
    takeEvery(postsActions.actions.managementInventoryFromPreview, managementInventoryFromPreview),
    takeEvery(postsActions.actions.managementOrder, managementOrder),
    takeEvery(postsActions.actions.managementOrderFromPreview, managementOrderFromPreview),
    takeEvery(postsActions.actions.enableProductManageStock, enableProductManageStock),
    takeEvery(postsActions.actions.updateProductQuantity, updateProductQuantity),
    takeEvery(postsActions.actions.updateProductQuantityPlus, updateProductQuantityPlus),
    takeEvery(postsActions.actions.updateProductQuantityMinus, updateProductQuantityMinus),
    takeEvery(postsActions.actions.updateProductRegularPrice, updateProductRegularPrice),
    takeEvery(postsActions.actions.updateProductSalePrice, updateProductSalePrice),
    takeEvery(postsActions.actions.updateProductCustomPrice, updateProductCustomPrice),
    takeEvery(postsActions.actions.updateProductMeta, updateProductMeta),
    takeEvery(postsActions.actions.managementInventoryUpdateTitle, managementInventoryUpdateTitle),
    takeEvery(postsActions.actions.managementInventorySetImage, managementInventorySetImage),
    takeEvery(postsActions.actions.managementInventoryCreateNew, managementInventoryCreateNew),
    takeEvery(postsActions.actions.managementInventoryApplyChanges, managementInventoryApplyChanges),
    takeEvery(postsActions.actions.managementInventoryAutoAction, managementInventoryAutoAction),
];
