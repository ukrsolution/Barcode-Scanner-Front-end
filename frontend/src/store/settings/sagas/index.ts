import { SagaIterator } from "redux-saga";
import { call, delay, fork, put, select, takeEvery } from "redux-saga/effects";
import * as settingsActions from "../actions";
import * as searchActions from "../../search/actions";
import * as postsActions from "../../posts/actions";
import * as modalsActions from "../../modals/actions";
import * as cartActions from "../../../features/cart/store/actions";
import * as services from "../../../services";
import { en, de, parseJson, updateUsbs } from "../../../helpers/data";
import usePluginParams from "../../../hooks/usePluginParams";
import { MobileCommandProps } from "../../../features/mobile/scanning/containers/ScanningContainer";
import * as mobileCommandsActions from "../../mobile/commands/actions";
import * as logActions from "../../log/actions";
import * as settingsSelectors from "../selectors";
import * as searchSagas from "../../search/sagas";
import config from "../../../helpers/config";
import { Selectors as customSearchFiltersSelectors } from "../../customSearchFilters/selectors";
import { parseUpdated, parseUpdatedResult } from "../../../helpers/date";

function* appStarted(): SagaIterator {
    const pluginData = usePluginParams();

    // restore session

    if (pluginData.session && pluginData.sessionStamp) {
        // save last updated time
        yield put(settingsActions.setUpLast(pluginData.sessionStamp));
        // save last server response
        yield put(settingsActions.setUpdated(pluginData.session));
    }

    const s = pluginData.settings[de("gSUwbMT+OnvjoZ861LY+yg==")] ?? {};
    yield put(settingsActions.checkProc(s[config.key] ?? ""));

    // reset old request data
    yield put(postsActions.actions.updateQuantityLoaderStatus({ status: false, requestCounter: 0 }));
    yield put(postsActions.actions.updateLoaderStatus({ status: false }));
    yield put(postsActions.actions.updateQuantityError({ error: "" }));
    yield put(postsActions.actions.updatePostsList({ list: [] }));
    yield put(postsActions.actions.updatePostManagement({ post: {} }));
    yield put(postsActions.actions.updateOrderManagement({ order: {} }));

    // reset modals
    yield put(modalsActions.actions.updateInfo({ message: "" }));

    // reset search results
    yield put(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    yield put(searchActions.actions.resetAllMessages());

    // reset cart
    yield put(cartActions.actions.updateItemAttributes({ item: {} }));

    // init filter by server settings
    if (pluginData.searchFilter && pluginData.searchFilter.value) {
        const filter = pluginData.searchFilter.value;

        // update product fields
        for (const name in filter.products) {
            if (Object.prototype.hasOwnProperty.call(filter.products, name)) {
                yield put(settingsActions.searchFilterUpdateProduct(name, filter.products[name]));
            }
        }

        // update order fields
        for (const name in filter.orders) {
            if (Object.prototype.hasOwnProperty.call(filter.orders, name)) {
                yield put(settingsActions.searchFilterUpdateOrder(name, filter.orders[name]));
            }
        }

    }
}

function* searchModalOpenStatus({ payload: { status } }: any): SagaIterator {
    if (status) {
        // posts / search
        yield put(postsActions.actions.updatePostsList({ list: [] }));
        yield put(searchActions.actions.resetAllMessages());

        // cart
        yield put(cartActions.actions.updateItemAttributes({ item: {} }));

    }
}

function* mobileAppVersion({ payload: { version } }: any): SagaIterator {
    if (version) {
        // version = "0.9";
        const pluginData = usePluginParams();

        const mV = version.split(".");
        const pV = pluginData.pluginVersion.split(".");

        if (!mV.length || !pV.length) return;

        if (parseInt(mV[0]) === parseInt(pV[0])) return;

        // const msg = `This app (${version}) is not compatible with plugin version (${pluginData.pluginVersion}), please update the app or plugin.`;

        // block app if first acted is different
        if (parseInt(mV[0]) > parseInt(pV[0])) {
            // yield put(mobileCommandsActions.updateModal(msg, { blockApp: true }));
            // return;

            // mobile version is greater
            yield put(settingsActions.setBlockApp({ appVersion: version, pluginVersion: pluginData.pluginVersion }));
            // yield delay(1000);
            yield call(showMobileBottomDrawer);
        }

        // block app if first acted is different
        if (parseInt(mV[0]) < parseInt(pV[0])) {
            // yield put(mobileCommandsActions.updateModal(msg, { blockApp: true }));
            // return;
            // plugin version is greater
            yield put(settingsActions.setBlockApp({ appVersion: version, pluginVersion: pluginData.pluginVersion }));
            // yield delay(1000);
            yield call(showMobileBottomDrawer);

        }
    }
}

function showMobileBottomDrawer() {
    // show rn bottom panel
    const rootEl: HTMLElement | null = document.querySelector("#ukrsolution-barcode-scanner-mobile");
    const data: MobileCommandProps = {
        message: "mobile.postMessage",
        method: mobileCommandsActions.commands.CMD_SCANNING_START,
        options: {
            status: true,
            postManage: true,
            documentHeight: rootEl ? rootEl.offsetHeight : 0,
            camera: "pause"
        },
    };
    window.parent.postMessage(data, "*");
}

function* checkProc({ payload: { key, action } }: any): SagaIterator {
    try {
        const checker: string = yield call(services.ukrsolution.check, key);
        yield call(services.ukrsolution.checkClearResult);


        let object: any = parseJson(de(checker));
        const { li } = object;
        let message = "";

        if (checker === "") {
            // current timestamp
            const ts = new Date().getTime();
            // get last update date
            const upLast = yield select(settingsSelectors.getUpLast);
            const lastUpdated = parseInt(de(upLast)) || 0;

            // get last error update counter
            const upErr = yield select(settingsSelectors.getUpErr);
            let updateErrorCounter = parseInt(de(upErr)) || 0;

            // check last updated time in milliseconds
            if (lastUpdated !== 0 && ts - lastUpdated > parseInt(de(config.delay)) * parseInt(de("ysDX3opIcbstVG6F8nXtMQ==")) && updateErrorCounter >= 30) {
                // * days delay
                object = { s: false, st: de("AT9xQl1XgTHmlaNfjrgbffxJSbfszfbVCi0WSC/DRdCxiQZwUPPOurM2BSwL9CWNIHinlBirSFHftCPv66PQ0f/s2hn2wMsbJhP7lYIi2sQ=") };
                yield put(settingsActions.setUpdated(en(JSON.stringify(object))));
            } else if (lastUpdated === 0) {
                object = { s: false, st: de("AT9xQl1XgTHmlaNfjrgbffxJSbfszfbVCi0WSC/DRdCxiQZwUPPOurM2BSwL9CWNIHinlBirSFHftCPv66PQ0f/s2hn2wMsbJhP7lYIi2sQ=") };
                yield put(settingsActions.setUpdated(en(JSON.stringify(object))));
            }

            // increase update error counter
            yield put(settingsActions.setUpErr(en(`${++updateErrorCounter}`)));
        } else {
            // save last updated time
            const time = en(`${new Date().getTime()}`);
            yield put(settingsActions.setUpLast(time));
            // reset update errors
            yield put(settingsActions.setUpErr(""));
            // save last server response
            yield put(settingsActions.setUpdated(checker));
            // save to database
            yield call(services.db.saveSession, checker, time);
        }

        if (object.s) {
            message = `<div>${li}</div>`;
        } else if (object.m) {
            message = `<div style="color:red;padding:5px 10px;" >${object.m}</div>`;
        }

        if (message) window.parent.postMessage({ message: "iframe.checkResult", resultMessage: message, action }, "*");
    } catch (e: any) {
        // console.error(">>> ", e);
    }
}

let lastInterval = Date.now();
function* interval() {
    while (true) {
        yield delay(20 * 1000);

        if (Date.now() - lastInterval > parseInt(de(`DCsFuFQ3iErqEHYHLNtuNg==`))) {
            const pluginData = usePluginParams();

            const s = pluginData.settings[de("gSUwbMT+OnvjoZ861LY+yg==")] ?? {};
            yield put(settingsActions.checkProc(s[config.key] ?? ""));

            lastInterval = Date.now();
        }
    }
}

function* checkCustomFields({ payload: { fields } }: any): SagaIterator {
    try {
        yield put(settingsActions.checkCustomFieldsResult(true, "", false));

        const filter = yield call(searchSagas.getSearchFilter);
        const customFilter = yield select(customSearchFiltersSelectors.getValues);
        const data: any = yield call(services.posts.checkCustomField, fields, filter, customFilter);

        if (data.error) {
            yield put(settingsActions.checkCustomFieldsResult(false, data.error, true));
            return
        } else {
            yield put(settingsActions.checkCustomFieldsResult(false, "", false));
        }
    } catch (e: any) {
        yield put(settingsActions.checkCustomFieldsResult(false, e.message, true));
        yield put(logActions.actions.logError({ message: `checkCustomFields. ${e.message}`, error: e }));
    }
}

function* dbCreateColumn({ payload: { fields, progress } }: any): SagaIterator {
    try {
        const indexing = fields.length === 1 && fields[0].type === "indexing";
        const filter = yield call(searchSagas.getSearchFilter);

        // if first request
        if (!progress.total) yield put(settingsActions.dbCreateColumnResult(true, { indexing }));

        const data: any = yield call(services.db.createColumn, fields, progress, filter);

        let pluginData = usePluginParams();
        if (!pluginData.settings.general) pluginData.settings.general = { dbOwnSearch: "on" };
        pluginData.settings.general.dbOwnSearch = "on";

        // @ts-ignore
        window.usbs = pluginData;

        if (data.initialization && data.progress) {
            yield put(settingsActions.dbCreateColumnResult(true, { ...data.progress }));
            yield put(settingsActions.dbCreateColumn(fields, data.progress));
            return;
        } else if (data.progress) {
            // complected
            yield put(settingsActions.dbCreateColumnResult(false, { ...data.progress }));
            yield put(settingsActions.dbIndexedStatus(true));
            return;
        }

        if (data.error) {
            yield put(settingsActions.dbCreateColumnResult(false, { indexing: indexing, error: data.error }));
            return
        }

        yield put(settingsActions.dbCreateColumnResult(false, { ...progress }));
    } catch (e: any) {
        yield put(settingsActions.dbCreateColumnResult(false, { ...progress, error: e.message }));
        yield put(logActions.actions.logError({ message: `dbCreateColumn. ${e.message}`, error: e }));
    }
}

function* appModalOpened(): SagaIterator {
    try {
        const pluginData = usePluginParams();
        const indexedStatus = yield select(settingsSelectors.getDbIndexedStatus);

        if (pluginData.settings.general?.dbOwnSearch === "on" && !pluginData.settings.indexing?.indexed && !indexedStatus) {
            // show indexation modal 
            yield put(settingsActions.dbCreateColumnResult(false, { indexing: true }));
        }
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `appModalOpened. ${e.message}`, error: e }));
    }
}

