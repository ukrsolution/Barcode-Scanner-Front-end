export const actionTypes = {
    CMD_APP_LOADED: "CMD_APP_LOADED",
    CMD_RUN_COMMAND: "CMD_RUN_COMMAND",
    CMD_REQUEST_ERROR: "CMD_REQUEST_ERROR",
    CMD_MODAL_MSG: "CMD_MODAL_MSG"
};

export const commands = {
    CMD_APP_LOADED: "CMD_APP_LOADED",
    CMD_SCANNING_START: "CMD_SCANNING_START",
    CMD_DRAWER_TOGGLE: "CMD_DRAWER_TOGGLE",
    CMD_BOTTOM_DRAWER_CLOSE: "CMD_BOTTOM_DRAWER_CLOSE",
    CMD_PREVIEW_ITEM_LOADING: "CMD_PREVIEW_ITEM_LOADING",
    CMD_CREATE_PRODUCT_LOADING: "CMD_CREATE_PRODUCT_LOADING",
    CMD_SET_AUTO_ACTION: "CMD_SET_AUTO_ACTION",
    CONSOLE_LOG: "CONSOLE_LOG",
    CMD_REDIRECT: "CMD_REDIRECT",
    CMD_MODAL_MSG: "CMD_MODAL_MSG",
    CMD_SET_PROC: "CMD_SET_PROC",
};

export const runCommands = {
    CMD_SCANNING_BARCODE: "CMD_SCANNING_BARCODE",
    CMD_TAB_TOGGLE: "CMD_TAB_TOGGLE",
    CMD_AUTH_TOKEN: "CMD_AUTH_TOKEN",
    CMD_SHOW_SEARCH: "CMD_SHOW_SEARCH",
    CMD_CANCEL_REQUESTS: "CMD_CANCEL_REQUESTS",
    CMD_SET_AUTO_ACTION: "CMD_SET_AUTO_ACTION",
    CMD_CHECK_LIC: "CMD_CHECK_LIC",
};

export interface RunOptionsProps {
    [key: string]: any;
}

export interface RunProps {
    method: string;
    options: RunOptionsProps
}

export interface RequestErrorProps {
    request: string;
    errors: Array<string>;
}

export const loaded = () => ({ type: actionTypes.CMD_APP_LOADED, })

export const run = (data: RunProps) => ({ type: actionTypes.CMD_RUN_COMMAND, payload: { data } })

export const requestError = (data: RequestErrorProps) => ({ type: actionTypes.CMD_REQUEST_ERROR, payload: { data } })

export const updateModal = (message: string, config: any) => ({ type: actionTypes.CMD_MODAL_MSG, payload: { message, config } })