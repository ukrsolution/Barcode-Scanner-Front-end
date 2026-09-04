import { State } from "../../../../store/reducers";

export const Selectors = {
    getCartItems: (state: State) => state.cart.items || [],
    getCartDetails: (state: State) => state.cart.details || {},
    getCartErrors: (state: State) => state.cart.errors || [],
    getScrollBottom: (state: State) => state.cart.scrollBottom || 0,
    getItemAttributes: (state: State) => state.cart.itemAttributes || {},
    getStatuses: (state: State) => state.cart.statuses || {},
    getCreatedOrder: (state: State) => state.cart.createdOrder || {},
    getNewOrderStatus: (state: State) => state.cart.newOrderStatus || "",
    getNewOrderShipping: (state: State) => state.cart.newOrderShipping || "",
    getNewOrderPayment: (state: State) => state.cart.newOrderPayment || "",
    getItemsCustomPrices: (state: State) => state.cart.itemsCustomPrices || {},
    getOrderCustomPrice: (state: State) => state.cart.orderCustomPrice || undefined,
    getOrderCustomSubPrice: (state: State) => state.cart.orderCustomSubPrice || undefined,
    getOrderCustomTax: (state: State) => state.cart.orderCustomTax || undefined,
    getCartChangesMsg: (state: State) => state.cart.cartChangesMsg ?? "",
    getUpdateQtyItem: (state: State) => state.cart.updateQtyItem ?? {},
    getUpdateQtyItemLoader: (state: State) => state.cart.updateQtyItemLoader,
};