function* appModalClose(): SagaIterator {
    try {
        window.parent.postMessage({ message: "iframe.close" }, "*");

        yield put(settingsActions.dbCreateColumnPrepare(false));
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `appModalClose. ${e.message}`, error: e }));
    }
}

function* backgroundIndexing({ payload: { data } }: any): SagaIterator {
    try {
        if (!data.total && !data.first) return;

        // @ts-ignore
        window.backgroundIndexing = 1;

        const result: any = yield call(services.db.backgroundIndexing);

        if (result.limit) {
            if (data.first && result.total) yield put(settingsActions.dbBgIndexingTotal(result.total));
            else if (data.action === "modal" && data.first && result.total === 0 && result.found === 0) yield put(settingsActions.dbBgIndexingTotal(result.total));

            const isDone = (result.total === 0 && !data.first) || (data.action === "modal" && data.first && result.total === 0 && result.found === 0);

            yield put(settingsActions.dbBgIndexing({
                ...result,
                done: isDone
            }));

            if (isDone) {
                // @ts-ignore
                window.backgroundIndexing = 0;
            } else if (result.total === 0 && result.found === 0) {
                // @ts-ignore
                window.backgroundIndexing = 0;

            }
        } else {
            // @ts-ignore
            window.backgroundIndexing = 0;
        }
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `backgroundIndexing. ${e.message}`, error: e }));

        // @ts-ignore
        window.backgroundIndexing = 0;
    }
}

