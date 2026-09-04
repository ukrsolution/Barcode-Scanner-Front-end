import { State } from "../../../store/reducers";

export const Selectors = {
    getPostAutoAction: (state: State) => state.posts.postAutoAction ?? "",
    getPostToManagement: (state: State) => state.posts.postManagement,
    getOrderManagement: (state: State) => state.posts.orderManagement,
    loaderQuantityStatus: (state: State) => state.posts.loaderQuantityStatus,
    getQuantityRequestCounter: (state: State) => state.posts.quantityRequestCounter ?? 0,
    getQuantityRequestError: (state: State) => state.posts.quantityRequestError ?? "",
    getQuantityLoaderStatus: (state: State) => state.posts.loaderQuantityStatus,
    getLoaderStatus: (state: State) => state.posts.loaderStatus,
    getPostsList: (state: State) => state.posts.postsList || [],
    getPreviousPostsList: (state: State) => state.posts.previousPostsList || [],
    getPostChanges: (state: State) => state.posts.postChanges || {},
    getRequestError: (state: State) => state.posts.requestError || "",
    getStockLocation: (state: State) => state.posts.stockLocation || {},
    getSaveActiveField: (state: State) => state.posts.saveActiveField || "",
    getCancelActiveField: (state: State) => state.posts.cancelActiveField || "",
};