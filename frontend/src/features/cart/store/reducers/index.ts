import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from "../actions";
import { CartDetailsProps } from '../models';

interface State {
    items: Array<any>;
    details: CartDetailsProps;
    errors: Array<any>;
    itemAttributes: Record<string, unknown>;
    statuses: Record<string, unknown>;
    createdOrder: Record<string, unknown>;
    newOrderStatus: string;
    newOrderShipping: string;
    newOrderPayment: string;
    itemsCustomPrices: Record<string, unknown>;
    orderCustomPrice: string | undefined;
    orderCustomSubPrice: string | undefined;
    orderCustomTax: string | undefined;
    cartChangesMsg: string;
    scrollBottom: number;
    updateQtyItem: Record<string, unknown>;
    updateQtyItemLoader: boolean;
}

const initialState: State = {
    items: [],
    details: { cart_subtotal: "", cart_subtotal_c: "", cart_total: "", cart_total_c: "", shipping: "", shipping_c: "", shipping_tax: "", total_tax: "", total_tax_c: "" },
    errors: [],
    itemAttributes: {},
    statuses: {},
    createdOrder: {},
    newOrderStatus: "",
    newOrderShipping: "",
    newOrderPayment: "",
    itemsCustomPrices: {},
    orderCustomPrice: undefined,
    orderCustomSubPrice: undefined,
    orderCustomTax: undefined,
    cartChangesMsg: "",
    scrollBottom: 0,
    updateQtyItem: {},
    updateQtyItemLoader: false,
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.updateItemsList, (state, { payload: { list } }): State => ({ ...state, items: list }))
    .handleAction(actions.updateDetails, (state, { payload: { details } }): State => ({ ...state, details }))
    .handleAction(actions.updateErrors, (state, { payload: { errors } }): State => ({ ...state, errors }))
    .handleAction(actions.itemsScrollBottom, (state, { }): State => ({ ...state, scrollBottom: state.scrollBottom ? state.scrollBottom + 1 : 1 }))
    .handleAction(actions.updateItemAttributes, (state, { payload: { item } }): State => ({ ...state, itemAttributes: item }))
    .handleAction(actions.setItemUpdatedAction, (state, { payload: { item, itemIndex } }): State => {
        let list: Array<any> = [...state.items];
        list[itemIndex] = item;
        return { ...state, items: list };
    })
    .handleAction(actions.updateQty, (state, { payload: { item } }): State => ({ ...state, updateQtyItem: item }))
    .handleAction(actions.updateStatuses, (state, { payload: { statuses } }): State => ({ ...state, statuses }))
    .handleAction(actions.orderCreated, (state, { payload: { id, url } }): State => ({ ...state, createdOrder: { id, url } }))
    .handleAction(actions.updateNewOrderStatus, (state, { payload: { status } }): State => ({ ...state, newOrderStatus: status }))
    .handleAction(actions.updateNewOrderShipping, (state, { payload: { value } }): State => ({ ...state, newOrderShipping: value }))
    .handleAction(actions.updateNewOrderPayment, (state, { payload: { value } }): State => ({ ...state, newOrderPayment: value }))
    .handleAction(actions.setCustomItemPrice, (state, { payload: { cartKey, itemId, price } }): State => ({
        ...state, itemsCustomPrices: { ...state.itemsCustomPrices, [itemId]: price, [cartKey]: price, }
    }))
    .handleAction(actions.clearCustomItemsPrices, (state, { }): State => ({ ...state, itemsCustomPrices: {} }))
    .handleAction(actions.setCustomOrderPrice, (state, { payload: { price } }): State => ({ ...state, orderCustomPrice: price }))
    .handleAction(actions.setCustomOrderSubPrice, (state, { payload: { price } }): State => ({ ...state, orderCustomSubPrice: price }))
    .handleAction(actions.setCustomOrderTax, (state, { payload: { price } }): State => ({ ...state, orderCustomTax: price }))
    .handleAction(actions.setCartChangesMsg, (state, { payload: { message } }): State => ({ ...state, cartChangesMsg: message }))
    .handleAction(actions.updateItemQuantityLoader, (state, { payload: { status } }): State => ({ ...state, updateQtyItemLoader: status }));