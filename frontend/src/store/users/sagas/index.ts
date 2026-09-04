import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as usersActions from "../actions";
import * as services from "../../../services";
import { updateUsbs } from "../../../helpers/data";

function* usersFind({ payload: { query } }: ActionType<typeof usersActions.actions.usersFind>): SagaIterator {
    if (!query) return;

    try {
        const { users = [], usersErrors = [], createNew = false } = yield call(services.users.usersFind, query);

        if (createNew) {
            users.push({ ID: 0, display_name: "Create new user", isCreateNew: true });
            yield put(usersActions.actions.usersFindSuccess({ users, errors: usersErrors }));
        } else {
            yield put(usersActions.actions.usersFindSuccess({ users, errors: usersErrors }));
        }

    } catch (error: any) {
        if (!error.cancelStatus) yield put(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
    }
}

function* userCreate({ payload: { username, email } }: ActionType<typeof usersActions.actions.userCreate>): SagaIterator {
    try {
        const { user = [], error = {} } = yield call(services.users.userCreate, { username, email });

        if (user && user.ID) yield put(usersActions.actions.userCreateSuccess({ user, errors: error }));
        else yield put(usersActions.actions.userCreateFailure({ errors: error }));

    } catch (error: any) {

        yield put(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
    }
}

function* appUpdateUsers({ payload: { data } }: ActionType<typeof usersActions.actions.appUpdateUsers>): SagaIterator {
    try {
        yield put(usersActions.actions.appUpdateUsersLoader({ status: true }));

        const { usbs = null } = yield call(services.users.appUsersUpdateAjax, data);

        if (usbs) updateUsbs(usbs);

        yield put(usersActions.actions.appUpdateUsersLoader({ status: false }));

    } catch (error: any) {
        yield put(usersActions.actions.appUpdateUsersLoader({ status: false }));
    }
}

export default [
    takeEvery(usersActions.actions.usersFind, usersFind),
    takeEvery(usersActions.actions.userCreate, userCreate),
    takeEvery(usersActions.actions.appUpdateUsers, appUpdateUsers)
];
