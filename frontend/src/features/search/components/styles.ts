import { makeStyles, Theme } from "@material-ui/core/styles";

export const SearchFieldStyle = makeStyles((theme: Theme) => {
    return {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            padding: "24px 6px 16px",
        },
        root: {
            display: "flex",
            padding: 0,
            margin: 0,
            border: "1px solid #E0E0E0",
            boxShadow: "none"
        },
        link: {
            cursor: "pointer",
            color: "#828282",
            fontSize: "12px",
            lineHeight: "16px",
        },
        filterRoot: {
            padding: "0",
            margin: "0",
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            height: 46,
            // color: "#BDBDBD",
            "& input": {
                padding: "6px 0 7px !important",
                border: "none !important",
                boxShadow: "none !important",
                minHeight: "auto !important",
                fontSize: "16px",
                lineHeight: "19px",
                userSelect: "auto"
            },
        },
        iconButton: {
            padding: 8,
        },
        searchButton: {
            display: "block",
            width: 97,
            height: 46,
            padding: 10,
            color: "#333",
            backgroundColor: "#F2F2F2",
            borderRadius: "0 4px 4px 0",
            border: "none",
            boxSizing: "border-box",
            marginLeft: 0,
            fontSize: "15px",
            lineHeight: "20px",
        },
        searchButtonIcon: {
            width: 18,
            height: 18,
            marginRight: 5
        },
        errorMessage: {
            color: "red",
            fontSize: "14px",
            padding: "3px 15px 0",
            lineHeight: "16px",
            maxWidth: 435
        },
        searchMessage: {
            color: "#828282",
            fontSize: "14px",
            padding: "3px 15px 0",
            lineHeight: "16px",
            maxWidth: 435
        },
        successMessage: {
            color: "#388e3c",
            fontSize: "17px",
            padding: "3px 15px 0",
            lineHeight: "16px",
            maxWidth: 435,
            "& a": {
                color: "#388e3c",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline",
                }
            }
        },
        keywords: {
            color: "#828282",
            fontSize: "14px",
            padding: "3px 15px 0 10px",
            lineHeight: "16px"
        },
        messageGENERAL: {
            color: "#828282",
            fontSize: "12px",
            padding: "3px 10px 0",
            lineHeight: "16px",
            maxWidth: 435,
            // userSelect: "text"
        },
        messageERROR: {
            color: "red",
            fontSize: "12px",
            padding: "3px 10px 0",
            lineHeight: "16px",
            maxWidth: 435,
            // userSelect: "text"
        },
        inputType: {
            display: "flex",
            flexDirection: "column",
            marginRight: 10,
            "& > span": {
                flexGrow: 1,
                fontSize: "12px",
                textAlign: "center",
                width: 68,
                overflow: "hidden",
                padding: "5px 4px 4px 4px",
                cursor: "pointer",
                borderRight: "1px solid #E0E0E0",
                "&:first-child": {
                    borderTopLeftRadius: 4
                },
                "&:last-child": {
                    borderBottomLeftRadius: 4
                },
                "&.active": {
                    background: "#1976D2",
                    color: "#fff",
                    borderRight: "1px solid #fff",
                }
            }
        },
        optimize: {
            color: "#2F5CD6",
            cursor: "pointer",
            display: "inline-block",
            fontSize: "12px",
            lineHeight: "16px",
            padding: "0 4px",
            "&:hover": {
                backgroundColor: "#3C75F6",
                color: "white",
                borderRadius: "2px"
            }
        }
    }
});