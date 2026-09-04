import { SagaIterator } from "redux-saga";
import { all } from "redux-saga/effects";

import posts from "./posts/sagas";
import order from "./order/sagas";
import search from "./search/sagas";
import settings from "./settings/sagas";
import cart from "../features/cart/store/sagas";
import cartRA from "../features/cart/store/sagas/WcRestApi";
import log from "./log/sagas";
import modals from "./modals/sagas";
import { default as _window } from "./window/sagas";
import mobileCommands from "./mobile/commands/sagas";
import users from "./users/sagas";
import customSearchFilters from "./customSearchFilters/sagas";

function* rootSaga(): SagaIterator {
    yield all([
        ...posts,
        ...order,
        ...search,
        ...settings,
        ...cart,
        ...cartRA,
        ...log,
        ...modals,
        ..._window,
        ...mobileCommands,
        ...users,
        ...customSearchFilters
    ]);
}

export default rootSaga;
