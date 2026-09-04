import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;
const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;


interface ItemsCustomPricesProps {
    [index: number]: string
}

interface orderCreateProps {
    currentItems: Array<any>;
    orderId: number | null;
    clearCart: boolean;
    orderStatus: string;
    shippingMethod: string;
    paymentMethod: string;
    userId: number;
    itemsCustomPrices: ItemsCustomPricesProps;
    orderCustomPrice: string;
    orderCustomSubPrice: string;
    orderCustomTax: string;
    extraData: any;
    customFilter: any;
    orderUserId: number;
}

interface recalculateProps {
    currentItems: Array<any>;
    itemsCustomPrices: ItemsCustomPricesProps;
    orderCustomPrice: string;
    orderCustomSubPrice: string;
    orderCustomTax: string;
    customFilter: any;
    orderUserId: number;
    shippingMethod: string;
    paymentMethod: string;
}

interface addItemProps {
    query: string;
    filter: any;
    currentItems: Array<any>;
    orderId: number | null;
    autoFill: boolean;
    itemsCustomPrices: any;
    orderCustomPrice: string;
    orderCustomSubPrice: string;
    orderCustomTax: string;
    customFilter: any;
    orderUserId: number;
    byId: boolean;
    setQty: number | null;
}

const addItem = async ({ query, filter, currentItems, orderId, autoFill = false, itemsCustomPrices = {}, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, byId, setQty }: addItemProps) => {
    const url = `${API_URL}cart/add/${encodeURIComponent(query)}/${orderId}`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-add-item` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { query, autoFill, filter, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, byId, setQty }, axiosRequestConfig)

    return response.data;
}

const addItemAjax = async ({ query, filter, currentItems, autoFill = false, itemsCustomPrices = {}, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, byId, setQty }: addItemProps) => {
    const rout = "addItem";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-add-item`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, query, autoFill, filter, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, byId, setQty }, axiosRequestConfig)

    return response.data;
}

const removeItem = async (cartKey: string, currentItems: Array<any>, orderId: number | null, itemsCustomPrices = {}, orderCustomPrice: string, orderCustomSubPrice: string, orderCustomTax: string, customFilter: any, orderUserId: number) => {
    const url = `${API_URL}cart/remove/${cartKey}/${orderId}`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-remove-item` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { cartItem: cartKey, orderId, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const removeItemAjax = async (cartKey: string, currentItems: Array<any>, orderId: number | null, itemsCustomPrices = {}, orderCustomPrice: string, orderCustomSubPrice: string, orderCustomTax: string, customFilter: any, orderUserId: number) => {
    const rout = "removeItem";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-remove-item`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, cartItem: cartKey, orderId, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const updateQuantity = async (currentItems: Array<any>, itemsCustomPrices: ItemsCustomPricesProps, orderCustomPrice: string, orderCustomSubPrice: string, orderCustomTax: string, customFilter: any, orderUserId: number) => {
    const url = `${API_URL}cart/update-quantity`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-update-items-quantity` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

interface updateQuantityAjaxProps {
    currentItems: Array<any>;
    itemsCustomPrices: ItemsCustomPricesProps;
    orderCustomPrice: string;
    orderCustomSubPrice: string;
    orderCustomTax: string;
    customFilter: any;
    orderUserId: number;
    productQty: boolean;
}

const updateQuantityAjax = async ({ currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, productQty }: updateQuantityAjaxProps) => {
    const rout = "updateQuantity";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-update-items-quantity`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, productQty }, axiosRequestConfig)

    return response.data;
}

interface updateAttributesProps {
    currentItems: Array<any>;
    itemsCustomPrices: ItemsCustomPricesProps;
    orderCustomPrice: string;
    orderCustomSubPrice: string;
    orderCustomTax: string;
    customFilter: any;
    orderUserId: number;
}

const updateAttributes = async ({ currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }: updateAttributesProps) => {
    const url = `${API_URL}cart/update-attributes`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-update-items-attributes` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const updateAttributesAjax = async (currentItems: Array<any>, itemsCustomPrices: ItemsCustomPricesProps, orderCustomPrice: string, orderCustomSubPrice: string, orderCustomTax: string, customFilter: any, orderUserId: number) => {
    const rout = "updateAttributes";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-update-items-attributes`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const clear = async (orderId: number | null) => {
    const url = `${API_URL}cart/order/clear/${orderId}`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-clear` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { query: orderId }, axiosRequestConfig)

    return response.data;
}

const clearAjax = async (orderId: number | null) => {
    const rout = "clear";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-clear`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, query: orderId }, axiosRequestConfig)

    return response.data;
}

const orderCreate = async ({ currentItems, orderId, clearCart, orderStatus, shippingMethod, paymentMethod, userId, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, extraData, customFilter, orderUserId }: orderCreateProps) => {
    const url = `${API_URL}cart/order/create/${orderId}`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-order-create` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { query: orderId, currentItems, clearCart, orderStatus, shippingMethod, paymentMethod, userId, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, extraData, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const orderCreateAjax = async ({ currentItems, orderId, clearCart, orderStatus, shippingMethod, paymentMethod, userId, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, extraData, customFilter, orderUserId }: orderCreateProps) => {
    const rout = "orderCreate";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-order-create`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, query: orderId, currentItems, clearCart, orderStatus, shippingMethod, paymentMethod, userId, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, extraData, customFilter, orderUserId }, axiosRequestConfig)

    return response.data;
}

const getStatuses = async () => {
    const url = `${API_URL}cart/get-statuses`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-get-statuses` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, {}, axiosRequestConfig)

    return response.data;
}

const getStatusesAjax = async () => {
    const rout = "getStatuses";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-get-statuses`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout }, axiosRequestConfig)

    return response.data;
}

const recalculate = async ({ currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, shippingMethod, paymentMethod }: recalculateProps) => {
    const url = `${API_URL}cart/recalculate`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-recalculate` },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(url, { currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, shippingMethod, paymentMethod }, axiosRequestConfig)

    return response.data;
}

const recalculateAjax = async ({ currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, shippingMethod, paymentMethod }: recalculateProps) => {
    const rout = "recalculate";
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        responseType: "json",
        params: { request: `cart-recalculate`, action },
        headers: {
            'X-WP-Nonce': pluginData.nonce
        }
    };

    const response = await axios.post(API_URL, { rout, currentItems, itemsCustomPrices, orderCustomPrice, orderCustomSubPrice, orderCustomTax, customFilter, orderUserId, shippingMethod, paymentMethod }, axiosRequestConfig)

    return response.data;
}

export const cart = config.api === "ajax" ? {
    addItem: addItemAjax,
    removeItem: removeItemAjax,
    clear: clearAjax,
    orderCreate: orderCreateAjax,
    updateQuantity: updateQuantityAjax,
    updateAttributes: updateAttributesAjax,
    getStatuses: getStatusesAjax,
    recalculate: recalculateAjax,
} : {
    addItem,
    removeItem,
    clear,
    orderCreate,
    updateQuantity,
    updateAttributes,
    getStatuses,
    recalculate,
}