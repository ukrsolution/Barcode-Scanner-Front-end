import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;
const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;

const createColumn = async (fields: Array<any>, progress: any = {}, filter: any = {}) => {
    const url = `${API_URL}db/create-column`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-create-column" },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(url, { fields, progress, filter }, axiosRequestConfig)

    return response.data;
}

const createColumnAjax = async (fields: Array<any>, progress: any = {}, filter: any = {}) => {
    const rout = "createColumn";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-create-column", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout, fields, progress, filter }, axiosRequestConfig)

    return response.data;
}

const saveSession = async (session: string, sessionStamp: string) => {
    const url = `${API_URL}db/save-session`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-save-session" },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(url, { session, sessionStamp }, axiosRequestConfig)

    return response.data;
}

const saveSessionAjax = async (session: string, sessionStamp: string) => {
    const rout = "saveSession";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-save-session", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout, session, sessionStamp }, axiosRequestConfig)

    return response.data;
}

const saveSettings = async (tab: string, param: string, value: string) => {
    const url = `${API_URL}db/save-settings`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-save-settings" },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(url, { tab, param, value }, axiosRequestConfig)

    return response.data;
}

const saveSettingsAjax = async (tab: string, param: string, value: string) => {
    const rout = "saveSettings";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: "db-save-settings", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout, tab, param, value }, axiosRequestConfig)

    return response.data;
}

const backgroundIndexing = async () => {
    const url = `${API_URL}db/bg-indexing`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "db-bg-indexing" },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(url, {}, axiosRequestConfig)

    return response.data;
}

const backgroundIndexingAjax = async () => {
    const rout = "backgroundIndexing";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "db-bg-indexing", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout }, axiosRequestConfig)

    return response.data;
}

export const db = config.api === "ajax" ? {
    backgroundIndexing: backgroundIndexingAjax,
    createColumn: createColumnAjax,
    saveSession: saveSessionAjax,
    saveSettings: saveSettingsAjax,
} : {
    backgroundIndexing,
    createColumn,
    saveSession,
    saveSettings,
}