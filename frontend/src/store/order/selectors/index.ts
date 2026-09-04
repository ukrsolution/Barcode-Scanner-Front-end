import { createSelector } from "reselect";

export const getOrderSelector = (state: any) => state.order;

// loaderStatus
export const getLoaderStatus = createSelector(
    getOrderSelector,
    (order) => order.loaderStatus
);