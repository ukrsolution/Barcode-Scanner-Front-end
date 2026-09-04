import { createAction } from 'typesafe-actions';

export interface WindowSizeProps {
    width: number;
    height: number;
}

export const actions = {
    updateSize: createAction('WIN/UPDATE_SIZE')<{ size: WindowSizeProps }>(),
}