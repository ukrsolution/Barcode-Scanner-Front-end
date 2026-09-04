interface LanguagesParams {
    languages: any,
}

function useLanguages(): LanguagesParams {
    let usbsLangs: any = {};

    // @ts-ignore
    usbsLangs = window['usbsLangs'] ? window['usbsLangs'] : {};

    let languages: any = {};

    if (typeof usbsLangs === 'object' && usbsLangs !== null) {
        languages = usbsLangs;
    } else {
        languages = JSON.parse(usbsLangs);
    }

    return { languages, }
}

export default useLanguages;