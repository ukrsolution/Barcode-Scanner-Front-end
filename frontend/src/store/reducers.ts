import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import posts from "./posts/reducers";
import search from "./search/reducers";
import settings from "./settings/reducers";
import cart from "../features/cart/store/reducers";
import order from "./order/reducers";
import modals from "./modals/reducers";
import sounds from "../features/sounds/store/reducers";
import mobModal from "../features/mobile/modal/store/reducers";
import users from "./users/reducers";
import customSearchFilters from "./customSearchFilters/reducers";
import { default as _window } from "./window/reducers";
import { StateType } from "typesafe-actions";

const version = 1;

const postsConf = { version, key: 'posts', storage, blacklist: ["requestError", "saveActiveField", "cancelActiveField"] };
const searchConf = { version, key: 'search', storage, blacklist: ["loaderStatus", "message", "focusOn", "autoFocus", "mobileSearch", "filterStatus", "lastQuery", "openMobileFilter"] };
const settingsConf = {
    version, key: 'settings', storage, blacklist: [
        "mobileAppVersion", "isBlockApp", "InfoBlockApp", "dbCreateColumnLoading", "dbCreateColumnProgress", "dbIndexedStatus",
        "checkCustomFieldStatus", "checkCustomFieldMessage", "checkCustomFieldIsError",
        "dbIndexationPrepare", "dbBgIndexing", "dbBgIndexingTotal", "reloadProcLoader", "isAppOpened"
    ]
};
const cartConf = { version, key: 'cart', storage, blacklist: ["cartChangesMsg", "updateQtyItem", "updateQtyItemLoader"] };
const orderConf = { version, key: 'order', storage };
const modalsConf = { version, key: 'modals', storage };
const soundsConf = { version, key: 'sounds', storage, blacklist: ["tone"] };
const windowConf = { version, key: 'window', storage };
const usersConf = { version, key: 'users', storage, blacklist: ["loaderStatus", "users", "errors", "newUser", "newUserErrors", "orderUserId", "appUsersLoaderStatus"] };
const customSearchFiltersConf = { version, key: 'csFilter', storage, blacklist: [] };

const rootReducers = combineReducers({
    posts: persistReducer(postsConf, posts),
    search: persistReducer(searchConf, search),
    settings: persistReducer(settingsConf, settings),
    cart: persistReducer(cartConf, cart),
    order: persistReducer(orderConf, order),
    modals: persistReducer(modalsConf, modals),
    sounds: persistReducer(soundsConf, sounds),
    window: persistReducer(windowConf, _window),
    users: persistReducer(usersConf, users),
    csFilter: persistReducer(customSearchFiltersConf, customSearchFilters),
    mobModal
});

export type State = StateType<typeof rootReducers>

export default rootReducers;
