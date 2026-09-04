import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from '../actions';

interface State {
    status: boolean;
    tone: string;
}

const initialState: State = {
    status: false,
    tone: "string",
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.soundPlay, (state, { payload: { tone } }): State => ({
        ...state,
        tone
    }))
    .handleAction(actions.setSoundStatus, (state, { payload: { status } }): State => ({
        ...state,
        status
    }));

