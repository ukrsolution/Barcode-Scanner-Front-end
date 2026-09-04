import { createAction } from 'typesafe-actions';
import { locationProps } from "../../../features/search/components/stockLocations/StockLocations";

export const buttonActions = {
    FIND_POST: "FIND_POST",
    MANAGEMENT_INVENTORY: "MANAGEMENT_INVENTORY",
    MANAGEMENT_ORDER: "MANAGEMENT_ORDER",
    CREATE_ORDER: "CREATE_ORDER",
    CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
}

export const actions = {
    searchToOpenPage: createAction('POSTS/SEARCH_AND_OPEN_PAGE')<{ query: string, autoFill: boolean }>(),
    managementInventoryAutoAction: createAction('POSTS/MI_AUTO_ACTION')<{ action: string }>(),
    managementInventory: createAction('POSTS/MANAGEMENT_INVENTORY')<{ query: string, autoFill: boolean }>(),
    managementInventoryFromPreview: createAction('POSTS/MANAGEMENT_INVENTORY_FROM_PREVIEW')<{ postId: number }>(),
    managementInventorySetChanges: createAction('POSTS/MANAGEMENT_INV_SET_CHANGES')<{ postId: number, field: string, value: any }>(),
    managementInventoryClearChanges: createAction('POSTS/MANAGEMENT_INV_CLEAR_CHANGES')(),
    managementInventoryApplyChanges: createAction('POSTS/MANAGEMENT_INV_APPLY_CHANGES')(),
    managementOrder: createAction('POSTS/MANAGEMENT_ORDER')<{ query: string, autoFill: boolean }>(),
    managementOrderFromPreview: createAction('POSTS/MANAGEMENT_ORDER_FROM_PREVIEW')<{ postId: number }>(),
    updateOrderManagement: createAction('POSTS/UPDATE_ORDER_MANAGEMENT')<{ order: any }>(),
    updatePostManagement: createAction('POSTS/UPDATE_POST_MANAGEMENT')<{ post: any }>(),
    updatePostManagementFields: createAction('POSTS/UPDATE_POST_MANAGEMENT_FIELD')<{ fields: any }>(),
    enableProductManageStock: createAction('POSTS/ENABLE_PRODUCT_MANAGE_STOCK')<{ productId: number, products: Array<number> }>(),
    updateProductQuantity: createAction('POSTS/UPDATE_PRODUCT_QUANTITY')<{ productId: number, quantity: number, products: Array<number> }>(),
    updateProductQuantityPlus: createAction('POSTS/UPDATE_PRODUCT_QUANTITY_PLUS')<{ productId: number, products: Array<number> }>(),
    updateProductQuantityMinus: createAction('POSTS/UPDATE_PRODUCT_QUANTITY_MINUS')<{ productId: number, products: Array<number> }>(),
    updateQuantityLoaderStatus: createAction('POSTS/UPDATE_QUANTITY_LOADER_STATUS')<{ status: boolean, requestCounter: number }>(),
    updateQuantityError: createAction('POSTS/UPDATE_QUANTITY_ERROR')<{ error: string }>(),
    updateLoaderStatus: createAction('POSTS/UPDATE_LOADER_STATUS')<{ status: boolean }>(),
    updateProductRegularPrice: createAction('POSTS/UPDATE_PRODUCT_REGULAR_PRICE')<{ productId: number, price: number, products: Array<number> }>(),
    updateProductCustomPrice: createAction('POSTS/UPDATE_PRODUCT_CUSTOM_PRICE')<{ productId: number, field: string, price: number, products: Array<number> }>(),
    updateProductSalePrice: createAction('POSTS/UPDATE_PRODUCT_SALE_PRICE')<{ productId: number, price: number, products: Array<number> }>(),
    updateProductMeta: createAction('POSTS/UPDATE_PRODUCT_META')<{ productId: number, key: string, value: any, products: Array<number> }>(),
    updatePostsList: createAction('POSTS/UPDATE_POSTS_LIST')<{ list: Array<any> }>(),
    updatePreviousPostsList: createAction('POSTS/UPDATE_PREVIOUS_POSTS_LIST')<{ list: Array<any> }>(),
    managementInventoryUpdateTitle: createAction('POSTS/UPDATE_TITLE')<{ productId: number, value: string }>(),
    managementInventorySetImage: createAction('POSTS/SET_IMAGE')<{ postId: number, attachmentId: number }>(),
    managementInventoryCreateNew: createAction('POSTS/CREATE_NEW')<{ query: string }>(),
    miRequestError: createAction('POSTS/REQUEST_ERROR')<{ error: string }>(),
    setStockLocation: createAction('POSTS/STOCK_LOCATION')<{ location: locationProps }>(),
    saveActiveField: createAction('POSTS/SAVE_ACTIVE_FIELD')<{ field: string }>(),
    cancelActiveField: createAction('POSTS/CANCEL_ACTIVE_FIELD')<{ field: string }>(),
}
// export const searchToOpenPage = (query: string, autoFill: boolean) => ({ type: actionTypes.POSTS_SEARCH_AND_OPEN_PAGE, payload: { query, autoFill } });
// export const managementInventoryAutoAction = (action: string) => ({ type: actionTypes.POSTS_MI_AUTO_ACTION, payload: { action } });
// export const managementInventory = (query: string, autoFill: boolean) => ({ type: actionTypes.POSTS_MANAGEMENT_INVENTORY, payload: { query, autoFill } });
// export const managementInventoryFromPreview = (postId: number) => ({ type: actionTypes.POSTS_MANAGEMENT_INVENTORY_FROM_PREVIEW, payload: { postId } });
// export const managementInventorySetChanges = (postId: number, field: string, value: any) => ({ type: actionTypes.POSTS_MANAGEMENT_INV_SET_CHANGES, payload: { postId, field, value } });
// export const managementInventoryClearChanges = () => ({ type: actionTypes.POSTS_MANAGEMENT_INV_CLEAR_CHANGES, });
// export const managementInventoryApplyChanges = () => ({ type: actionTypes.POSTS_MANAGEMENT_INV_APPLY_CHANGES, });
// export const managementOrder = (query: string, autoFill: boolean) => ({ type: actionTypes.POSTS_MANAGEMENT_ORDER, payload: { query, autoFill } });
// export const managementOrderFromPreview = (postId: number) => ({ type: actionTypes.POSTS_MANAGEMENT_ORDER_FROM_PREVIEW, payload: { postId } });
// export const updateOrderManagement = (order: any) => ({ type: actionTypes.POSTS_UPDATE_ORDER_MANAGEMENT, payload: { order } });
// export const updatePostManagement = (post: any) => ({ type: actionTypes.POSTS_UPDATE_POST_MANAGEMENT, payload: { post } });
// export const updatePostManagementFields = (fields: any) => ({ type: actionTypes.POSTS_UPDATE_POST_MANAGEMENT_FIELD, payload: { fields } });
// export const enableProductManageStock = (productId: number, products: Array<number>) => ({ type: actionTypes.POSTS_ENABLE_PRODUCT_MANAGE_STOCK, payload: { productId, products } });
// export const updateProductQuantity = (productId: number, quantity: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_QUANTITY, payload: { productId, quantity, products } });
// export const updateProductQuantityPlus = (productId: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_QUANTITY_PLUS, payload: { productId, products } });
// export const updateProductQuantityMinus = (productId: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_QUANTITY_MINUS, payload: { productId, products } });
// export const updateQuantityLoaderStatus = (status: boolean, requestCounter: number) => ({ type: actionTypes.POSTS_UPDATE_QUANTITY_LOADER_STATUS, payload: { status, requestCounter } });
// export const updateQuantityError = (error: string) => ({ type: actionTypes.POSTS_UPDATE_QUANTITY_ERROR, payload: { error } });
// export const updateLoaderStatus = (status: boolean) => ({ type: actionTypes.POSTS_UPDATE_LOADER_STATUS, payload: { status } });
// export const updateProductRegularPrice = (productId: number, price: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_REGULAR_PRICE, payload: { productId, price, products } });
// export const updateProductCustomPrice = (productId: number, field: string, price: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_CUSTOM_PRICE, payload: { productId, field, price, products } });
// export const updateProductSalePrice = (productId: number, price: number, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_SALE_PRICE, payload: { productId, price, products } });
// export const updateProductMeta = (productId: number, key: string, value: any, products: Array<number>) => ({ type: actionTypes.POSTS_UPDATE_PRODUCT_META, payload: { productId, key, value, products } });
// export const updatePostsList = (list: Array<any>) => ({ type: actionTypes.POSTS_UPDATE_POSTS_LIST, payload: { list } });
// export const updatePreviousPostsList = (list: Array<any>) => ({ type: actionTypes.POSTS_UPDATE_PREVIOUS_POSTS_LIST, payload: { list } });
// export const managementInventoryUpdateTitle = (productId: number, value: string) => ({ type: actionTypes.POSTS_UPDATE_TITLE, payload: { productId, value } });
// export const managementInventorySetImage = (postId: number, attachmentId: number) => ({ type: actionTypes.POSTS_SET_IMAGE, payload: { postId, attachmentId } });
// export const managementInventoryCreateNew = (query: string) => ({ type: actionTypes.POSTS_CREATE_NEW, payload: { query } });
// export const miRequestError = (error: string) => ({ type: actionTypes.POSTS_REQUEST_ERROR, payload: { error } });
// export const setStockLocation = (location: locationProps) => ({ type: actionTypes.STOCK_LOCATION, payload: { location } });
// export const saveActiveField = (field: string) => ({ type: actionTypes.SAVE_ACTIVE_FIELD, payload: { field } });
// export const cancelActiveField = (field: string) => ({ type: actionTypes.CANCEL_ACTIVE_FIELD, payload: { field } });
