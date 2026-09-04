import { createAction } from 'typesafe-actions';

export const actions = {
    logError: createAction('LOG/ERROR')<{ message: string, error: any }>(),
}