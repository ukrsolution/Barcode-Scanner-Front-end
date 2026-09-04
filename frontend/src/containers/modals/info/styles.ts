import { makeStyles, Theme } from "@material-ui/core/styles";

export const InfoModalStyle = makeStyles((theme: Theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999999 !important" as any
    },
    modalMobile: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: "999999 !important" as any,
        "& .MuiBackdrop-root": {
            backgroundColor: "white !important"
        }
    },
    paper: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "none",
        outline: "none",
        boxShadow: theme.shadows[5],
        padding: "16px 24px 18px",
    },
    close: {
        float: "right",
        cursor: "pointer",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1
    },
    body: {
        paddingRight: 20,
        '& a': {
            color: "#2b70b0",
            textDecoration: "underline"
        },
        '& ul': {
            padding: "0 0 0 20px",
            margin: "10px 0 0",
            lineHeight: "24px",
            listStyleType: "decimal"
        }
    },
}));