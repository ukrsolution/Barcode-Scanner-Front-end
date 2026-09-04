import { de } from "../../../helpers/data";
import usePluginParams from "../../../hooks/usePluginParams";

export const getAppUsers = () => {
    const pluginData = usePluginParams();
    const json = pluginData.userSessions ? de(pluginData.userSessions) : "";
    const users = json ? JSON.parse(json) : [];

    window.parent.postMessage({ message: "iframe.appUsers", users }, "*");
}