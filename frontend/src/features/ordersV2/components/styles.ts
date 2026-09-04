import { createTheme, makeStyles, Theme } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';


export const TotalTheme = createTheme({
    palette: {
        primary: green,
    },
});

export const TotalStyle = makeStyles(() => {
    return {
        root: {
            display: "flex",
            padding: 0,
            justifyContent: "flex-end",
            alignItems: "start",
            "&>div": {

            }
        },
        list: {
            listStyleType: "none",
            padding: 0,
            margin: "8px 0 0 0",
            "& li": {
                textAlign: "right",
                "& span": {
                    display: "inline-block",
                    paddingBottom: 11,
                    "&:last-child": {
                        minWidth: 79,
                        paddingRight: 7,
                    }
                }
            }
        },
        newOrder: {
            alignSelf: "start",
            margin: "7px 14px",
            cursor: "pointer",
            color: "white"
        },
    }
});

export const OrderStatusStyle = makeStyles(() => {
    return {
        status: {
            alignSelf: "start",
            padding: "0 14px 0 0",
            display: "inline-block",
            "& span": {
                display: "inline-block",
                fontSize: "16px",
                padding: "15px 10px 0 0",
                width: 46
            },
            "& div": {
                marginTop: "1px !important",
                width: 170
            }
        },
    }
});

export const OrderNoteStyle = makeStyles(() => {
    return {
        textarea: {
            resize: "none",
            width: "100%",
            margin: "15px 14px 12px 0",
            boxSizing: "border-box",
            maxWidth: 369,
            border: "none",
            outline: "1px solid #E0E0E0",
            padding: "10px 12px 9px",
            fontSize: "16px",
            borderRadius: 4,
            color: "#b7b7b7",
            background: "white",
            "&::placeholder": {
                color: "#b7b7b7"
            }
        },
    }
});

export const OrderUserStyle = makeStyles(() => {
    return {
        user: {
            alignSelf: "start",
            padding: "0 14px",
            display: "inline-block",
            "& span": {
                display: "inline-block",
                fontSize: "16px",
                padding: "15px 10px 0 0",
                width: 46
            },
            "& div": {
                marginTop: 2,
                width: 170,
                "&::before": {
                    border: "none !important",
                }
            }
        },
        input: {
            margin: "1px 0 0 !important",
            flex: 1,
            outline: "none !important",
            border: "none !important",
            backgroundColor: "white",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"

            },
            "& input": {
                fontSize: "16px",
                padding: "10px 12px 9px",
                width: 170,
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
                "&::placeholder": {
                    color: "#b7b7b7",
                    opacity: 1
                },
                "&:disabled": {
                    color: "#b7b7b7"
                },
            },
            "&:focus": {
                outline: "none !important",
            }
        },
    }
});

export const OrderUsersListStyle = makeStyles(() => {
    return {
        list: {
            position: "absolute",
            background: "white",
            padding: 0,
            margin: 0,
            borderRadius: "4px",
            boxShadow: "0 4px 11px -5px",
            left: 14,
            minWidth: 170,
            top: 0,
        },
        ul: {
            listStyleType: "none",
            padding: 0,
            margin: 0
        },
        li: {
            cursor: "pointer",
            fontSize: "14px",
            padding: "4px 10px",
            "&:hover": {
                backgroundColor: "#efefef"
            }
        }
    }
});

export const OrderUserCreateStyle = makeStyles(() => {
    return {
        wrapper: {
            top: 0,
            left: 0,
            width: "100%",
            margin: 0,
            padding: "19px",
            position: "absolute",
            background: "white",
            boxShadow: "0 0 50px 0px #828282",
            borderRadius: "4px",
            boxSizing: "border-box",
            zIndex: 2
        },
        input: {
            margin: "1px 0 0 !important",
            flex: 1,
            outline: "none !important",
            border: "none !important",
            backgroundColor: "white",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"
            },
            "& input": {
                fontSize: "16px",
                padding: "10px 12px 9px",
                width: 170,
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
            },
            "&:focus": {
                outline: "none !important",
            },
            "&>div::before": {
                border: "none !important",
            },
        },
        close: {
            position: "absolute",
            right: 10,
            top: 10,
            cursor: "pointer"
        },
        fieldLabel: {
            display: "inline-block",
            width: 100,
            padding: "10px 0"
        }
    }
});

export const OrderPriceStyle = makeStyles((theme: Theme) => {
    return {
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
            fontSize: "25px",
            color: "red",
            padding: "8px !important",
            minWidth: 54,
            border: "1px solid #E0E0E0 !important",
            transition: ".4s",
            "&.active": {
                background: "#ff0000",
                color: "#fff",
            }
        },
        iconPlus: {
            fontSize: "25px",
            color: "#219653",
            padding: "8px !important",
            minWidth: 54,
            border: "1px solid #E0E0E0 !important",
            transition: ".4s",
            "&.active": {
                background: "#219653",
                color: "#fff",
            }
        },
        input: {
            margin: "1px 0 0 !important",
            flex: 1,
            outline: "none !important",
            border: "none !important",
            backgroundColor: "white",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"
            },
            "& input": {
                fontSize: "18px",
                padding: "7px 5px",
                width: 85,
                height: 36,
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
                boxSizing: "border-box",
            },
            "&:focus": {
                outline: "none !important",
            },
            "&[data-updated='1']": {
                animation: "$orderUpdated .8s forwards"
            }
        },
        inputActions: {
            boxShadow: "none",
            position: "absolute",
            top: -77,
            left: 0,
            width: "80px !important",
            background: "#ffffff9e",
            padding: "5px 0",
            borderRadius: 10,
            zIndex: 20
        },
        inputIconButton: {
            margin: theme.spacing(0),
            padding: "5px !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
            "&>span": {
                padding: "0 !important",
                minWidth: "24 !important"
            },
        },
        inputIconButtonOk: {
            margin: "0 0 0 0",
            padding: "5px !important",
            color: "#219653",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
            "&>span": {
                padding: "0 !important",
                minWidth: "24 !important"
            },
        },
        "@keyframes orderUpdated": {
            "0%": {
                backgroundColor: "#fff"
            },
            "50%": {
                backgroundColor: "#cdf7ca"
            },
            "100%": {
                backgroundColor: "#fff"
            }
        }
    }
});