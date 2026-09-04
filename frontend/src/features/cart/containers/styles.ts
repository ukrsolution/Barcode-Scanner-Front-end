import { makeStyles } from "@material-ui/core/styles";

export const CartContainerStyle = makeStyles(() => {
    return {
        blockedBox: {
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
        clearButton: {
            "&:hover": {
                backgroundColor: "red",
                color: "white"
            }
        },
        freeActionsMessage: {
            fontSize: "16px",
            padding: "25px 0",
            textAlign: "center",
            width: "initial",
            maxWidth: 300,
            "& a": {
                color: "#1976D2",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        },
        orderCreated: {
            padding: "82px 0 52px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#828282",
            height: 48,
            "& img": {
                margin: "0 5px",
            },
            "& a": {
                color: "#828282",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: 500,
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: 520,
                maxHeight: 48,
                display: "inline-block",
                marginLeft: 18,
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        }
    }
});

export const ItemAttributesContainerStyle = makeStyles(() => {
    return {
        root: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#ffffffe8",
            width: "100%",
            height: "100%",
            padding: 15,
            boxSizing: "border-box",
            zIndex: 5
        },
        productName: {
            fontSize: "19px",
            textAlign: "center"
        },
        label: {
            fontSize: "16px",
            textAlign: "center"
        },
        blockedBox: {
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
        clearButton: {
            "&:hover": {
                backgroundColor: "red",
                color: "white"
            }
        },
        actions: {
            textAlign: "center",
            "& button": {
                margin: "0 10px"
            }
        }
    }
});

export const ItemQuantityContainerStyle = makeStyles(() => {
    return {
        root: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#ffffffe8",
            width: "100%",
            height: "100%",
            padding: 15,
            boxSizing: "border-box",
            zIndex: 5
        },
        productName: {
            fontSize: "19px",
            textAlign: "center"
        },
        label: {
            fontSize: "16px",
            textAlign: "center"
        },
        blockedBox: {
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
        clearButton: {
            "&:hover": {
                backgroundColor: "red",
                color: "white"
            }
        },
        actions: {
            textAlign: "center",
            "& button": {
                margin: "0 10px"
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
        },
        link: {
            color: "#1976D2",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "25px",
            letterSpacing: "0.15px",
            display: "inline-block",
        },
    }
});