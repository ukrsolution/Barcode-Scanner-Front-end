
import { createAction } from 'typesafe-actions';

export const actions = {
    // getList: createAsyncAction('STAFF/GET_LIST_R', 'STAFF/GET_LIST_S', 'STAFF/GET_LIST_E')<
    //     { isBackground: Boolean },
    //     { userId: number, list: models.UsersListProps },
    //     { error: string }
    // >(),
    changeValue: createAction('CSF/CHANGE_VALUE')<{ plugin: string, option: any }>(),
}