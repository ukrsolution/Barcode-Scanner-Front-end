import { createAction } from 'typesafe-actions';

export const actions = {
    updateInfo: createAction('MODALS/UPDATE_INFO')<{ message: string }>(),
}