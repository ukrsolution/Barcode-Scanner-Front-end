import * as mobileCommandsActions from "../../../store/mobile/commands/actions";
import { MobileCommandProps } from "../scanning/containers/ScanningContainer";

export const consoleLog = (logData: any) => {
    const data: MobileCommandProps = {
        message: "mobile.postMessage",
        method: mobileCommandsActions.commands.CONSOLE_LOG,
        options: { data: logData },
    };
    window.parent.postMessage(data, "*");
};