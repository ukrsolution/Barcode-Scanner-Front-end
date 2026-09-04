import { ActionType, createReducer } from 'typesafe-actions';
import { locationProps } from '../../../features/search/components/stockLocations/StockLocations';
import { actions } from '../actions';

interface State {
    postsList: Array<any>;
    previousPostsList: Array<any>;
    postAutoAction: string;
    postManagement: Record<string, unknown>;
    postChanges: Record<string, unknown>;
    orderManagement: Record<string, unknown>;
    loaderStatus: boolean;
    loaderQuantityStatus: boolean;
    quantityRequestCounter: number;
    quantityRequestError: string;
    requestError: string;
    stockLocation: locationProps | any;
    saveActiveField: string;
    cancelActiveField: string;
}

const initialState: State = {
    postsList: [],
    previousPostsList: [],
    postAutoAction: "",
    postManagement: {},
    postChanges: {},
    orderManagement: {},
    loaderStatus: false,
    loaderQuantityStatus: false,
    quantityRequestCounter: 0,
    quantityRequestError: "",
    requestError: "",
    stockLocation: {},
    saveActiveField: "",
    cancelActiveField: "",
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.managementInventoryAutoAction, (state, { payload: { action } }): State => ({ ...state, postAutoAction: action }))
    .handleAction(actions.updatePostManagement, (state, { payload: { post } }): State => ({ ...state, postManagement: post }))
    .handleAction(actions.updatePostManagementFields, (state, { payload: { fields } }): State => ({ ...state, postManagement: { ...state.postManagement, ...fields } }))
    .handleAction(actions.updateOrderManagement, (state, { payload: { order } }): State => ({ ...state, orderManagement: order }))
    .handleAction(actions.updateQuantityLoaderStatus, (state, { payload: { requestCounter, status } }): State => ({ ...state, loaderQuantityStatus: status, quantityRequestCounter: requestCounter, }))
    .handleAction(actions.updateQuantityError, (state, { payload: { error } }): State => ({ ...state, quantityRequestError: error, }))
    .handleAction(actions.updateLoaderStatus, (state, { payload: { status } }): State => ({ ...state, loaderStatus: status }))
    .handleAction(actions.updatePostsList, (state, { payload: { list } }): State => ({ ...state, postsList: list }))
    .handleAction(actions.updatePreviousPostsList, (state, { payload: { list } }): State => ({ ...state, previousPostsList: list }))
    .handleAction(actions.managementInventorySetChanges, (state, { payload: { field, postId, value } }): State => ({ ...state, postChanges: { ...state.postChanges, postId, [field]: value } }))
    .handleAction(actions.managementInventoryClearChanges, (state, { }): State => ({ ...state, postChanges: {} }))
    .handleAction(actions.miRequestError, (state, { payload: { error } }): State => ({ ...state, requestError: error }))
    .handleAction(actions.setStockLocation, (state, { payload: { location } }): State => ({ ...state, stockLocation: location }))
    .handleAction(actions.saveActiveField, (state, { payload: { field } }): State => ({ ...state, saveActiveField: field }))
    .handleAction(actions.cancelActiveField, (state, { payload: { field } }): State => ({ ...state, cancelActiveField: field }));