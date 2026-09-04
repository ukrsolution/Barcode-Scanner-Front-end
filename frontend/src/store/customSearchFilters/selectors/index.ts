import { State } from "../../../store/reducers";

export const Selectors = {
    getValues: (state: State) => state.csFilter.pluginValues ?? {},
};