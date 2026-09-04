import { makeStyles, Theme } from "@material-ui/core/styles";

export const ItemsListsStyle = makeStyles(() => {
    return {
        table: {
            minWidth: 535,
        },
        tr: {
            "&[data-new='1']": {
                animation: "$newItem .8s forwards"
            }
        },
        td: {
            padding: "8 !important",
            "&:first-child": {
                padding: 8,
                width: 64,
                maxWidth: 64,
                boxSizing: "border-box"
            },
        },
        tdTitle: {
            padding: "8 !important",
            maxWidth: 220,
        },
        labels: {
            background: "white !important",
            border: "none !important",
            padding: "0 0 4px 0 !important",
            "&:first-child": {
                // width: 50,
                width: "100%",
                paddingLeft: "10px !important"
            },
            "&:last-child": {
                width: 50,
            },
            // "&:nth-child(2)": {
            //     // width: "100%",
            //     // paddingLeft: "10px !important"
            // },
            "&:nth-child(2)": {
                // paddingLeft: "10px !important"
                textAlign: "center"
            },
            "&:nth-child(3)": {
                // paddingRight: "15px !important",
                textAlign: "center",
                minWidth: 75
            },
            "&:nth-child(4)": {
                // paddingRight: "15px !important",
                textAlign: "center",
                minWidth: 75
            }
        },
        tableHead: {
            outline: "none",
        },
        container: {
            maxHeight: 440,
        },
        button: {
            margin: 0,
            "&:hover": {
                color: "red"
            }
        },
        productLink: {
            color: "#000000de",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline"
            }
        },
        loaderPostId: {
            top: "3px",
            right: "5px",
            position: "relative",
        },
        variations: {
            fontSize: "12px"
        },
        notFound: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#828282",
            height: 48,
            padding: 48,
            "& svg": {
                width: "36px !important",
                height: "36px !important",
                margin: "0 5px",
                color: "#828282"
            },
            "& span": {
                color: "#828282",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: 500,
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: 520,
                maxHeight: 48,
                display: "inline-block",
            }
        },
        "@keyframes newItem": {
            "0%": {
                backgroundColor: "#fff"
            },
            "50%": {
                backgroundColor: "#cdf7ca"
            },
            "100%": {
                backgroundColor: "#fff"
            }
        },
        discount: {
            color: "#828282",
            fontSize: "13px",
            lineHeight: "15px",
            position: "absolute",
            top: 20,
            left: "calc(50% - 27px)",
            display: "inline-block",
            width: 55,
            textAlign: "center",
            cursor: "pointer",
            "&:hover": {
                textDecoration: "underline",
            }
        }
    }
});


export const QuantityStyle = makeStyles((theme: Theme) => {
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
                padding: "10px 5px 9px",
                width: 50,
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
            },
            "&:focus": {
                outline: "none !important",
            },
            "&[data-updated='1']": {
                animation: "$quantityUpdated .8s forwards"
            }
        },
        inputActions: {
            boxShadow: "none",
            position: "absolute",
            top: -44,
            right: -100,
            width: "90px !important",
            background: "#ffffff9e",
            padding: 5,
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
        },
        inputIconButtonOk: {
            margin: "0 5px 0 0",
            padding: "5px !important",
            color: "#219653",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        "@keyframes quantityUpdated": {
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

export const PriceStyle = makeStyles((theme: Theme) => {
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
                padding: "10px 5px 9px",
                width: 75,
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
            },
            "&:focus": {
                outline: "none !important",
            },
            "&[data-updated='1']": {
                animation: "$priceUpdated .8s forwards"
            }
        },
        inputActions: {
            boxShadow: "none",
            position: "absolute",
            top: -44,
            left: 85,
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
        },
        inputIconButtonOk: {
            margin: "0 0 0 0",
            padding: "5px !important",
            color: "#219653",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        "@keyframes priceUpdated": {
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