import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;
const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;

const changeStatus = async (orderId: number, status: string) => {
    const url = `${API_URL}order/change-status/${orderId}/${status}`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "order-change-status" },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(url, {}, axiosRequestConfig)

    return response.data;
}

const changeStatusAjax = async (orderId: number, status: string) => {
    const rout = "changeStatus";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: "order-change-status", action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };
    const response = await axios.post(API_URL, { rout, orderId, status }, axiosRequestConfig)

    return response.data;
}

export const order = config.api === "ajax" ? {
    changeStatus: changeStatusAjax
} : {
    changeStatus,
}