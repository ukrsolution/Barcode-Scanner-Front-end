import { makeStyles } from "@material-ui/core/styles";

export const SearchResultsStyle = makeStyles(() => ({
    root: {
        position: "absolute",
        background: "#fff",
        padding: 0,
        margin: "0 10px",
        top: 73,
        left: 0,
        boxShadow: "0 5px 9px 0px #989898",
        width: "calc(100% - 20px)" as any,
        boxSizing: "border-box",
        zIndex: 100,
        maxHeight: "350px",
        overflowY: "auto",
    },
    productName: {
        padding: "0 5px 0 0 ",
        // maxWidth: "80%",
        display: "inline-block"
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