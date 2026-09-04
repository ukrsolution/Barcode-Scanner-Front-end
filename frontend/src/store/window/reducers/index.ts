import { ActionType, createReducer } from 'typesafe-actions';
import { actions, WindowSizeProps } from '../actions';

interface State {
    size: WindowSizeProps;
}

const initialState: State = {
    size: { width: 0, height: 0 },
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.updateSize, (state, { payload: { size } }): State => ({ ...state, size }));