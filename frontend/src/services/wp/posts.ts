import axios from '../axios';
import { AxiosRequestConfig } from "axios-jsonp-pro";
import usePluginParams from '../../hooks/usePluginParams';
import config from '../../helpers/config';

const pluginData = usePluginParams()
const aUrl = pluginData.settings?.general?.directDbUpdate === "on" ? pluginData.ajaxUrlUS : pluginData.ajaxUrl;

const API_URL = config.api === "ajax" ? aUrl : `${pluginData.restRoot}scanner/v1/`;
let action = "barcodeScannerAction";

if (pluginData.prefix) action = `${pluginData.prefix}_${action}`;

const axiosRequestDefConfig: AxiosRequestConfig = {
    method: "POST",
    responseType: "json",
    params: {},
    headers: { 'X-WP-Nonce': pluginData.nonce }
};

const getPost = async (query: string, withVariation: number, filter: any, customFilter: any, autoFill: boolean) => {
    const url = `${API_URL}post/search/${encodeURIComponent(query)}/${withVariation}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "post-search" }, };
    const response = await axios.post(url, { query, withVariation, filter, customFilter, autoFill }, axiosRequestConfig)

    return response.data;
}

const getPostAjax = async (query: string, withVariation: number, filter: any, customFilter: any, autoFill: boolean) => {
    const rout = "getPost";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "post-search", action }, };
    const response = await axios.post(API_URL, { action, rout, query, withVariation, filter, customFilter, autoFill }, axiosRequestConfig)

    return response.data;
}

const getProduct = async (query: string, filter: any, customFilter: any, postAutoAction = "", autoFill: boolean) => {
    const url = `${API_URL}product/search/${encodeURIComponent(query)}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "post-search" }, };
    const response = await axios.post(url, { query, filter, customFilter, postAutoAction, autoFill }, axiosRequestConfig)

    return response.data;
}

const getProductAjax = async (query: string, filter: any, customFilter: any, postAutoAction = "", autoFill: boolean) => {
    const rout = "getProduct";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "post-search", action }, };
    const response = await axios.post(API_URL, { action, rout, query, filter, customFilter, postAutoAction, request: "post-search", autoFill }, axiosRequestConfig)

    return response.data;
}

interface getOrderAjaxProps {
    query: string;
    filter: any;
    customFilter: any;
    autoFill: boolean;
}

const getOrder = async ({ query, filter, customFilter, autoFill }: getOrderAjaxProps) => {
    const url = `${API_URL}order/search/${encodeURIComponent(query)}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "order-search" }, };
    const response = await axios.post(url, { query, filter, customFilter, autoFill }, axiosRequestConfig)

    return response.data;
}

const getOrderAjax = async ({ query, filter, customFilter, autoFill }: getOrderAjaxProps) => {
    const rout = "getOrder";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "order-search", action }, };
    const response = await axios.post(API_URL, { action, rout, query, filter, customFilter, request: "order-search", autoFill }, axiosRequestConfig)

    return response.data;
}

const productEnableManageStock = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/enable-manage-stock/${productId}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-enable-manage-stock", products }, };
    const response = await axios.post(url, { query: productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const productEnableManageStockAjax = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "productEnableManageStock";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-enable-manage-stock", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantity = async (productId: number, quantity: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-quantity/${productId}/${quantity}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-quantity", products }, };
    const response = await axios.post(url, { query: productId, quantity, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantityAjax = async (productId: number, quantity: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductQuantity";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-quantity", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, quantity, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantityPlus = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-quantity-plus/${productId}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { products }, };
    const response = await axios.post(url, { productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantityPlusAjax = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductQuantityPlus";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantityMinus = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-quantity-minus/${productId}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { products }, };
    const response = await axios.post(url, { productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductQuantityMinusAjax = async (productId: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductQuantityMinus";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductRegularPrice = async (productId: number, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-regular-price/${productId}/${price}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-regular-price", products }, };
    const response = await axios.post(url, { query: productId, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductRegularPriceAjax = async (productId: number, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductRegularPrice";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-regular-price", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductSalePrice = async (productId: number, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-sale-price/${productId}/${price}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-sale-price", products }, };
    const response = await axios.post(url, { query: productId, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductSalePriceAjax = async (productId: number, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductSalePrice";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-sale-price", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductCustomPrice = async (productId: number, field: string, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-sale-price/${productId}/${price}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-custom-price", products }, };
    const response = await axios.post(url, { query: productId, field, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductCustomPriceAjax = async (productId: number, field: string, price: number, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductCustomPrice";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-custom-price", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, field, price, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductMeta = async (productId: number, key: string, value: any, products: Array<number>, filter: any, customFilter: any) => {
    const url = `${API_URL}product/update-meta`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-meta", products }, };
    const response = await axios.post(url, { query: productId, key, value, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateProductMetaAjax = async (productId: number, key: string, value: any, products: Array<number>, filter: any, customFilter: any) => {
    const rout = "updateProductMeta";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-meta", action, products }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, key, value, products, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const updateTitle = async (productId: number, title: string) => {
    const url = `${API_URL}product/update-title/${productId}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-title", title }, };
    const response = await axios.post(url, { query: productId, title }, axiosRequestConfig)

    return response.data;
}

