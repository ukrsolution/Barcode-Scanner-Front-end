import { ActionType, createReducer } from 'typesafe-actions';
import { actions } from '../actions';

interface State {
    pluginValues: Record<string, unknown>;
}

const initialState: State = {
    pluginValues: {}
};

export default createReducer<State, ActionType<typeof actions>>(initialState)
    .handleAction(actions.changeValue, (state, { payload: { plugin, option } }): State => ({
        ...state,
        pluginValues: {
            ...state.pluginValues,
            [plugin]: option
        }
    }));

