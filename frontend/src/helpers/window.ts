import * as log from "../helpers/log"

/**
 * remove latest slash(es)
 * @param url
 */
export const clearURL = (url: string): string => {
    try {
        return url.replace(/\/$/g, "").replace(/\/$/g, "").replace(/\/$/g, "");
    } catch (event) {
        log.error(event, "clearURL");
        return url.toString();
    }
};

/**
 * get domain (without protocol & etc.)
 * @param url
 */
export const getDomain = (url: string): string => {
    try {
        return new URL(url).hostname;
    } catch (event) {
        log.error(event, "getDomain");
        return url;
    }
};

export const fallbackCopyTextToClipboard = (text: string) => {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        msg;
        // console.log('Fallback: Copying text command was ' + msg);
    } catch (err: any) {
        // console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
export const copyTextToClipboard = (text: string) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        // console.log('Async: Copying to clipboard was successful!');
    }, (err: any) => {
        err;
        // console.error('Async: Could not copy text: ', err);
    });
}