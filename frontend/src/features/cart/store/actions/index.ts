import { createAction } from 'typesafe-actions';
import { CartDetailsProps } from "../models";

export const actionTypes = {
    // CART_ADD_ITEM: "CART_ADD_ITEM",
    // CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
    // CART_UPDATE_ITEM_QUANTITY: "CART_UPDATE_ITEM_QUANTITY",
    // CART_CLEAR: "CART_CLEAR",
    // CART_UPDATE_LIST: "CART_UPDATE_LIST",
    // CART_UPDATE_DETAILS: "CART_UPDATE_DETAILS",
    // CART_UPDATE_ERRORS: "CART_UPDATE_ERRORS",
    // CART_ORDER_CREATE: "CART_ORDER_CREATE",
    // CART_ORDER_WAS_CREATED: "CART_ORDER_WAS_CREATED",
    // CART_UPDATE_ITEM_ATTRIBUTES: "CART_UPDATE_ITEM_ATTRIBUTES",
    // CART_UPDATE_ATTRIBUTES: "CART_UPDATE_ATTRIBUTES",
    // CART_UPDATE_ITEM_UPDATED_ACTION: "CART_UPDATE_ITEM_UPDATED_ACTION",
    // CART_ITEMS_SCROLL_BOTTOM: "CART_ITEMS_SCROLL_BOTTOM",
    // CART_GET_STATUSES: "CART_GET_STATUSES",
    // CART_UPDATE_STATUSES: "CART_UPDATE_STATUSES",
    // CART_UPDATE_NEW_ORDER_STATUS: "CART_UPDATE_NEW_ORDER_STATUS",
    // CART_UPDATE_NEW_ORDER_SHIPPING: "CART_UPDATE_NEW_ORDER_SHIPPING",
    // CART_UPDATE_NEW_ORDER_PAYMENT: "CART_UPDATE_NEW_ORDER_PAYMENT",
    // CART_CUSTOM_ITEM_PRICE: "CART_CUSTOM_ITEM_PRICE",
    // CART_CLEAR_CUSTOM_ITEM_PRICE: "CART_CLEAR_CUSTOM_ITEM_PRICE",
    // CART_CUSTOM_ORDER_PRICE: "CART_CUSTOM_ORDER_PRICE",
    // CART_CUSTOM_ORDER_SUB_PRICE: "CART_CUSTOM_ORDER_SUB_PRICE",
    // CART_CUSTOM_ORDER_TAX: "CART_CUSTOM_ORDER_TAX",
    // CART_RECALCULATE: "CART_RECALCULATE",
    // CART_CHANGES_MSG: "CART_CHANGES_MSG",
    // wc rest api
    CART_RA_ADD_ITEM: "CART_RA_ADD_ITEM"
};

export const actions = {
    clear: createAction('CART/CLEAR')(),

    addItem: createAction('CART/ADD_ITEM')<{ query: string, autoFill: boolean, byId: boolean, setQty: null | number }>(),
    addItemQty: createAction('CART/ADD_ITEM_QTY')<{ query: string, qty: number }>(),
    addItemRA: createAction('CART/RA_ADD_ITEM')<{ query: string }>(),
    removeItem: createAction('CART/REMOVE_ITEM')<{ cartKey: string }>(),
    updateItemQuantity: createAction('CART/UPDATE_ITEM_QUANTITY')<{ quantity: number, itemIndex: number, productQty: boolean }>(),
    updateItemQuantityLoader: createAction('CART/UPDATE_ITEM_QUANTITY_LOADER')<{ status: boolean }>(),
    updateItemsList: createAction('CART/UPDATE_LIST')<{ list: Array<any> }>(),
    updateDetails: createAction('CART/UPDATE_DETAILS')<{ details: CartDetailsProps }>(),
    updateErrors: createAction('CART/UPDATE_ERRORS')<{ errors: Array<any> }>(),

    orderCreate: createAction('CART/ORDER_CREATE')<{ isOpen: boolean, userId: number, extraData: any }>(),
    orderCreated: createAction('CART/ORDER_WAS_CREATED')<{ id: number, url: string }>(),

    itemsScrollBottom: createAction('CART/ITEMS_SCROLL_BOTTOM')(),

    updateItemAttributes: createAction('CART/UPDATE_ITEM_ATTRIBUTES')<{ item: any }>(),
    updateAttributes: createAction('CART/UPDATE_ATTRIBUTES')<{ item: any, attributes: any }>(),
    setItemUpdatedAction: createAction('CART/UPDATE_ITEM_UPDATED_ACTION')<{ itemIndex: number, item: any }>(),

    updateQty: createAction('CART/UPDATE_QTY')<{ item: any }>(),

    getStatuses: createAction('CART/GET_STATUSES')(),
    updateStatuses: createAction('CART/UPDATE_STATUSES')<{ statuses: any }>(),

    updateNewOrderStatus: createAction('CART/UPDATE_NEW_ORDER_STATUS')<{ status: string }>(),
    updateNewOrderShipping: createAction('CART/UPDATE_NEW_ORDER_SHIPPING')<{ value: string, isRecalculate: boolean }>(),
    updateNewOrderPayment: createAction('CART/UPDATE_NEW_ORDER_PAYMENT')<{ value: string }>(),

    setCustomItemPrice: createAction('CART/CUSTOM_ITEM_PRICE')<{ itemId: number, price: string | undefined, cartKey: string }>(),
    clearCustomItemsPrices: createAction('CART/CLEAR_CUSTOM_ITEM_PRICE')(),
    setCustomOrderPrice: createAction('CART/CUSTOM_ORDER_PRICE')<{ price: string | undefined }>(),
    setCustomOrderSubPrice: createAction('CART/CUSTOM_ORDER_SUB_PRICE')<{ price: string | undefined }>(),
    setCustomOrderTax: createAction('CART/CUSTOM_ORDER_TAX')<{ price: string | undefined }>(),
    setCartChangesMsg: createAction('CART/CHANGES_MSG')<{ message: string }>(),

    recalculate: createAction('CART/RECALC')(),
}

