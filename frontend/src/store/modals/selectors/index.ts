import { State } from "../../../store/reducers";

export const Selectors = {
    getInfoMessage: (state: State) => state.modals.infoMessage ?? "",
};