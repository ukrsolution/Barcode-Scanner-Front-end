export const actionTypes = {
    APP_STARTED: "APP_STARTED",
    APP_MODAL_OPENED: "APP_MODAL_OPENED",
    APP_MODAL_CLOSE: "APP_MODAL_CLOSE",
    SEARCH_MODAL_OPEN_STATUS: "SEARCH_MODAL_OPEN_STATUS",
    SEARCH_FILTER_UPDATE_WPML_PARAM: "SEARCH_FILTER_UPDATE_WPML_PARAM",
    SEARCH_FILTER_UPDATE_PRODUCT_PARAM: "SEARCH_FILTER_UPDATE_PRODUCT_PARAM",
    SEARCH_FILTER_UPDATE_ORDER_PARAM: "SEARCH_FILTER_UPDATE_ORDER_PARAM",
    CHECK_PROC: "CHECK_PROC",
    RELOAD_PROC: "RELOAD_PROC",
    RELOAD_PROC_LOADER: "RELOAD_PROC_LOADER",
    SET_UPDATED: "SET_UPDATED",
    SET_UP_LAST: "SET_UP_LAST",
    SET_UP_ERR: "SET_UP_ERR",
    SET_ACTIVE_MODAL_TAB: "SET_ACTIVE_MODAL_TAB",
    SET_AUTH_TOKEN: "SET_AUTH_TOKEN",
    SET_MOBILE_APP_VERSION: "SET_MOBILE_APP_VERSION",
    SET_BLOCK_APP: "SET_BLOCK_APP",
    CHECK_CUSTOM_FIELDS: "CHECK_CUSTOM_FIELDS",
    CHECK_CUSTOM_FIELDS_RESULT: "CHECK_CUSTOM_FIELDS_RESULT",
    DB_CREATE_COLUMN_PREPARE: "DB_CREATE_COLUMN_PREPARE",
    DB_CREATE_COLUMN: "DB_CREATE_COLUMN",
    DB_CREATE_COLUMN_RESULT: "DB_CREATE_COLUMN_RESULT",
    DB_INDEXED_STATUS: "DB_INDEXED_STATUS",
    DB_BG_INDEXING: "DB_BG_INDEXING",
    DB_BG_INDEXING_TOTAL: "DB_BG_INDEXING_TOTAL",
    UPDATE_SETTINGS: "UPDATE_SETTINGS",
    IMPORT_LABELS: "IMPORT_LABELS",
};

export const appStarted = () => ({ type: actionTypes.APP_STARTED, });
export const appOpened = () => ({ type: actionTypes.APP_MODAL_OPENED, });
export const appClose = () => ({ type: actionTypes.APP_MODAL_CLOSE, });

export const searchModalOpenStatus = (status: boolean) => ({ type: actionTypes.SEARCH_MODAL_OPEN_STATUS, payload: { status } });

export const searchFilterUpdateWpml = (paramId: string, value: string) => ({ type: actionTypes.SEARCH_FILTER_UPDATE_WPML_PARAM, payload: { paramId, value } });
export const searchFilterUpdateProduct = (paramId: string, value: string) => ({ type: actionTypes.SEARCH_FILTER_UPDATE_PRODUCT_PARAM, payload: { paramId, value } });
export const searchFilterUpdateOrder = (paramId: string, value: string) => ({ type: actionTypes.SEARCH_FILTER_UPDATE_ORDER_PARAM, payload: { paramId, value } });

export const checkProc = (key: string, action = "") => ({ type: actionTypes.CHECK_PROC, payload: { key, action } });
export const reloadProc = () => ({ type: actionTypes.RELOAD_PROC });
export const reloadProcLoader = (status: boolean) => ({ type: actionTypes.RELOAD_PROC_LOADER, payload: { status } });

export const setUpdated = (string: string) => ({ type: actionTypes.SET_UPDATED, payload: { string } });
export const setUpLast = (string: string) => ({ type: actionTypes.SET_UP_LAST, payload: { string } });
export const setUpErr = (string: string) => ({ type: actionTypes.SET_UP_ERR, payload: { string } });

export const setActiveModalTab = (index: number) => ({ type: actionTypes.SET_ACTIVE_MODAL_TAB, payload: { index } });

export const setAuthToken = (token: string, userToken: string) => ({ type: actionTypes.SET_AUTH_TOKEN, payload: { token, userToken } });
export const setMobileAppVersion = (version: string) => ({ type: actionTypes.SET_MOBILE_APP_VERSION, payload: { version } });
export const setBlockApp = (info: any) => ({ type: actionTypes.SET_BLOCK_APP, payload: { info } });

export const checkCustomFields = (fields: Array<any>, progress: any = {}) => ({ type: actionTypes.CHECK_CUSTOM_FIELDS, payload: { fields, progress } });
export const checkCustomFieldsResult = (status: boolean, message: string, isError: boolean) => ({ type: actionTypes.CHECK_CUSTOM_FIELDS_RESULT, payload: { status, message, isError } });

export const dbCreateColumnPrepare = (status: boolean) => ({ type: actionTypes.DB_CREATE_COLUMN_PREPARE, payload: { status } });
export const dbCreateColumn = (fields: Array<any>, progress: any = {}) => ({ type: actionTypes.DB_CREATE_COLUMN, payload: { fields, progress } });
export const dbCreateColumnResult = (loading: boolean, progress: any) => ({ type: actionTypes.DB_CREATE_COLUMN_RESULT, payload: { loading, progress } });

export const dbIndexedStatus = (status: boolean) => ({ type: actionTypes.DB_INDEXED_STATUS, payload: { status } });
export const dbBgIndexing = (data: any) => ({ type: actionTypes.DB_BG_INDEXING, payload: { data } });
export const dbBgIndexingTotal = (total: number) => ({ type: actionTypes.DB_BG_INDEXING_TOTAL, payload: { total } });

export const updateSettings = (data: any) => ({ type: actionTypes.UPDATE_SETTINGS, payload: { data } });

export const importLabels = (products: Array<number>, types: Array<string>) => ({ type: actionTypes.IMPORT_LABELS, payload: { products, types } });