function* updateSettings({ payload: { data } }: any): SagaIterator {
    try {
        const result: any = yield call(services.settings.updateSettings, data);

        if (!result) return;

        let pluginData = usePluginParams();

        for (const key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                const value = result[key];
                pluginData.settings[key] = value;
            }
        }

     
        // @ts-ignore
        window.usbs = pluginData;


        // @ts-ignore
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `updateSettings. ${e.message}`, error: e }));
    }
}

function* reloadProc(): SagaIterator {
    try {
        yield put(settingsActions.reloadProcLoader(true));

        // get new settings
        const result: any = yield call(services.settings.loadSettings);
        const pluginData: any = result?.usbs || null;

        if (pluginData) {
            updateUsbs(pluginData);

            const s = pluginData.settings[de("gSUwbMT+OnvjoZ861LY+yg==")] ?? {};
            yield put(settingsActions.checkProc(s[config.key] ?? ""));
            yield delay(3200);
        }

        const updated = yield select(settingsSelectors.getUpdated);
        const sUpdated: parseUpdatedResult = parseUpdated(updated);

        if (!sUpdated.status && sUpdated.message) {
            // show error message again
            yield put(searchActions.actions.updateMessage({
                place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
                message: sUpdated.message,
                type: searchActions.messageTypes.GENERAL,
                query: "",
                params: { checkAgain: true }
            }));
        } else {
            // hide message and enable scanning
            const data: MobileCommandProps = {
                message: "mobile.postMessage",
                method: mobileCommandsActions.commands.CMD_BOTTOM_DRAWER_CLOSE,
                options: {},
            };
            window.parent.postMessage(data, "*");

            yield delay(200);
            yield put(searchActions.actions.updateMessage({ place: "", message: "", type: "", query: "", params: {} }));
        }

        yield put(settingsActions.reloadProcLoader(false));
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `reloadProc. ${e.message}`, error: e }));
        yield put(settingsActions.reloadProcLoader(false));
    }
}

