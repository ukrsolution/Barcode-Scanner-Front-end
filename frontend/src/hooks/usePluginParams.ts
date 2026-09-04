

interface WPML {
    translations: any;
}

export interface ExternalPlugin {
    key: string;
    status: boolean;
    label: string;
    fieldLabel?: string;
    filter?: number;
}

export interface CustomSearchFilterOption {
    value: string;
    label: string;
    selected?: number;
}

export interface CustomSearchFilter {
    type: string;
    plugin: string;
    options?: Array<CustomSearchFilterOption>;
    placeholder?: string;
}

export interface GlobalLocation {
    id: string;
    name: string;
    slug: string;
}

export interface PPLocationProps {
    id: string;
    enabled: string;
    label: string;
}

export interface ShippingMethods {
    id: string;
    title: string;
    cost: string;
    instance_id: string;
}

export interface PaymentMethods {
    id: string;
    title: string;
}

interface PluginParams {
    os: string;
    platform: string;
    wpAdminUrl: "";
    pluginUrl: "";
    restRoot: string;
    jsonUrl: string;
    ajaxUrl: string;
    ajaxUrlUS: string;
    currencySymbol: string;
    currencyLabel: string;
    priceDecimalSeparator: string;
    priceThousandSeparator: string;
    priceDecimals: string;
    uid: string;
    settings: any;
    nonce: string;
    wc_nonce: string;
    pluginVersion: string;
    wp_version: string;
    wpml: WPML;
    sounds: {
        fail: string;
        increase: string;
        decrease: string;
    },
    plugins: Array<ExternalPlugin>
    tabsPermissions: {
        inventory: number;
        orders: number;
        cart: number;
    },
    searchFilter: any,
    session: string,
    m_session: string,
    sessionStamp: string,
    m_sessionStamp: string,
    isTierPricingTable: string,
    isStockLocations: string,
    customSearchFilters: Array<CustomSearchFilter>,
    locations: Array<GlobalLocation>,
    pp_locations: Array<PPLocationProps>,
    prefix: string,
    mode: string,
    userSessions: string,
    shippingMethods: Array<ShippingMethods>,
    paymentMethods: Array<PaymentMethods>,
    wcPricesInclTax: boolean,
}

function usePluginParams(): PluginParams {
    let usbs: any = {};

    // @ts-ignore
    usbs = window['usbs'] ? window['usbs'] : {};

    let global: any = {};

    if (typeof usbs === 'object' && usbs !== null) {
        global = usbs;
    } else {
        global = JSON.parse(usbs);
    }

    return {
        os: getOS(),
        platform: global.platform,
        wpAdminUrl: global.adminUrl,
        pluginUrl: global.pluginUrl,
        restRoot: global.rest_root,
        jsonUrl: global.jsonUrl,
        ajaxUrl: global.ajaxUrl,
        ajaxUrlUS: global.ajaxUrlUS,
        currencySymbol: global.currencySymbol,
        currencyLabel: global.currencyLabel,
        priceDecimalSeparator: global.priceDecimalSeparator,
        priceThousandSeparator: global.priceThousandSeparator,
        priceDecimals: global.priceDecimals,
        uid: global.uid,
        settings: global.settings,
        nonce: global.nonce,
        wc_nonce: global.wc_nonce,
        pluginVersion: global.pluginVersion,
        wp_version: global.wp_version,
        wpml: global.wpml,
        sounds: {
            fail: global.sounds?.fail ?? "",
            increase: global.sounds?.increase ?? "",
            decrease: global.sounds?.decrease ?? ""
        },
        plugins: global.plugins,
        tabsPermissions: {
            inventory: global.tabsPermissions?.inventory,
            orders: global.tabsPermissions?.orders,
            cart: global.tabsPermissions?.cart,
        },
        searchFilter: global.searchFilter,
        session: global.session,
        m_session: global.m_session,
        sessionStamp: global.sessionStamp,
        m_sessionStamp: global.m_sessionStamp,
        isTierPricingTable: global.isTierPricingTable,
        isStockLocations: global.isStockLocations,
        customSearchFilters: global.customSearchFilters,
        locations: global.locations,
        pp_locations: global.pp_locations,
        prefix: global.prefix,
        mode: global.mode,
        userSessions: global.userSessions,
        shippingMethods: global.shippingMethods,
        paymentMethods: global.paymentMethods,
        wcPricesInclTax: global.wcPricesInclTax,
    }
}

function getOS(): string {
    let detectOS = "Unknown OS";

    if (navigator.appVersion.indexOf("Win") != -1)
        detectOS = "Windows";

    if (navigator.appVersion.indexOf("Mac") != -1)
        detectOS = "MacOS";

    if (navigator.appVersion.indexOf("Linux") != -1)
        detectOS = "Linux";

    return detectOS;
}

export default usePluginParams;