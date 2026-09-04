import { makeStyles } from "@material-ui/core/styles";

export const CustomSearchFiltersStyle = makeStyles(() => ({
    root: {
        padding: "3px 5px 3px 7px",
        position: "relative",
    },
    link: {
        cursor: "pointer",
        color: "#828282",
        fontSize: "12px",
        lineHeight: "16px",
        position: "relative",
    },
    dropdown: {
        position: "absolute",
        border: "1px solid #e0e0e0",
        zIndex: 20,
        boxShadow: "0px 3px 8px -1px #3c3c3c",
        backgroundColor: "#fff",
        borderRadius: 4,
        top: 25,
        left: 7
    },
    ul: {
        padding: 0,
        margin: 0,
        listStyleType: 'none'
    },
    li: {
        padding: "4px 12px",
        cursor: "pointer",
        whiteSpace: 'nowrap',
        "&:hover": {
            backgroundColor: "#ededed"
        },
        "&[data-active='1']": {
            backgroundColor: "#ededed"
        }
    },
}));