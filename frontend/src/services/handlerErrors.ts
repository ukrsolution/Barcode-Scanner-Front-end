import Store from "../store";
import * as searchActions from "../store/search/actions";
import { prepareErrorString } from "../hooks/errors";

/**
 * check url for repeating
 * @param requestUrl 
 * @returns boolean
 */
export const isNoRepeats = (requestUrl: string, request = ""): boolean => {
    let result = false;
    const urlsForNoRepeats: Array<string> = [];
    const requestsForNoRepeats: Array<string> = [];

    // check url
    urlsForNoRepeats.forEach((key: string) => {
        if (requestUrl.search(key) !== -1) {
            // need to skip error
            result = true;
        }
    });

    // check request
    requestsForNoRepeats.forEach((key: string) => {
        if (request.search(key) !== -1) {
            // need to skip error
            result = true;
        }
    });

    return result;
};

export const isCartRout = (rout: string): boolean => {
    let result = false;
    const cartRoutes: Array<string> = [
        "addItem",
        "removeItem",
        "updateQuantity",
        "updateAttributes",
        "clear",
        "orderCreate",
        "getStatuses",
        "recalculate",
    ];

    // check rout
    cartRoutes.forEach((key: string) => {
        if (rout === key) {
            // it is cart rout
            result = true;
        }
    });

    return result;
};

export const processingErrors = (error: any): void => {
    // get response code
    const responseCode = parseInt(error.response.status);

    let data: any = {};

    try {
        data = JSON.parse(error.config?.data);
    } catch (error) {
        data = {};
    }

    let skipError = false;

    if (
        error.config.url.search("product/update-quantity-plus") !== -1 &&
        error.config.url.search("product/update-quantity-minus") !== -1 &&
        [0, 401, 404, 500].includes(responseCode)
    ) {
        // skip error for plus/minus buttons
        skipError = true;
    }

    if (
        (data.rout === "updateProductQuantityPlus" || data.rout === "updateProductQuantityMinus") &&
        [0, 401, 404, 500].includes(responseCode)
    ) {
        // skip error for plus/minus buttons
        skipError = true;
    }

    if (!skipError && (error.config.url.search("cart") !== -1 || isCartRout(data.rout))) {
        skipError = true;
        // set error message
        Store.store.dispatch(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        Store.store.dispatch(searchActions.actions.updateMessage({
            place: "CREATE_ORDER",
            message: prepareErrorString(error.message),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
    }

    if (!skipError && [401].includes(responseCode)) {
        skipError = true;
        // set error message
        Store.store.dispatch(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
        Store.store.dispatch(searchActions.actions.updateMessage({
            place: "MANAGEMENT_INVENTORY",
            message: prepareErrorString(error.message),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
        Store.store.dispatch(searchActions.actions.updateMessage({
            place: "MANAGEMENT_ORDER",
            message: prepareErrorString(error.message),
            type: searchActions.messageTypes.ERROR,
            query: "",
            params: {}
        }));
    }
};
