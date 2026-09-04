import { SagaIterator } from "redux-saga";
import { delay, takeEvery } from "redux-saga/effects";
import * as windowActions from "../actions";
import * as settingsActions from "../../settings/actions";
import Store from "../../";

function reportWindowSize() {
    Store.store.dispatch(windowActions.actions.updateSize({ size: { width: window.innerWidth, height: window.innerHeight } }));
}

function* appStarted(): SagaIterator {
    window.onresize = reportWindowSize;

    yield delay(0);
}

export default [
    takeEvery(settingsActions.actionTypes.APP_STARTED, appStarted),
];
