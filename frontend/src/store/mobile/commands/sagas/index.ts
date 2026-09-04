import { SagaIterator } from "redux-saga";
import { put, takeEvery } from "redux-saga/effects";
import * as mobileCommandsActions from "../actions";
import * as logActions from "../../../log/actions";
import * as searchActions from "../../../search/actions";
import * as settingsActions from "../../../settings/actions";
import { MobileCommandProps } from "../../../../features/mobile/drawer/containers/DrawerContainer";
import * as postsActions from "../../../posts/actions";
import { de } from "../../../../helpers/data";
import usePluginParams from "../../../../hooks/usePluginParams";
import config from "../../../../helpers/config";

function* run({ payload: { data } }: any): SagaIterator {
    try {
        const { method = "", options = {} } = data;

        switch (method) {
            case mobileCommandsActions.runCommands.CMD_SCANNING_BARCODE: {
                yield put(postsActions.actions.updatePostManagement({ post: {} }));
                yield put(postsActions.actions.managementInventory({ query: options?.barcode?.data ?? "", autoFill: false }));
                break;
            }

            case mobileCommandsActions.runCommands.CMD_TAB_TOGGLE: {
                const { tabIndex = null } = options;
                if (tabIndex !== null) yield put(settingsActions.setActiveModalTab(parseInt(tabIndex)));
                break;
            }

            case mobileCommandsActions.runCommands.CMD_AUTH_TOKEN: {
                const { token = "", userToken = "", appVersion = "" } = options;
                yield put(settingsActions.setAuthToken(token, userToken));
                yield put(settingsActions.setMobileAppVersion(appVersion));
                break;
            }

            case mobileCommandsActions.runCommands.CMD_SHOW_SEARCH: {
                const { status = false } = options;

                // cancel all requests
                yield put(searchActions.actions.cancelRequests());

                // clear prev search
                yield put(searchActions.actions.autofill({ query: " " }));
                yield put(postsActions.actions.updatePostManagement({ post: {} }));
                yield put(postsActions.actions.updatePreviousPostsList({ list: [] }));
                yield put(searchActions.actions.resetAllMessages());

                // show/hide search field
                yield put(searchActions.actions.setMobileSearch({ status }));

                // show rn bottom panel
                const rootEl: HTMLElement | null = document.querySelector("#ukrsolution-barcode-scanner-mobile");
                const data: MobileCommandProps = {
                    message: "mobile.postMessage",
                    method: mobileCommandsActions.commands.CMD_SCANNING_START,
                    options: {
                        status: true,
                        postManage: true,
                        documentHeight: rootEl ? rootEl.offsetHeight : 0
                    },
                };
                window.parent.postMessage(data, "*");
                break;
            }
            case mobileCommandsActions.runCommands.CMD_CANCEL_REQUESTS: {
                // cancel all requests
                yield put(searchActions.actions.cancelRequests());
                break;
            }

            case mobileCommandsActions.runCommands.CMD_SET_AUTO_ACTION: {
                const { action = "" } = options;
                yield put(postsActions.actions.managementInventoryAutoAction({ action }));
                break;
            }

            case mobileCommandsActions.runCommands.CMD_CHECK_LIC: {
                let pluginData = usePluginParams();

                const s = pluginData.settings[de("gSUwbMT+OnvjoZ861LY+yg==")] ?? {};
                yield put(settingsActions.checkProc(s[config.key] ?? ""));
                break;
            }

            default:
                break;
        }

    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `mobile.commands.run. ${e.message}`, error: e }));
    }
}

function* loaded(): SagaIterator {
    try {
        const data: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_APP_LOADED,
            options: {},
        };
        window.parent.postMessage(data, "*");
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `mobile.commands.loaded. ${e.message}`, error: e }));
    }
}

function* modal({ payload: { message, config } }: any): SagaIterator {
    try {
        // replace text
        const msg = (message === "ECONNABORTED") ? "No connection to the website (ECONNABORTED)" : message;

        // set params
        const params = {
            url: config?.url ?? "",
            action: config?.params?.action ?? "",
            data: config?.data ?? "",
            blockApp: config?.blockApp ?? false,
        };

        // send to mobile app
        const mobileData: MobileCommandProps = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_MODAL_MSG,
            options: { message: msg, params },
        };
        window.parent.postMessage(mobileData, "*");
    } catch (e: any) {
        yield put(logActions.actions.logError({ message: `mobile.commands.modal. ${e.message}`, error: e }));
    }
}

export default [
    takeEvery(mobileCommandsActions.actionTypes.CMD_RUN_COMMAND, run),
    takeEvery(mobileCommandsActions.actionTypes.CMD_APP_LOADED, loaded),
    takeEvery(mobileCommandsActions.actionTypes.CMD_MODAL_MSG, modal),
];
