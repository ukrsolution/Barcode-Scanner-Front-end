import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;
const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;

const updateSettingsAjax = async (data: any) => {
    const rout = "updateSettings";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "settings-update-keys", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout, data }, axiosRequestConfig)

    return response.data;
}

const loadSettingsAjax = async () => {
    const rout = "loadSettings";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "settings-load", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout }, axiosRequestConfig)

    return response.data;
}

export const settings = {
    updateSettings: updateSettingsAjax,
    loadSettings: loadSettingsAjax,
}