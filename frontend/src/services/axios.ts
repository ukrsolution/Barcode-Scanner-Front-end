import axios from "axios-jsonp-pro";
import { isNoRepeats, processingErrors } from "./handlerErrors";
import Store from "../store";
import * as mobileCommandsActions from "../store/mobile/commands/actions";
import usePluginParams from "../hooks/usePluginParams";

// let requests: Array<any> = [];
// @ts-ignore
window.requests = [];
let requestsCounter: number = new Date().getTime();
const instance = axios.create();
const CancelToken = axios.CancelToken;


export const addCancelRequest = (cancelString: string, cancel: any) => {
    const request = { cancelString, cancel: cancel, };
    // @ts-ignore
    window.requests.push(request);
};

export const finishRequest = (cancelString: string) => {
    // @ts-ignore
    window.requests = window.requests.filter((r: any) => r.cancelString !== cancelString)
};

export const cancelPreviousRequests = (cancelString: string) => {
    // @ts-ignore
    window.requests.forEach((request: any) => {
        if (request.cancelString === cancelString) request.cancel();
    });
};

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const cancelString: string = config?.params?.request || "";

        // cancel token for breaking previous query
        if (cancelString) {
            cancelPreviousRequests(cancelString);
            config.cancelToken = new CancelToken((cancel) => {
                addCancelRequest(cancelString, cancel);
            });
        }

        const timeout = ["db-create-column", "db-bg-indexing", "cart-order-create"].includes(config.params?.request ?? "") ? 60000 : 30000;

        // set request timeout
        config.timeout = timeout;

        // add request counter
        config.params ? config.params.id = requestsCounter++ : config.params = { id: requestsCounter++ };

        // add token
        const pluginData = usePluginParams();
        const token = Store.store.getState()?.settings?.token;
        const userToken = Store.store.getState()?.settings?.userToken;

        if (["ukrsolution-error"].includes(config.params?.request ?? "")) {
            delete config.params.request;
        } else {
            if (config.params) {
                config.params.token = ["android", "ios"].includes(pluginData.platform) ? token : "web";
                config.params.userToken = userToken;
                config.params.platform = pluginData.platform ? pluginData.platform : "web";
            } else {
                config.params = {
                    token: ["android", "ios"].includes(pluginData.platform) ? token : "web", platform: pluginData.platform ? pluginData.platform : "web",
                    userToken
                };
            }
        }

        return config;
    },
    (error: any) => {
        console.error(`> error.request: ${JSON.stringify(error)}`);
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        finishRequest(response?.config?.params?.request || "");

        const data = {
            message: "mobile.postMessage",
            method: mobileCommandsActions.commands.CMD_REDIRECT,
            options: { redirect: response.data?.redirect, data: response.data },
        };
        window.parent.postMessage(data, "*");


        return response;
    },
    (error) => {
        // Cancel request.
        if (axios.isCancel(error)) {
            error.cancelStatus = true;
            return Promise.reject(error);
        }

        // timeout
        if (error.code === "ECONNABORTED") {
            error.message = "ECONNABORTED";
            return Promise.reject(error);
        }

        // set default response code (status).
        if (!error.response) {
            // net::ERR_NAME_NOT_RESOLVED or net::ERR_INTERNET_DISCONNECTED
            error.response = { status: 0 };
        }

        // ulimit re-send indexation request
        if (["db-create-column", "db-bg-indexing"].includes(error.config?.params?.request ?? "")) {
            return instance.request(error.config);
        }

        // re-send request "4" times for special URLs        
        if (
            error.config &&
            error.response.status === 0 &&
            isNoRepeats(error.config.url, error.config?.params?.request) === false
        ) {

            // set request counter
            error.config.headers.counter = error.config.headers.counter ? error.config.headers.counter + 1 : 1;

            // check request counter
            if (error.config.headers.counter && error.config.headers.counter <= 4) {
                return instance.request(error.config);
            }
        }

        processingErrors(error);

        return Promise.reject(error);
    }
);

export default instance;
