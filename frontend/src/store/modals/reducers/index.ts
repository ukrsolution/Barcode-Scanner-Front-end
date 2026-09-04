import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from '../actions';

interface State {
    infoMessage: string;
}

const initialState: State = {
    infoMessage: ""
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.updateInfo, (state, { payload: { message } }): State => ({ ...state, infoMessage: message }));

