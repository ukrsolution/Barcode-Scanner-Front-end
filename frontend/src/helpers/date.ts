import moment from "moment";
import { de, parseJson } from "./data";
import * as log from "./log";

export interface parseUpdatedResult {
    status: boolean;
    message: string;
}

export const parseUpdated = (string: string): parseUpdatedResult => {
    try {
        const object: any = parseJson(de(string));

        // valid status is required
        if (!object.s) return { status: false, message: object.st };

        // expire date is required
        if (!object.x) return { status: false, message: object.st };

        // check expire date
        const d = moment(object.x, "YYYY-MM-DD HH:mm:ss");

        // check expired date (including current day +24 hours)
        return { status: moment.duration(d.diff(moment())).asHours() + 0 > 0, message: object.st };
    } catch (error) {
        log.error(error, "parseUpdated")
        return { status: false, message: "" };
    }
}