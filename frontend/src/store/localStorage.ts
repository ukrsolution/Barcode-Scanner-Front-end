export const storageKey = "barcode-scanner-v1";

export const loadState = () => {
    // @ts-ignore
    let json: string = window.serializedData;

    try {

        if (json === null) return undefined;

        // clear new line symbols
        json = json ? json.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") : "";

        return json ? JSON.parse(json) : {};
    } catch (error: any) {
        console.error(`loadState. ${error.message}`, { json });
        return undefined;
    }
};

export const saveState = (state: any): void => {
    try {
        const serializedData = JSON.stringify(state);
        window.parent.postMessage({ message: "localStorage.setItem", storageKey, serializedData }, "*");
    } catch (error: any) {
        console.error(`saveState. ${error.message}`);
    }
};
