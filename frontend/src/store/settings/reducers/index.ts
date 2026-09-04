import { actionTypes } from "../actions";

const initialState = {
    wpmlFilter: {},
    productsFilter: {},
    ordersFilter: {},
    updated: "",
    upLast: "",
    upErr: "",
    activeModalTab: 0,
    token: "",
    userToken: "",
    mobileAppVersion: "",
    isBlockApp: false,
    InfoBlockApp: {},
    checkCustomFieldStatus: false,
    checkCustomFieldMessage: "",
    checkCustomFieldIsError: false,
    dbCreateColumnLoading: false,
    dbCreateColumnProgress: {},
    dbIndexedStatus: false,
    dbIndexationPrepare: false,
    dbBgIndexing: {},
    dbBgIndexingTotal: 0,
    reloadProcLoader: false,
    isAppOpened: false,
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case actionTypes.SEARCH_FILTER_UPDATE_WPML_PARAM: {
            const { paramId, value } = action.payload;

            return {
                ...state,
                wpmlFilter: {
                    ...state.wpmlFilter,
                    [paramId]: value
                }
            };
        }

        case actionTypes.SEARCH_FILTER_UPDATE_PRODUCT_PARAM: {
            const { paramId, value } = action.payload;

            return {
                ...state,
                productsFilter: {
                    ...state.productsFilter,
                    [paramId]: value
                }
            };
        }

        case actionTypes.SEARCH_FILTER_UPDATE_ORDER_PARAM: {
            const { paramId, value } = action.payload;

            return {
                ...state,
                ordersFilter: {
                    ...state.ordersFilter,
                    [paramId]: value
                }
            };
        }

        case actionTypes.SET_UPDATED: {
            const { string } = action.payload;

            return {
                ...state,
                updated: string
            };
        }

        case actionTypes.SET_UP_LAST: {
            const { string } = action.payload;

            return {
                ...state,
                upLast: string
            };
        }

        case actionTypes.SET_UP_ERR: {
            const { string } = action.payload;

            return {
                ...state,
                upErr: string
            };
        }

        case actionTypes.SET_ACTIVE_MODAL_TAB: {
            const { index } = action.payload;

            return {
                ...state,
                activeModalTab: index
            };
        }
        case actionTypes.SET_AUTH_TOKEN: {
            const { token, userToken } = action.payload;

            return {
                ...state,
                token,
                userToken
            };
        }

        case actionTypes.SET_MOBILE_APP_VERSION: {
            const { version } = action.payload;

            return {
                ...state,
                mobileAppVersion: version
            };
        }

        case actionTypes.SET_BLOCK_APP: {
            const { info } = action.payload;

            return {
                ...state,
                isBlockApp: true,
                InfoBlockApp: info
            };
        }

        case actionTypes.CHECK_CUSTOM_FIELDS_RESULT: {
            const { status, message, isError } = action.payload;

            return {
                ...state,
                checkCustomFieldStatus: status,
                checkCustomFieldMessage: message,
                checkCustomFieldIsError: isError,
            };
        }

        case actionTypes.DB_CREATE_COLUMN_RESULT: {
            const { loading, progress } = action.payload;

            return {
                ...state,
                dbCreateColumnLoading: loading,
                dbCreateColumnProgress: progress
            };
        }

        case actionTypes.DB_INDEXED_STATUS: {
            const { status } = action.payload;

            return {
                ...state,
                dbIndexedStatus: status
            };
        }

        case actionTypes.DB_CREATE_COLUMN_PREPARE: {
            const { status } = action.payload;

            return {
                ...state,
                dbIndexationPrepare: status
            };
        }

        case actionTypes.DB_BG_INDEXING: {
            const { data } = action.payload;

            return {
                ...state,
                dbBgIndexing: data
            };
        }

        case actionTypes.DB_BG_INDEXING_TOTAL: {
            const { total } = action.payload;

            return {
                ...state,
                dbBgIndexingTotal: total
            };
        }

        case actionTypes.RELOAD_PROC_LOADER: {
            const { status } = action.payload;

            return {
                ...state,
                reloadProcLoader: status
            };
        }

        case actionTypes.APP_MODAL_OPENED: { return { ...state, isAppOpened: true }; }
        case actionTypes.APP_MODAL_CLOSE: { return { ...state, isAppOpened: false }; }

        default:
            return {
                ...state,
            };
    }
}
