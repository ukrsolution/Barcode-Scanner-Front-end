import { ActionType, createReducer } from 'typesafe-actions';
import { actions, inputTypes } from '../actions';

interface State {
    message: Record<string, unknown>;
    errorMessage: string;
    loaderStatus: boolean;
    loaderAutofillStatus: boolean;
    loaderPostId: number;
    autoFocus: boolean;
    focusOn: string;
    resultsKeywords: Array<any>;
    autoFill: string;
    inputType: any;
    mobileSearch: boolean;
    filterStatus: boolean;
    lastQuery: string;
    history: Array<any>;
    openMobileFilter: boolean;
}

const initialState: State = {
    message: {},
    errorMessage: "",
    loaderStatus: false,
    loaderAutofillStatus: false,
    loaderPostId: 0,
    autoFocus: true,
    focusOn: "search",
    resultsKeywords: [],
    autoFill: "",
    inputType: inputTypes.ENTER,
    mobileSearch: false,
    filterStatus: false,
    lastQuery: "",
    history: [],
    openMobileFilter: false,
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.resetAllMessages, (state, { }): State => ({ ...state, message: {} }))
    .handleAction(actions.updateMessage, (state, { payload: { message, params, place, query, type } }): State => ({
        ...state, message: {
            ...state.message,
            [place]: { message, type, query, params }
        }
    }))
    .handleAction(actions.updateLoaderStatus, (state, { payload: { postId, status } }): State => ({ ...state, loaderStatus: status, loaderPostId: postId }))
    .handleAction(actions.updateLoaderAutofillStatus, (state, { payload: { status } }): State => ({ ...state, loaderAutofillStatus: status }))
    .handleAction(actions.autoFocus, (state, { payload: { focusOn, status } }): State => ({ ...state, autoFocus: status, focusOn }))
    .handleAction(actions.setResultsKeywords, (state, { payload: { keywords } }): State => ({ ...state, resultsKeywords: keywords }))
    .handleAction(actions.autofill, (state, { payload: { query } }): State => ({ ...state, autoFill: query }))
    .handleAction(actions.setInputType, (state, { payload: { type } }): State => ({ ...state, inputType: type }))
    .handleAction(actions.setMobileSearch, (state, { payload: { status } }): State => ({ ...state, mobileSearch: status }))
    .handleAction(actions.setFilterStatus, (state, { payload: { status } }): State => ({ ...state, filterStatus: status }))
    .handleAction(actions.updateLastQuery, (state, { payload: { lastQuery } }): State => ({ ...state, lastQuery }))
    .handleAction(actions.setHistory, (state, { payload: { history } }): State => ({ ...state, history }))
    .handleAction(actions.openMobileFilter, (state, { payload: { status } }): State => ({ ...state, openMobileFilter: status }))