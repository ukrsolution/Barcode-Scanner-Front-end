import { makeStyles } from "@material-ui/core/styles";

export const HeaderStyle = makeStyles(() => {
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#424242",
            height: 48,
        },
        icon: {
            width: "36px !important",
            height: "36px !important",
            margin: "0 5px",
            color: "#828282"
        },
        image: {
            maxWidth: "48px !important",
            maxHeight: "48px !important",
            margin: "0 5px"
        },
        name: {
            color: "#424242",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 520,
            maxHeight: 48,
            display: "inline-block",
        },
        resultText: {
            color: "#828282",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "21.09px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 520,
            maxHeight: 77,
            display: "inline-block",
            marginLeft: 18
        },
        date: {
            fontSize: "14px",
            display: "inline-block",
            marginTop: "2px",
        }
    }
});

export const DetailsStyle = makeStyles(() => {
    return {
        root: {
            display: "flex",
            justifyContent: "start",
            padding: "25px 0",
            minHeight: 46
        },
        list: {
            listStyleType: "none",
            margin: 0,
            padding: "0 15px",
            background: "transparent",
            width: 153,
            "&:last-child": {
                paddingRight: 0,
            }
        },
        listHeadline: {
            fontWeight: 500,
            fontSize: "16px",
            paddingBottom: 4,
            letterSpacing: "0.15008px"
        },
        listHeadlineSecond: {
            fontWeight: 500,
            fontSize: "16px",
            paddingTop: 10,
            paddingBottom: 4,
            letterSpacing: "0.15008px"
        },
        listLine: {
            fontSize: "15px",
            lineHeight: "21px",
            padding: "0 0",
            letterSpacing: "0.15008px",
            wordBreak: "break-all"
        },
        customerNote: {
            display: "block",
            maxHeight: 65,
            overflowY: "auto",
        },
    }
});

export const ProductsStyle = makeStyles(() => {
    return {
        root: {
            padding: "20px 0 10px"
        },
        tableContainer: {
            "&:last-child": {
            }
        },
        tableHead: {
            outline: "none",
        },
        tableBody: {
            borderBottom: "1px solid red",
        },
        th: {
            background: "white",
            border: "none",
            padding: "0 0 4px 0",
            textAlign: "right",
            width: "11%",
            "&:first-child": {
                fontWeight: 500,
                width: "66%",
                fontSize: "18px",
                padding: "0 13px",
                textAlign: "left",
            },
            "&:last-child": {
                padding: "0 4px 0 0",
            },
            "&:nth-child(3)": {
                textAlign: "center",
            }
        },
        tr: {
            "& *": {
                verticalAlign: "middle"
            },
            "& td": {
                padding: 0,
                border: "none",
                fontSize: "16px",
                textAlign: "right",
                "&:first-child": {
                    padding: "7px 13px 8px",
                    textAlign: "left",
                },
                "&:last-child": {
                    padding: "0 4px 0 0",
                },
                "&:nth-child(3)": {
                    textAlign: "center",
                }
            },
        }
    }
});

export const TotalStyle = makeStyles(() => {
    return {
        root: {
            display: "flex",
            padding: 0,
            justifyContent: "space-between",
            alignItems: "center",
            "&>div": {

            }
        },
        status: {
            alignSelf: "start",
            padding: "0 14px",
            display: "inline-block",
            "& span": {
                display: "inline-block",
                fontSize: "18px",
                padding: "15px 10px 0 0",
            },
            "& div": {
                marginTop: 2,
                width: 212
            }
        },
        list: {
            listStyleType: "none",
            padding: 0,
            margin: 0,
            "& li": {
                textAlign: "right",
                "& span": {
                    display: "inline-block",
                    paddingBottom: 11,
                    "&:last-child": {
                        minWidth: 72,
                        paddingRight: 7,
                    }
                }
            }
        },
        freeActionsMessage: {
            fontSize: "16px",
            padding: "25px 0",
            textAlign: "center",
            width: "300px !important",
            "& a": {
                color: "#1976D2",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        }
    }
});