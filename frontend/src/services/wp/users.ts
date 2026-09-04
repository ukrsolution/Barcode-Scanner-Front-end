import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;
const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;

const usersFind = async (query: string) => {
    const url = `${API_URL}users/find`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `users-find`, query },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };

    const response = await axios.post(url, { query }, axiosRequestConfig)

    return response.data;
}

const usersFindAjax = async (query: string) => {
    const rout = "usersFind";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `users-find`, action },
        headers: { 'X-WP-Nonce': pluginData.nonce }
    };

    const response = await axios.post(API_URL, { rout, query }, axiosRequestConfig)

    return response.data;
}

const userCreate = async (data: any) => {
    const url = `${API_URL}user/create`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `user-create` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { userData: data }, axiosRequestConfig)

    return response.data;
}

const userCreateAjax = async (data: any) => {
    const rout = "userCreate";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `user-create`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, userData: data }, axiosRequestConfig)

    return response.data;
}

const appUsersUpdateAjax = async (str: string) => {
    const rout = "appUsersUpdate";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `app-users-update`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, str }, axiosRequestConfig)

    return response.data;
}

export const users = config.api === "ajax" ? {
    usersFind: usersFindAjax,
    userCreate: userCreateAjax,
    appUsersUpdateAjax,
} : {
    usersFind,
    userCreate,
    appUsersUpdateAjax,
}