const updateTitleAjax = async (productId: number, title: string) => {
    const rout = "updateTitle";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-title", action, title }, };
    const response = await axios.post(API_URL, { action, rout, query: productId, title }, axiosRequestConfig)

    return response.data;
}

const setImage = async (postId: number, attachmentId: number) => {
    const url = `${API_URL}product/set-image/${postId}/${attachmentId}`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-set-image" }, };
    const response = await axios.post(url, { postId, attachmentId }, axiosRequestConfig)

    return response.data;
}

const setImageAjax = async (postId: number, attachmentId: number) => {
    const rout = "setImage";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-set-image", action }, };
    const response = await axios.post(API_URL, { action, rout, postId, attachmentId }, axiosRequestConfig)

    return response.data;
}

const createNew = async (query: string) => {
    const url = `${API_URL}product/create-new`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-create-new", query }, };
    const response = await axios.post(url, { query }, axiosRequestConfig)

    return response.data;
}

const createNewAjax = async (query: string) => {
    const rout = "createNew";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-create-new", action, query }, };
    const response = await axios.post(API_URL, { action, rout, query }, axiosRequestConfig)

    return response.data;
}

const update = async (fields: any) => {
    const url = `${API_URL}product/update-fields`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-fields" }, };
    const response = await axios.post(url, { fields }, axiosRequestConfig)

    return response.data;
}

const updateAjax = async (fields: any) => {
    const rout = "update";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "product-update-fields", action }, };
    const response = await axios.post(API_URL, { action, rout, fields }, axiosRequestConfig)

    return response.data;
}

const checkCustomField = async (fields: Array<any>, filter: any, customFilter: any) => {
    const url = `${API_URL}posts/check-custom-fields`;
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "check-custom-fields" }, };
    const response = await axios.post(url, { fields, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

const checkCustomFieldAjax = async (fields: Array<any>, filter: any, customFilter: any) => {
    const rout = "checkCustomFields";
    const axiosRequestConfig: AxiosRequestConfig = { ...axiosRequestDefConfig, params: { request: "check-custom-fields", action }, };
    const response = await axios.post(API_URL, { action, rout, fields, filter, customFilter }, axiosRequestConfig)

    return response.data;
}

export const posts = config.api === "ajax" ? {
    getPost: getPostAjax,
    getProduct: getProductAjax,
    getOrder: getOrderAjax,
    productEnableManageStock: productEnableManageStockAjax,
    updateProductQuantity: updateProductQuantityAjax,
    updateProductQuantityPlus: updateProductQuantityPlusAjax,
    updateProductQuantityMinus: updateProductQuantityMinusAjax,
    updateProductRegularPrice: updateProductRegularPriceAjax,
    updateProductSalePrice: updateProductSalePriceAjax,
    updateProductCustomPrice: updateProductCustomPriceAjax,
    updateProductMeta: updateProductMetaAjax,
    updateTitle: updateTitleAjax,
    setImage: setImageAjax,
    createNew: createNewAjax,
    update: updateAjax,
    checkCustomField: checkCustomFieldAjax,
} : {
    getPost,
    getProduct,
    getOrder,
    productEnableManageStock,
    updateProductQuantity,
    updateProductQuantityPlus,
    updateProductQuantityMinus,
    updateProductRegularPrice,
    updateProductSalePrice,
    updateProductCustomPrice,
    updateProductMeta,
    updateTitle,
    setImage,
    createNew,
    update,
    checkCustomField
};