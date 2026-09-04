import { makeStyles } from "@material-ui/core/styles";
import * as mobileScreen from "../../../../helpers/mobileScreen";

export const SwitcherStyle = makeStyles(() => {
    return {
        root: {
            marginTop: 12,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                marginTop: 20,
                marginBottom: 20,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                marginTop: 24,
                marginBottom: 24,
            },
        },
        button: {
            fontSize: "12px !important",
            textAlign: "center",
            margin: 0,
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0 !important",
            padding: "12px 10px !important",
            color: "#4F4F4F !important",
            height: 32,
            minWidth: 100,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: "13px !important",
                height: 42,
                minWidth: 102,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: "15px !important",
                height: 48,
                minWidth: 130,
            },
        },
        buttonActive: {
            fontSize: "12px !important",
            textAlign: "center",
            margin: 0,
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0 !important",
            padding: "12px 10px !important",
            height: 32,
            minWidth: 100,
            '&[data-value="AUTO_DECREASING"]': {
                color: "#fff !important",
                background: "#EB5757 !important",
            },
            '&[data-value="AUTO_INCREASING"]': {
                color: "#fff !important",
                background: "#27AE60 !important",
            },
            '&[data-value="OPEN"]': {
                background: "#F2F2F2 !important",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: "13px !important",
                height: 42,
                minWidth: 102,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: "15px !important",
                height: 48,
                minWidth: 130,
            },
        },
        label: {
            transition: mobileScreen.animation.transition,
            color: "#4F4F4F",
            fontSize: "14px",
            width: 90,
            display: "inline-block",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: "15px",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: "17px",
                width: 90,
            }
        }
    }
});

export const SoundButtonStyle = makeStyles(() => {
    return {
        button: {
            fontSize: "12px !important",
            textAlign: "center",
            margin: "0 0 0 5px !important",
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0",
            padding: "5px !important",
            color: "#4F4F4F !important",
            minWidth: "30px !important",
            height: 30,
            width: 30,
            background: "#F2F2F2 !important",
            position: "relative",
            top: -1
        }
    }
});

export const HeaderStyle = makeStyles(() => {
    return {
        root: {
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            color: "#828282",
            minHeight: 108,
        },
        icon: {
            width: "36px !important",
            height: "36px !important",
            margin: "0 5px"
        },
        image: {
            transition: mobileScreen.animation.transition,
            maxWidth: "108px !important",
            minHeight: "108px !important",
            width: "auto",
            height: "auto",
            marginRight: 13,
            [`@media (max-width:${mobileScreen.resolutions.medium}px)`]: {
                maxWidth: "70px !important",
                minHeight: "70px !important",
            }
        },
        title: {
            transition: mobileScreen.animation.transition,
            fontSize: "16px",
            [`@media (max-width:${mobileScreen.resolutions.medium}px)`]: {
                fontSize: "14px",
            }
        },
        name: {
            color: "#828282",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "18.75px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 520,
            maxHeight: 57,
            display: "inline-block",
        },
        type: {
            fontSize: "13px",
            lineHeight: "15.23px",
            textTransform: "capitalize",
            marginTop: 15
        },
        description: {
            fontSize: "13px",
            lineHeight: "15.23px",
            textTransform: "capitalize",
            cursor: "pointer"
        }
    }
});