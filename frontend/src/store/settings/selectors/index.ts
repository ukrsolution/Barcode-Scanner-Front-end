import { createSelector } from "reselect";

export const getSettingsSelector = (state: any) => state.settings;

// productsWpmlParams
export const getProductsWpmlParams = createSelector(getSettingsSelector, (settings) => settings.wpmlFilter || {});

// productsFilter
export const getProductsFilterParams = createSelector(getSettingsSelector, (settings) => settings.productsFilter || {});

// ordersFilter
export const getOrdersFilterParams = createSelector(getSettingsSelector, (settings) => settings.ordersFilter || {});

// updated
export const getUpdated = createSelector(getSettingsSelector, (settings) => settings.updated || "");

// upLast
export const getUpLast = createSelector(getSettingsSelector, (settings) => settings.upLast || "");

// upErr
export const getUpErr = createSelector(getSettingsSelector, (settings) => settings.upErr || "");

// activeModalTab
export const getActiveModalTab = createSelector(getSettingsSelector, (settings) => settings.activeModalTab ?? 0);

// token
export const getToken = createSelector(getSettingsSelector, (settings) => settings.token ?? "");

// userToken
export const getUserToken = createSelector(getSettingsSelector, (settings) => settings.userToken ?? "");

// mobileAppVersion
export const getMobileAppVersion = createSelector(getSettingsSelector, (settings) => settings.mobileAppVersion ?? "");

// isBlockApp
export const getIsBlockApp = createSelector(getSettingsSelector, (settings) => settings.isBlockApp ?? false);

// getInfoBlockApp
export const getInfoBlockApp = createSelector(getSettingsSelector, (settings) => settings.InfoBlockApp ?? {});

// checkCustomFieldStatus
export const getCheckCustomFieldStatus = createSelector(getSettingsSelector, (settings) => settings.checkCustomFieldStatus ?? false);

// checkCustomFieldMessage
export const getCheckCustomFieldMessage = createSelector(getSettingsSelector, (settings) => settings.checkCustomFieldMessage ?? "");

// checkCustomFieldIsError
export const getCheckCustomFieldIsError = createSelector(getSettingsSelector, (settings) => settings.checkCustomFieldIsError ?? false);

// dbCreateColumnLoading
export const getDbCreateColumnLoading = createSelector(getSettingsSelector, (settings) => settings.dbCreateColumnLoading ?? false);

// dbCreateColumnProgress
export const getDbCreateColumnProgress = createSelector(getSettingsSelector, (settings) => settings.dbCreateColumnProgress ?? {});

// dbIndexedStatus
export const getDbIndexedStatus = createSelector(getSettingsSelector, (settings) => settings.dbIndexedStatus ?? false);

// dbIndexationPrepare
export const getDbIndexationPrepare = createSelector(getSettingsSelector, (settings) => settings.dbIndexationPrepare ?? false);

// dbBgIndexing
export const getDbBgIndexing = createSelector(getSettingsSelector, (settings) => settings.dbBgIndexing ?? {});

// dbBgIndexingTotal
export const getDbBgIndexingTotal = createSelector(getSettingsSelector, (settings) => settings.dbBgIndexingTotal ?? 0);

// reloadProcLoader
export const getReloadProcLoader = createSelector(getSettingsSelector, (settings) => settings.reloadProcLoader);

// isAppOpened
export const getIsAppOpened = createSelector(getSettingsSelector, (settings) => settings.isAppOpened);