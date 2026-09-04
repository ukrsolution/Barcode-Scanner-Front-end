import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import * as orderActions from "../actions";
import * as postsActions from "../../posts/actions";
import * as searchActions from "../../search/actions";
import * as logActions from "../../log/actions";
import * as services from "../../../services";

function* changeStatus({ payload: { orderId, status } }: any): SagaIterator {
    try {
        yield put(orderActions.updateLoaderStatus(true, orderId));
        yield put(searchActions.actions.updateMessage({
            place: postsActions.buttonActions.MANAGEMENT_ORDER,
            message: "",
            type: "",
            query: "",
            params: {}
        }));

        const data: any = yield call(services.order.changeStatus, orderId, status);
        const orders: Array<any> = data?.orders || [];

        if (orders.length === 1) {
            const order: any = orders[0];

            yield put(postsActions.actions.updateOrderManagement({ order: { ...order, useAction: true } }));
        } else {
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.MANAGEMENT_ORDER,
                message: "Not found",
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: {}
            }));
        }
    } catch (e: any) {
        if (!e.cancelStatus) yield put(logActions.actions.logError({ message: `changeStatus. ${e.message}`, error: e }));
        // yield put(searchActions.updateMessage(postsActions.buttonActions.MANAGEMENT_ORDER, e.message, searchActions.messageTypes.ERROR));
    }

    yield put(orderActions.updateLoaderStatus(false));
    yield put(searchActions.actions.finished());
}

export default [
    takeEvery(orderActions.actionTypes.ORDER_CHANGE_STATUS, changeStatus),
];
