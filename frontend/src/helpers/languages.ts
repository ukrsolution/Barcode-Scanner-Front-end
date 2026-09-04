import useLanguages from "../hooks/useLanguages"

const { languages } = useLanguages();

export const text = (key: string) => {
    try {
        if (languages[key]) {
            let text = languages[key];
            return `${text}`.replaceAll("###", "'").replaceAll("$$$", '"')
        }
    } catch (error: any) {
        console.error("text", error);
    }

    return key;

}