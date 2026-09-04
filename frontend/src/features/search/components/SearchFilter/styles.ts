import { makeStyles, Theme } from "@material-ui/core/styles";

export const SearchFilterStyle = makeStyles((theme: Theme) => ({
    filter: {
        position: "absolute",
        zIndex: 20,
        border: "1px solid #e0e0e0",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 3px 8px -1px #3c3c3c",
        top: -70,
        right: 10,
        width: 503,
        minHeight: 350,
    },
    filterList: {
        padding: "0",
        margin: "10px 15px",
        listStyleType: "none",
        width: "50%"
    },
    listLabel: {
        fontSize: "16px",
        paddingBottom: 5
    },
    close: {
        position: "absolute",
        right: "5px",
        top: "5px",
        cursor: "pointer",
    },
    textField: {
        width: 151,
        "& input": {
            padding: "4px 8px",
            minHeight: "initial",
            height: "23px",
        },
        "& label": {
            background: "white",
            padding: "0 5px",
        },
        "& .MuiInputLabel-outlined": {},
    },
    checkbox: {
        padding: "5px 7px 5px 10px !important"
    },
    chLabel: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "160px"
    },
}));