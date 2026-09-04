import { createAction } from 'typesafe-actions';
import { UserCreateProps } from "../models";

export const actions = {
    usersFind: createAction('USERS/FIND')<{ query: string }>(),
    usersFindSuccess: createAction('USERS/FIND_SUCCESS')<{ users: Array<any>, errors: Array<string> }>(),

    userCreate: createAction('USERS/CREATE')<UserCreateProps>(),
    userCreateSuccess: createAction('USERS/CREATE_SUCCESS')<{ user: any, errors: any }>(),
    userCreateFailure: createAction('USERS/CREATE_FAILURE')<{ errors: any }>(),

    setOrderUser: createAction('USERS/SET_ORDER_USER')<{ userId: number }>(),
    appUpdateUsers: createAction('USERS/UPDATE_USERS')<{ data: string }>(),
    appUpdateUsersLoader: createAction('USERS/UPDATE_USERS_LOADER')<{ status: boolean }>(),
}