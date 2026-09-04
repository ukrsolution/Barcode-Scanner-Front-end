import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';

const pluginData = usePluginParams()
const API_URL = `${pluginData.jsonUrl}`;

const addItem = async (query: string, filter: any, currentItems: Array<any>, orderId: number | null) => {
    const url = `${API_URL}wc/store/cart/add-item`;
    const axiosRequestConfig: AxiosRequestConfig = {
        method: "POST",
        params: { request: `cart-add-item`, orderId },
        headers: {
            'X-WC-Store-API-Nonce': pluginData.wc_nonce
        }
    };

    const response = await axios.post(url, { filter, currentItems }, axiosRequestConfig)

    return response.data;


    // jQuery.ajax({
    //     type: 'POST',
    //     url: '/wp-json/wc/store/cart/add-item',
    //     dataType: 'json',
    //     headers: {
    //       'X-WC-Store-API-Nonce': usbs.wc_nonce
    //     },
    //     data: {
    //       id : 31,
    //       quantity: 1
    //     }
    //   });
}

// const removeItem = async (cartKey: string, currentItems: Array<any>, orderId: number | null) => {
//     const url = `${API_URL}cart/remove/${cartKey}/${orderId}`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-remove-item` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, { currentItems }, axiosRequestConfig)

//     return response.data;
// }

// const updateQuantity = async (currentItems: Array<any>) => {
//     const url = `${API_URL}cart/update-quantity`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-update-items-quantity` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, { currentItems }, axiosRequestConfig)

//     return response.data;
// }

// const updateAttributes = async (currentItems: Array<any>) => {
//     const url = `${API_URL}cart/update-attributes`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-update-items-attributes` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, { currentItems }, axiosRequestConfig)

//     return response.data;
// }

// const clear = async (orderId: number | null) => {
//     const url = `${API_URL}cart/order/clear/${orderId}`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-clear` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, {}, axiosRequestConfig)

//     return response.data;
// }

// interface orderCreateProps {
//     currentItems: Array<any>;
//     orderId: number | null;
//     clearCart: boolean;
//     orderStatus: string;
// }

// const orderCreate = async ({ currentItems, orderId, clearCart, orderStatus }: orderCreateProps) => {
//     const url = `${API_URL}cart/order/create/${orderId}`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-order-create` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, { currentItems, clearCart, orderStatus }, axiosRequestConfig)

//     return response.data;
// }

// const getStatuses = async () => {
//     const url = `${API_URL}cart/get-statuses`;
//     const axiosRequestConfig: AxiosRequestConfig = {
//         method: "POST",
//         params: { request: `cart-get-statuses` },
//         headers: {
//             'X-WP-Nonce': pluginData.nonce
//         }
//     };

//     const response = await axios.post(url, {}, axiosRequestConfig)

//     return response.data;
// }

export const wcCart = {
    addItem,
    // removeItem,
    // clear,
    // orderCreate,
    // updateQuantity,
    // updateAttributes,
    // getStatuses,
}