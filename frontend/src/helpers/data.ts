import CryptoJS from "crypto-js";
import aes from "crypto-js/aes";
import encHex from "crypto-js/enc-hex";
import usePluginParams from "../hooks/usePluginParams";
import config from "./config";

export const _btoa = btoa;
export const _en = aes.encrypt;
export const _de = aes.decrypt;
export const _cjs = CryptoJS;
export const _ehx = encHex;

export const p_UCKey = () => {
    return `${de(config.p_UCKeyD)}${de(config.p_UCKeyA)}`;
};


// the key and iv should be 32 hex digits each, any hex digits you want, but it needs to be 32 on length each
const key = _ehx.parse(`${config.crk}${"a179b2476df48df"}`);
const iv = _ehx.parse(`${config.cri}0a8c7ef9a760402fa`);

/**
 * encrypt string
 * @param str
 */
export const en = (str: string) => {
    try {
        // encrypt the message
        return str ? _en(str, key, { iv }).toString() : str;
    } catch (error) {
        return str;
    }
};

/**
 * decrypt string
 * @param str
 */
export const de = (str: string) => {
    try {
        if (str) {
            const decrypted = _de(str, key, { iv });
            return decrypted.toString(_cjs.enc.Utf8);
        }

        return str;
    } catch (error) {
        return str;
    }
};

/**
 * get data from parent request
 * @param request 
 * @param convert 
 */
export const messageData = (request: any, convert = false) => {
    try {
        // check message and parse data
        const requestData = request ? (request.message ? request.message : typeof request === "object" ? request : JSON.parse(request)) : {};

        // convert array to object
        if (convert && requestData && requestData.data && requestData.data.length) {
            let object: any = {};

            requestData.data.forEach((element: any) => {
                object[element.name] = element.value;
            });

            requestData.data = object;
        }

        return requestData;
    } catch (error) {
        return {};
    }
};

/**
 * convert string to json
 * @param json 
 */
export const parseJson = (json: string) => {
    try {
        return JSON.parse(json);
    } catch (error) {
        return {};
    }
}

/**
 * decode special html symbols
 * @param html 
 * @returns 
 */
export const decodeHtml = (html: string): string => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * url decoder
 * @param str 
 * @returns 
 */
export const urlDecode = (str: string): string => {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        console.error(e);
        return "";
    }
}

/**
 * get language flag url by lang code
 * @param langCode 
 * @returns 
 */
export const getLanguageFlagUrl = (langCode: string): string => {
    const pluginData = usePluginParams();
    let url = "#";

    try {
        if (pluginData.wpml && pluginData.wpml.translations && pluginData.wpml.translations[langCode]) {
            url = pluginData.wpml.translations[langCode].country_flag_url;
        }
    } catch (error: any) {
        console.error("getLanguageFlagUrl", error.message);
    }

    return url;
}

export const getFilterWpmlOptions = (wpmlParams: any): any => {
    const pluginData = usePluginParams();
    let options: any = {};

    try {
        if (pluginData.wpml && pluginData.wpml.translations) {

            Object.values(pluginData.wpml.translations).map((lang: any) => {
                options[lang.language_code] = wpmlParams[lang.language_code] === false ? false : true;
            });
        }
    } catch (error: any) {
        console.error("getFilterWpmlOptions", error.message);
    }

    return options;
}

/**
 * generate id
 * @param length 
 * @returns 
 */
export const makeid = (length: number): string => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const formatUserErrors = (data: any): Array<string> => {
    let errors: any[] = [];

    if (!data) return errors;

    try {
        // get errors from object
        Object.values(data.errors).map((value: any) => {
            errors = [...errors, ...value];
        });
    } catch (error: any) {
        console.error("formatUserErrors", error.message);
    }

    return errors;
}

export const formatPrice = (number: string, decPlaces: number, decSep: string, thouSep: string) => {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;

    const sign = parseFloat(number) < 0 ? "-" : "";
    // const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    const i = String(parseInt(number = toFixed(Math.abs(Number(number) || 0), decPlaces)));
    let j = i.length;
    j = j > 3 ? j % 3 : 0;

    const price = sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(parseFloat(number) - parseFloat(i)).toFixed(decPlaces).slice(2) : "");
    // (decPlaces ? decSep + toFixed(Math.abs(parseFloat(number) - parseFloat(i)), decPlaces).slice(2) : "");

    return Number(price);
}

export const toFixed = (number: any, fixed: number) => {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    const result = number.toString().match(re);

    return result ? result[0] : number;
}

export const calcIndexingPercent = (progress: any) => {
    try {

        if (progress.total && progress.limit) {
            if (parseInt(progress.total) === 0) return 100;

            const generated = progress.offset <= progress.total ? progress.offset : progress.total;
            const percent = (generated * 100) / progress.total;

            return percent;
        }

        return 0;
    } catch (error: any) {
        console.error("calcIndexingPercent", error);
        return 0;
    }
}

export const updateUsbs = (data: any) => {
    // @ts-ignore
    window.usbs = data;
}

export const productLocationsToString = (locations: any): string => {
    try {
        let list = [];

        for (const key in locations) {
            if (Object.prototype.hasOwnProperty.call(locations, key)) {
                const location = locations[key];

                if (location) list.push(location);
            }
        }

        return list.length ? list.join(", ") : "";
    } catch (error) {
        return "";
    }
}

export const formatInputPrice = (price: string): string => {
    try {
        if (!price) return price;

        let floatPrice = `${parseFloat(price)}`;
        const data = floatPrice.split(".");

        if (data.length === 2 && data[1].length < 2) {
            floatPrice += "0";
        }

        return floatPrice;
    } catch (error) {
        return price;
    }
}

export const formatPriceToApi = (price: string): string => {
    try {
        if (!price) return price;

        const pluginData = usePluginParams();

        // remove thousands symbols
        let _price = price.replaceAll(pluginData.priceThousandSeparator, "");

        // change decimal symbols to float format
        _price = _price.replaceAll(pluginData.priceDecimalSeparator, ".");

        return _price;
    } catch (error) {
        return price;
    }
}