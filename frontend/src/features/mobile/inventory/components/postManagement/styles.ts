import { makeStyles, Theme } from "@material-ui/core/styles";
import * as mobileScreen from "../../../../../helpers/mobileScreen";

export const PostManagementStyle = makeStyles(() => {
    return {
        grid: {
            flexGrow: 1,
            padding: "0",
        },
        delimiter: {
            background: "#F2F2F2",
            width: 2,
            height: "100",
            position: "absolute",
            top: 25,
            left: 0
        },
        alert: {
            // width: 265,
            margin: "13px 0px 0 auto",
            textAlign: "center",
        },
        alertButton: {
            color: "#2067F0",
            cursor: "pointer"
        },
        linearProgressBox: {
            position: "relative",
            top: 5,
            padding: "0px 0 0 110px",
            margin: "0 0 0 0",
            "& span": {
                margin: "0 5px",
                position: "relative",
                top: "-2px",
            }
        },
        linearProgress: {
            height: "2px",
            backgroundColor: "silver",
            "& div:first-child": {
                background: "#424242",
            },
            "& div:last-child": {
                background: "#8c8c8c",
            },
        },
        manageBlockedBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            background: "#fff",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 15,
            opacity: 0.7,
            transition: "0.3s"
        },
        priceInfo: {
            position: "absolute",
            fontSize: "23px",
            top: "44%",
            right: 5,
            cursor: "help",
            color: "#828282",
            translate: ".3s",
            "&:hover": {
                color: "#464646",
            }
        }
    }
});

export const PriceStyle = makeStyles(() => {
    return {
        root: {
            padding: '0 0 16px',
            margin: " 0 !important",
            display: 'flex',
            alignItems: 'center',
            minHeight: 37,
            boxShadow: "none !important",
            background: "transparent",
            "& > .MuiTextField-root": {
                minWidth: "120px !important",
                "& > .MuiInputLabel-outlined": {
                    lineHeight: "6px",
                },
                "& > .MuiFormLabel-filled": {
                    lineHeight: "15px",
                }
            },
        },
        input: {
            marginLeft: 0,
            flex: 1,
            background: "rgba(4, 26, 67, 0.04)",
            "& input": {
                padding: "10px",
                color: "#041A43 !important",
                fontSize: "15px !important" as any,
                lineHeight: "20px !important" as any,
                textAlign: "left",
                background: "#fff",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                boxSizing: 'border-box',
                fontWeight: "500 !important" as any,
                height: 32,
                "&::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                    padding: "12px",
                    fontSize: "16px !important" as any,
                    lineHeight: "24px !important" as any,
                    height: 40,
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                    padding: "12px",
                    fontSize: "22px !important" as any,
                    lineHeight: "28px !important" as any,
                    height: 44,
                },
            },
            "& > fieldset": {
                border: "1px solid rgba(4, 26, 67, 0.08) !important"
            }
        },
        currency: {
            "& > p": {
                fontSize: "16px",
                lineHeight: "24px",
                color: '#041A4399',
                paddingLeft: 5
            }
        },
        inputLabel: {
            transition: mobileScreen.animation.transition,
            color: "#041A43B2 !important",
            fontSize: "14px !important" as any,
            lineHeight: "20px",
            width: "121px !important" as any,
            margin: "0px 5px 3px !important"
            // [`@media (max-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            //     width: "83px !important" as any,
            //     fontSize: "12px !important" as any,
            // }
        },
        actions: {
            position: "absolute",
            display: "flex",
            width: 70,
            zIndex: 2,
            left: 27,
            bottom: -25,
        },
        iconButton: {
            padding: "5px !important",
            background: "#f1f1f1",
            "&.Mui-disabled": {
                background: "#f1f1f1 !important",
            },
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        iconButtonOk: {
            padding: "5px !important",
            margin: "0 5px 0 0",
            color: "#219653 !important",
            background: "#f1f1f1",
            "&.Mui-disabled": {
                background: "#f1f1f1 !important",
            },
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
    }
});

export const QuantityStyle = makeStyles((theme: Theme) => {
    return {
        root: {
            margin: "0 0 12px !important",
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                margin: "0 0 16px !important",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                margin: "0 0 24px !important",
            }
        },
        label: {
            transition: mobileScreen.animation.transition,
            display: "flex",
            alignItems: "center",
            maxWidth: 88,
            color: "#041A43B2 !important",
            fontSize: "12px !important" as any,
            lineHeight: "14px !important" as any,
            width: "88px !important" as any,
            boxSizing: 'border-box',
            height: 32,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: "14px !important" as any,
                lineHeight: "20px !important" as any,
                height: 40,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: "16px !important" as any,
                lineHeight: "24px !important" as any,
                height: 44,
            }
        },
        grid: {
            background: "transparent",
            padding: "0 !important",
        },
        gridItem: {
            padding: theme.spacing(0),
            textAlign: "center",
            color: theme.palette.text.secondary,
            boxShadow: "none !important",
            background: "transparent !important"
        },
        iconMinus: {
            fontSize: "25px !important",
            color: "#03122EE5 !important",
            padding: "3px 7px",
            minWidth: "32px",
            maxWidth: "32px",
            border: "1px solid rgba(4, 26, 67, 0.08)",
            transition: ".4s",
            height: 32,
            "&.active": {
                background: "#ff0000 !important",
                color: "#fff !important",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                padding: "8px 7px",
                minWidth: "42px",
                maxWidth: "42px",
                height: 40,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                padding: "11px 7px",
                minWidth: "48px",
                maxWidth: "40px",
                height: 44,
            },
        },
        iconPlus: {
            fontSize: "25px !important",
            color: "#03122EE5 !important",
            padding: "3px 7px",
            minWidth: "32px",
            maxWidth: "32px",
            height: 32,
            border: "1px solid rgba(4, 26, 67, 0.08) !important",
            transition: ".4s",
            "&.active": {
                background: "#219653 !important",
                color: "#fff !important",
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                padding: "8px 7px",
                minWidth: "42px",
                maxWidth: "42px",
                height: 40,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                padding: "11px 7px",
                minWidth: "48px",
                maxWidth: "40px",
                height: 44,
            },
        },
        input: {
            flex: 1,
            outline: "none !important",
            border: "none !important",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"

            },
            "& input": {
                fontSize: "15px",
                padding: "6px 16px",
                marginTop: 1,
                width: "100%",
                height: 32,
                margin: "0 12px",
                boxSizing: "border-box",
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                fontWeight: "500 !important" as any,
                border: "1px solid rgba(4, 26, 67, 0.08) !important",
                color: "#041A43 !important",
                borderRadius: "4px !important" as any,
                "&::-webkit-outer-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                    "-webkit-appearance": "none",
                    margin: 0,
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                    fontSize: "16px",
                    height: 40,
                    margin: "0 16px",
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                    fontSize: "18px",
                    height: 44,
                    margin: "0 18px",
                },
            },
            "&:focus": {
                outline: "none !important",
            },
        },
        inputActions: {
            boxShadow: "none",
            width: "fit-content !important",
            margin: "5px auto",
            position: "absolute",
            bottom: -45,
            left: 10
        },
        inputIconButton: {
            margin: theme.spacing(0),
            padding: "3px !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        inputIconButtonOk: {
            margin: "0 5px 0 0",
            padding: "3px !important",
            color: "#219653 !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
    }
});


