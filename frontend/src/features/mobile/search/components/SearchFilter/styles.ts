import { makeStyles, Theme } from "@material-ui/core/styles";

export const SearchFilterStyle = makeStyles((theme: Theme) => ({
    filter: {
        position: "absolute",
        zIndex: 20,
        border: "1px solid #e0e0e0",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        boxShadow: "0px 3px 8px -1px #3c3c3c",
        top: 28,
        right: 0,
        width: 420,
    },
    filterList: {
        padding: "0",
        margin: "10px 20px",
        listStyleType: "none",
    },
    listLabel: {
        fontSize: "16px",
    },
    close: {
        position: "absolute",
        right: "5px",
        top: "5px",
        cursor: "pointer",
    },
    textField: {
        "& input": {
            padding: "4px 8px",
            minHeight: "initial",
            height: "28px",
        },
        "& label": {
            background: "white",
            padding: "0 5px",
        },
        "& .MuiInputLabel-outlined": {},
    },
}));