// export const addItem = (query: string, autoFill: boolean) => ({ type: actionTypes.CART_ADD_ITEM, payload: { query, autoFill } });
// export const addItemRA = (query: string) => ({ type: actionTypes.CART_RA_ADD_ITEM, payload: { query } });

// export const removeItem = (cartKey: string) => ({ type: actionTypes.CART_REMOVE_ITEM, payload: { cartKey } });

// export const updateItemQuantity = (quantity: number, itemIndex: number) => ({ type: actionTypes.CART_UPDATE_ITEM_QUANTITY, payload: { quantity, itemIndex } });

// export const clear = () => ({ type: actionTypes.CART_CLEAR });

// export const updateItemsList = (list: Array<any>) => ({ type: actionTypes.CART_UPDATE_LIST, payload: { list } });
// export const updateDetails = (details: CartDetailsProps) => ({ type: actionTypes.CART_UPDATE_DETAILS, payload: { details } });
// export const updateErrors = (errors: Array<any>) => ({ type: actionTypes.CART_UPDATE_ERRORS, payload: { errors } });

// export const orderCreate = (isOpen: boolean, userId: number, extraData: any) => ({ type: actionTypes.CART_ORDER_CREATE, payload: { isOpen, userId, extraData } });
// export const orderCreated = (id: number, url: string) => ({ type: actionTypes.CART_ORDER_WAS_CREATED, payload: { id, url } });

// export const itemsScrollBottom = () => ({ type: actionTypes.CART_ITEMS_SCROLL_BOTTOM, });

// export const updateItemAttributes = (item: any) => ({ type: actionTypes.CART_UPDATE_ITEM_ATTRIBUTES, payload: { item } });
// export const updateAttributes = (item: any, attributes: any) => ({ type: actionTypes.CART_UPDATE_ATTRIBUTES, payload: { item, attributes } });
// export const setItemUpdatedAction = (itemIndex: number, item: any) => ({ type: actionTypes.CART_UPDATE_ITEM_UPDATED_ACTION, payload: { itemIndex, item } });

// export const getStatuses = () => ({ type: actionTypes.CART_GET_STATUSES, });
// export const updateStatuses = (statuses: any) => ({ type: actionTypes.CART_UPDATE_STATUSES, payload: { statuses } });

// export const updateNewOrderStatus = (status: string) => ({ type: actionTypes.CART_UPDATE_NEW_ORDER_STATUS, payload: { status } });
// export const updateNewOrderShipping = (value: string, isRecalculate = true) => ({ type: actionTypes.CART_UPDATE_NEW_ORDER_SHIPPING, payload: { value, isRecalculate } });
// export const updateNewOrderPayment = (value: string) => ({ type: actionTypes.CART_UPDATE_NEW_ORDER_PAYMENT, payload: { value } });

// export const setCustomItemPrice = (itemId: number, price: string | undefined, cartKey = "") => ({ type: actionTypes.CART_CUSTOM_ITEM_PRICE, payload: { itemId, price, cartKey } });
// export const clearCustomItemsPrices = () => ({ type: actionTypes.CART_CLEAR_CUSTOM_ITEM_PRICE });
// export const setCustomOrderPrice = (price: string | undefined) => ({ type: actionTypes.CART_CUSTOM_ORDER_PRICE, payload: { price } });
// export const setCustomOrderSubPrice = (price: string | undefined) => ({ type: actionTypes.CART_CUSTOM_ORDER_SUB_PRICE, payload: { price } });
// export const setCustomOrderTax = (price: string | undefined) => ({ type: actionTypes.CART_CUSTOM_ORDER_TAX, payload: { price } });
// export const setCartChangesMsg = (message: string) => ({ type: actionTypes.CART_CHANGES_MSG, payload: { message } });

// export const recalculate = () => ({ type: actionTypes.CART_RECALCULATE });