function* importLabels({ payload: { products, types } }: any): SagaIterator {
    try {
        window.parent.postMessage({ message: "iframe.importLabels", products, types }, "*");
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `importLabels. ${e.message}`, error: e }));
    }
}

export default [
    takeEvery(settingsActions.actionTypes.APP_STARTED, appStarted),
    takeEvery(settingsActions.actionTypes.SEARCH_MODAL_OPEN_STATUS, searchModalOpenStatus),
    takeEvery(settingsActions.actionTypes.CHECK_PROC, checkProc),
    takeEvery(settingsActions.actionTypes.RELOAD_PROC, reloadProc),
    takeEvery(settingsActions.actionTypes.SET_MOBILE_APP_VERSION, mobileAppVersion),
    takeEvery(settingsActions.actionTypes.CHECK_CUSTOM_FIELDS, checkCustomFields),
    takeEvery(settingsActions.actionTypes.DB_CREATE_COLUMN, dbCreateColumn),
    takeEvery(settingsActions.actionTypes.APP_MODAL_OPENED, appModalOpened),
    takeEvery(settingsActions.actionTypes.APP_MODAL_CLOSE, appModalClose),
    takeEvery(settingsActions.actionTypes.DB_BG_INDEXING, backgroundIndexing),
    takeEvery(settingsActions.actionTypes.UPDATE_SETTINGS, updateSettings),
    takeEvery(settingsActions.actionTypes.IMPORT_LABELS, importLabels),
    fork(interval)
];
