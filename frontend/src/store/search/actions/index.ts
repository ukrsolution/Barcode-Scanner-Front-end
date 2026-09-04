import { createAction } from 'typesafe-actions';

export const requestTypes = {
    OPEN: "OPEN",
    MANAGE_MANUALLY: "MANAGE_MANUALLY",
    AUTO_INCREASING: "AUTO_INCREASING",
    AUTO_DECREASING: "AUTO_DECREASING",
};

export const focusTypes = {
    SEARCH: "search",
    QUANTITY: "Quantity",
    REGULAR_PRICE: "Regular price",
    SALE_PRICE: "Sale price",
    CUSTOM_PRICE: "CUSTOM_PRICE",
    CART_ITEM_ATTRIBUTES: "CART_ITEM_ATTRIBUTES",
    CART_ITEM_UPDATE_QTY: "CART_ITEM_UPDATE_QTY",
    CART_ITEM_PRICE_PROD: "CART_ITEM_PRICE_PROD",
    CART_ORDER_PRICE: "CART_ORDER_PRICE",
    CART_ORDER_SUB_PRICE: "CART_ORDER_SUB_PRICE",
    CART_ORDER_TAX: "CART_ORDER_TAX",
    CART_USER: "CART_USER",
    CART_STATUS: "CART_STATUS",
    CART_NOTE: "CART_NOTE",
    PROD_TITLE: "PROD_TITLE",
    PROD_META: "PROD_META_",
};

export const messageTypes = {
    GENERAL: "GENERAL",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    LIST_GENERAL: "LIST_GENERAL",
};

export const inputTypes = {
    ENTER: "ENTER",
    SCAN: "SCAN",
};

export interface RequestTypesProps {
    value: string;
    label: string;
    tooltip: string;
    default?: boolean;
}



export const actions = {
    resetAllMessages: createAction('SEARCH/RESET_ALL_MESSAGES')(),
    updateMessage: createAction('SEARCH/UPDATE_MESSAGE')<{ place: string, message: string, type: string, query: string, params: any }>(),
    updateLoaderStatus: createAction('SEARCH/UPDATE_LOADER_STATUS')<{ status: boolean, postId: number }>(),
    updateLoaderAutofillStatus: createAction('SEARCH/UPDATE_AUTOFILL_LOADER_STATUS')<{ status: boolean }>(),
    autoFocus: createAction('SEARCH/AUTO_FOCUS')<{ status: boolean, focusOn: string }>(),
    setResultsKeywords: createAction('SEARCH/SET_RESULTS_KEYWORDS')<{ keywords: Array<string> }>(),
    autofill: createAction('SEARCH/AUTOFILL')<{ query: string }>(),
    finished: createAction('SEARCH/FINISHED')(),
    setInputType: createAction('SEARCH/INPUT_TYPE')<{ type: string }>(),
    setMobileSearch: createAction('SEARCH/MOBILE_FIELD')<{ status: boolean }>(),
    setFilterStatus: createAction('SEARCH/FILTER_STATUS')<{ status: boolean }>(),
    updateLastQuery: createAction('SEARCH/LAST_QUERY')<{ lastQuery: string }>(),
    updateHistory: createAction('SEARCH/UPDATE_HISTORY')<{ history: any[] }>(),
    setHistory: createAction('SEARCH/SET_HISTORY')<{ history: any[] }>(),
    cancelRequests: createAction('SEARCH/CANCEL_REQUESTS')(),
    openMobileFilter: createAction('SEARCH/OPEN_MOBILE_FILTER')<{ status: boolean }>(),
}

