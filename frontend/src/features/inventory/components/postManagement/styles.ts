import { makeStyles, Theme } from "@material-ui/core/styles";

export const PostManagementStyle = makeStyles(() => {
    return {
        grid: {
            flexGrow: 1,
            padding: "9px 0 0 0",
        },
        delimiter: {
            background: "#F2F2F2",
            width: 2,
            height: 100,
            position: "absolute",
            top: 38,
            left: 9
        },
        alert: {
            width: 230,
            margin: "13px 0px 0 auto",
            textAlign: "center",
            fontSize: "14px",
            position: "relative",
        },
        alertButton: {
            color: "#1976D2",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline",
            }
        },
        alertTooltip: {
            padding: "10px 15px",
            position: "absolute",
            background: "white",
            borderRadius: 4,
            fontSize: "12px",
            lineHeight: "17px",
            width: 245,
            zIndex: 10,
            textAlign: "left",
            right: 0,
            bottom: 19,
            border: "1px solid #E0E0E0",
            boxShadow: "0 0 10px #e0e0e0"
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
            right: 11,
            cursor: "help",
        }
    }
});

export const PriceStyle = makeStyles(() => {
    return {
        root: {
            padding: '7px 0 8px !important',
            margin: " 0 0 3px 0 !important",
            display: 'flex',
            alignItems: 'center',
            minHeight: 37,
            boxShadow: "none !important",
            background: "transparent",
        },
        input: {
            marginLeft: 8,
            flex: 1,
            "& input": {
                background: "#FFFFFF !important" as any,
                border: "1px solid #E0E0E0 !important" as any,
                borderRadius: "4px !important" as any,
                padding: "9px 12px",
                color: "#333 !important" as any,
                fontSize: "18px !important" as any,
                lineHeight: "18px !important" as any,
                width: 140,
                height: 42,
                boxSizing: "border-box",
                textAlign: "center",
                userSelect: "auto",
                "&[disabled]": {
                    background: "#f2f2f2 !important" as any,
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
            color: "#4F4F4F !important",
            fontSize: "14px !important" as any,
            width: "100px !important" as any,
            textAlign: "right !important" as any,
            letterSpacing: "0.15008px",
        },
        actions: {
            position: "absolute",
            right: -35,
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

export const MetaFieldStyle = makeStyles(() => {
    return {
        root: {
            padding: '7px 0 8px !important',
            margin: " 0 0 3px auto !important",
            display: 'flex',
            alignItems: 'center',
            minHeight: 37,
            maxWidth: 240,
            boxShadow: "none !important",
            background: "transparent",
            position: "relative"
        },
        input: {
            marginLeft: 9,
            flex: 1,
            "& input": {
                background: "#FFFFFF !important" as any,
                border: "1px solid #E0E0E0 !important" as any,
                borderRadius: "4px !important" as any,
                padding: "10px 12px",
                color: "#333 !important" as any,
                fontSize: "18px !important" as any,
                width: "100%",
                height: 42,
                boxSizing: "border-box",
                userSelect: "auto",
                textAlign: "center",
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
            color: "#4F4F4F !important",
            fontSize: "14px !important" as any,
            width: "100% !important" as any,
            textAlign: "center !important" as any,
            letterSpacing: "0.15008px",
            position: "absolute",
            top: -10
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

export const QuantityStyle = makeStyles((theme: Theme) => {
    return {
        root: {
            width: 265,
            margin: "5px 0 0 auto !important"
        },
        label: {
            textAlign: "center",
            marginTop: 5,
            marginBottom: 5,
            paddingLeft: 25,
            color: "#4F4F4F",
            fontSize: "14px"
        },
        grid: {
            background: "transparent",
            // padding: "0 0 0 25px !important",
            width: 231,
            marginLeft: "auto"
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
            color: "red !important",
            padding: "8px !important",
            minWidth: "54px !important",
            marginRight: "7px !important",
            border: "1px solid #E0E0E0 !important",
            transition: ".4s",
            "&.active": {
                background: "#ff0000 !important",
                color: "#fff !important",
            }
        },
        iconPlus: {
            fontSize: "25px !important",
            color: "#219653 !important",
            padding: "8px !important",
            minWidth: "54px !important",
            marginLeft: "7px !important",
            border: "1px solid #E0E0E0 !important",
            transition: ".4s",
            "&.active": {
                background: "#219653 !important",
                color: "#fff !important",
            }
        },
        input: {
            margin: "1px 0 0 !important",
            flex: 1,
            outline: "none !important",
            border: "none !important",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"

            },
            "& input": {
                fontSize: "18px",
                padding: "10px 5px 9px",
                width: 95,
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
                color: "#333 !important",
                userSelect: "auto",
            },
            "&:focus": {
                outline: "none !important",
            },
        },
        inputActions: {
            boxShadow: "none",
            width: "fit-content !important",
            margin: "5px auto",
        },
        inputIconButton: {
            margin: theme.spacing(0),
            padding: "5px !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        inputIconButtonOk: {
            margin: "0 5px 0 0",
            padding: "5px !important",
            color: "#219653 !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
    }
});
