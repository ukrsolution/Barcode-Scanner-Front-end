import { createSelector } from "reselect";

export const getWindowSelector = (state: any) => state.window;

// size
export const getWindowSize = createSelector(
    getWindowSelector,
    (window) => window.size || { width: null, height: null }
);
