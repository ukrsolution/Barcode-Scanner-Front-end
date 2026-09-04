import { makeStyles } from "@material-ui/core/styles";

export const SearchFieldStyle = makeStyles(() => {
    return {
        wrapper: {
            display: "flex",
            flexDirection: "column",
            padding: "18px 0 13px",
        },
        root: {
            display: "flex",
            padding: 0,
            margin: 0,
            border: "1px solid #f2f2f2",
            boxShadow: "none"
        },
        filterRoot: {
            padding: "0",
            margin: "0",
        },
        input: {
            marginLeft: 11,
            flex: 1,
            height: 38,
            // color: "#BDBDBD",
            "& input": {
                padding: "6px 0 7px !important",
                border: "none !important",
                boxShadow: "none !important",
                minHeight: "auto !important",
                fontSize: "14px",
                lineHeight: "16px"
            },
        },
        iconButton: {
            padding: 8,
        },
        searchButton: {
            display: "block",
            width: 38,
            height: 38,
            padding: 8,
            borderRadius: "0 4px 4px 0",
            border: "none",
            boxSizing: "border-box",
            marginLeft: 0
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
                padding: 4,
                cursor: "pointer",
                borderRight: "1px solid #f2f2f2",
                "&:first-child": {
                    borderTopLeftRadius: 4
                },
                "&:last-child": {
                    borderBottomLeftRadius: 4
                },
                "&.active": {
                    background: "#2067F0",
                    color: "#fff",
                    borderRight: "1px solid #fff",
                }
            }
        }
    }
});