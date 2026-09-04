import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import createSagaMiddeware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const loggerMiddleware = createLogger({ collapsed: true, duration: true });

const sagaMiddeware = createSagaMiddeware();

const persistConfig = {
    version: 1,
    key: 'barcode-scanner-v2',
    prefix: "",
    storage,
    blacklist: [],
    whitelist: [],
    serializableCheck: false,
    debug: false,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'development' ?
        applyMiddleware(loggerMiddleware, sagaMiddeware, thunkMiddleware) :
        applyMiddleware(sagaMiddeware, thunkMiddleware)
);
const persistor = persistStore(store);

sagaMiddeware.run(rootSaga);

export default { store, persistor };