export const MetaFieldStyle = makeStyles(() => {
    return {
        root: {
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            padding: '0 !important',
            position: 'relative',
            boxShadow: 'none!important',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        input: {
            flex: 1,
            "& input": {
                background: "#FFFFFF !important" as any,
                border: "1px solid rgba(4, 26, 67, 0.08) !important" as any,
                borderRadius: "4px !important" as any,
                color: "#041A43 !important" as any,
                padding: "6px 12px",
                fontSize: "15px !important" as any,
                lineHeight: "20px !important" as any,
                height: 32,
                fontWeight: "500 !important" as any,
                width: "100%",
                boxSizing: "border-box",
                userSelect: "auto",
                textAlign: "left",
                [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                    padding: "8px 12px",
                    fontSize: "16px !important" as any,
                    lineHeight: "24px !important" as any,
                    height: 40,
                },
                [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                    padding: "8px 12px",
                    fontSize: "18px !important" as any,
                    lineHeight: "28px !important" as any,
                    height: 44,
                }
            },
        },
        currency: {
            flex: 1,
            padding: "10px 5px",
            position: "relative",
            zIndex: 1,
            fontSize: "14px"
        },
        inputLabel: {
            maxWidth: 88,
            color: "#041A43B2 !important",
            fontSize: "12px !important" as any,
            lineHeight: "14px !important" as any,
            width: "88px !important" as any,
            [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
                fontSize: "14px !important" as any,
                lineHeight: "20px !important" as any,
            },
            [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
                fontSize: "16px !important" as any,
                lineHeight: "24px !important" as any,
            }
        },
        actions: {
            position: "absolute",
            right: 83,
            bottom: -30,
            display: "flex",
            width: 70,
            zIndex: 2
        },
        iconButton: {
            padding: "5px !important",
            background: "#f1f1f1",
            "&.Mui-disabled": {
                background: "#f1f1f1 !important",
            },
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        iconButtonOk: {
            padding: "5px !important",
            margin: "0 5px 0 0",
            color: "#219653 !important",
            background: "#f1f1f1",
            "&.Mui-disabled": {
                background: "#f1f1f1 !important",
            },
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
    }
});