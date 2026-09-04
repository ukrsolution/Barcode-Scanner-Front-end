import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as services from "../../../services";
import { consoleLog } from "../../../features/mobile/helpers/messages";

import * as logActions from "../actions";

function* logError({ payload: { message, error } }: ActionType<typeof logActions.actions.logError>): SagaIterator {
    try {
        console.log(message);
        consoleLog(`handlerError. ${message}`);
    } catch (e: any) {
        console.error(`logError. ${e.message}`);
    }
}

export default [
    takeEvery(logActions.actions.logError, logError),
];
