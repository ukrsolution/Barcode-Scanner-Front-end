import { makeStyles } from "@material-ui/core/styles";
import * as mobileScreen from "../../../../../helpers/mobileScreen";

export const SearchResultsStyle = makeStyles(() => ({
    root: {
        background: "#fff",
        padding: 0,
        boxSizing: "border-box",
    },
    query: {
        fontSize: 16,
        lineHeight: "18.75px",
        paddingBottom: 12,
        fontWeight: 500,
        textAlign: "center",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: 18,
            lineHeight: "21.09px",
            paddingBottom: 20,
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: 22,
            lineHeight: "25.78px",
            paddingBottom: 24,
        },
    },
    list: {
        padding: 0,
        margin: 0,
    },
    item: {
        margin: 0,
        padding: "9px 8px",
        marginBottom: 12,
        alignItems: "center",
        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            padding: 16,
            marginBottom: 20,
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            padding: "17px 16px",
            marginBottom: 27,
        },
    },
    imageBox: {
        display: "inline-block",
        minWidth: 106,
        width: 106,
        height: 106,
        textAlign: "center",
        marginRight: 16,
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            minWidth: 120,
            width: 120,
            height: 120,
            marginRight: 20,
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            minWidth: 140,
            width: 140,
            height: 140,
            marginRight: 24,
        }
    },
    image: {
        maxWidth: 106,
        maxHeight: 106,
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            maxWidth: 120,
            maxHeight: 120,
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            maxWidth: 140,
            maxHeight: 140,
        }
    },
    icon: {
        opacity: 0.4,
        margin: 10,
        fontSize: "86px",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: "100px",
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: "120px",
        }
    },
    postId: {
        fontSize: 15,
        lineHeight: "18px",
        textAlign: "center",
        padding: "0 6px",
        border: "1px solid #DADADA",
        borderRadius: "4px",
        color: "#333333",
        backgroundColor: "transparent",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: 16,
            lineHeight: "18.75px",
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: 20,
            lineHeight: "24px",
        },
    },
    productName: {
        fontSize: 15,
        lineHeight: "18px",
        fontWeight: 500,
        color: "#333333",
        width: "100%",
        wordBreak: "break-all",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: 16,
            lineHeight: "18.75px",
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: 20,
            lineHeight: "24px",
        },
    },
    productPrice: {
        fontSize: 13,
        lineHeight: "15px",
        fontWeight: "bold",
        color: "#4F4F4F",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: 14,
            lineHeight: "16px",
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: 16,
            lineHeight: "19px",
        },
    },
    productQty: {
        fontSize: 13,
        lineHeight: "15px",
        fontWeight: "normal",
        color: "##333333",
        [`@media (min-width:${mobileScreen.mobileResolutions.medium}px)`]: {
            fontSize: 14,
            lineHeight: "16px",
        },
        [`@media (min-width:${mobileScreen.mobileResolutions.large}px)`]: {
            fontSize: 16,
            lineHeight: "19px",
        },
    },
    productSku: {
        color: "gray",
        fontSize: "13px",
        lineHeight: "16px",
        paddingLeft: 7,
    },
    button: {
        margin: 0,
        padding: "7px",
    },
    loaderPostId: {
        top: "5px",
        right: 0,
        position: "relative",
    },
}));