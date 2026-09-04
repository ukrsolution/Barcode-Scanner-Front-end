import { createSelector } from "reselect";

export const getUsersSelector = (state: any) => state.users;

// users
export const getUsers = createSelector(
    getUsersSelector,
    (users) => users.users || []
);

// errors
export const getErrors = createSelector(
    getUsersSelector,
    (users) => users.errors
);

// new user errors
export const getNewUser = createSelector(
    getUsersSelector,
    (users) => users.newUser || {}
);

// new user errors
export const getNewUserErrors = createSelector(
    getUsersSelector,
    (users) => users.newUserErrors || {}
);

// loaderStatus
export const getLoaderStatus = createSelector(
    getUsersSelector,
    (users) => users.loaderStatus
);

// orderUserId
export const getOrderUserId = createSelector(
    getUsersSelector,
    (users) => users.orderUserId
);

// appUsersLoaderStatus
export const getAppUsersLoaderStatus = createSelector(getUsersSelector, (users) => users.appUsersLoaderStatus);