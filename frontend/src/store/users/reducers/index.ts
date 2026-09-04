import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from '../actions';

interface State {
    users: Array<any>;
    errors: Array<any>;
    newUser: Record<string, unknown>;
    newUserErrors: Record<string, unknown>;
    loaderStatus: boolean;
    appUsersLoaderStatus: boolean;
    orderUserId: number;
}

const initialState: State = {
    users: [],
    errors: [],
    newUser: {},
    newUserErrors: {},
    loaderStatus: false,
    appUsersLoaderStatus: false,
    orderUserId: 0
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.usersFind, (state, { }): State => ({ ...state, users: [], errors: [], loaderStatus: true }))
    .handleAction(actions.usersFindSuccess, (state, { payload: { users, errors } }): State => ({ ...state, users, errors, loaderStatus: false }))

    .handleAction(actions.userCreate, (state, { }): State => ({ ...state, loaderStatus: true }))
    .handleAction(actions.userCreateSuccess, (state, { payload: { user, errors } }): State => ({ ...state, newUser: user, newUserErrors: errors, loaderStatus: false }))
    .handleAction(actions.userCreateFailure, (state, { payload: { errors } }): State => ({ ...state, newUserErrors: errors, loaderStatus: false }))

    .handleAction(actions.setOrderUser, (state, { payload: { userId } }): State => ({ ...state, orderUserId: userId }))
    .handleAction(actions.appUpdateUsersLoader, (state, { payload: { status } }): State => ({ ...state, appUsersLoaderStatus: status }));

