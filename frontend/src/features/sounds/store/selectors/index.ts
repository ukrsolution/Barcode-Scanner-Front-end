
import { State } from "../../../../store/reducers";

export const Selectors = {
    getTone: (state: State) => state.sounds.tone || "",
    getSoundStatus: (state: State) => state.sounds.status ?? true,

    // getList: (state: State) => state.staffManager.listById || {},
    // makeGetListByUser: (id: number) => createSelector(Selectors.getList, listById => listById[id] || {}),
};

