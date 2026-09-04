import { createSelector } from "reselect";
import { State } from "../../../store/reducers";
import { inputTypes } from "../actions";

export const Selectors = {
    getSearchSelector: (state: State) => state.search,
    getErrorMessage: (state: State) => state.search.errorMessage,
    getLoaderStatus: (state: State) => state.search.loaderStatus,
    getLoaderAutofillStatus: (state: State) => state.search.loaderAutofillStatus,
    getLoaderPostId: (state: State) => state.search.loaderPostId,
    getAutoFocus: (state: State) => state.search.autoFocus ?? true,
    getFocusOn: (state: State) => state.search.focusOn ?? "search",
    getResultsKeywords: (state: State) => state.search.resultsKeywords ?? [],
    getAutoFill: (state: State) => state.search.autoFill ?? "",
    getInputType: (state: State) => state.search.inputType ?? inputTypes.ENTER,
    getMobileSearch: (state: State) => state.search.mobileSearch ?? false,
    getFilterStatus: (state: State) => state.search.filterStatus ?? false,
    getLastQuery: (state: State) => state.search.lastQuery ?? "",
    getHistory: (state: State) => state.search.history ?? [],
    getOpenMobileFilter: (state: State) => state.search.openMobileFilter ?? false,
    getMessage: (state: State) => state.search.message ?? [],
    makeGetMessage: (place: string) => createSelector(Selectors.getMessage, message => message ? message[place] ?? {} : {}),
};
// import { ResultMessage } from "../models";

// export const getSearchSelector = (state: any) => state.search;
// message
// export const makeGetMessage = (place: string) => createSelector(getSearchSelector, (search) => search.message ? search.message[place] ?? {} : {});
// errorMessage
// export const getErrorMessage = createSelector(getSearchSelector, (search) => search.errorMessage);
// loaderStatus
// export const getLoaderStatus = createSelector(getSearchSelector, (search) => search.loaderStatus);
// loaderAutofillStatus
// export const getLoaderAutofillStatus = createSelector(getSearchSelector, (search) => search.loaderAutofillStatus);
// loaderPostId
// export const getLoaderPostId = createSelector(getSearchSelector, (search) => search.loaderPostId);
// autoFocus
// export const getAutoFocus = createSelector(getSearchSelector, (search) => search.autoFocus ?? true);
// focusOn
// export const getFocusOn = createSelector(getSearchSelector, (search) => search.focusOn ?? "search");
// resultsKeywords
// export const getResultsKeywords = createSelector(getSearchSelector, (search) => search.resultsKeywords ?? []);
// autoFill
// export const getAutoFill = createSelector(getSearchSelector, (search) => search.autoFill ?? "");
// inputType
// export const getInputType = createSelector(getSearchSelector, (search) => search.inputType ?? inputTypes.ENTER);
// mobileSearch
// export const getMobileSearch = createSelector(getSearchSelector, (search) => search.mobileSearch ?? false);
// filterStatus
// export const getFilterStatus = createSelector(getSearchSelector, (search) => search.filterStatus ?? false);
// lastQuery
// export const getLastQuery = createSelector(getSearchSelector, (search) => search.lastQuery ?? "");
// history
// export const getHistory = createSelector(getSearchSelector, (search) => search.history ?? []);
// openMobileFilter
// export const getOpenMobileFilter = createSelector(getSearchSelector, (search) => search.openMobileFilter ?? false);