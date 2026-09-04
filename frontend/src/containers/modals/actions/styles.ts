import { makeStyles, Theme } from "@material-ui/core/styles";

export const ActionsModalStyle = makeStyles((theme: Theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "none",
        outline: "none",
        boxShadow: theme.shadows[5],
        padding: "16px 24px 18px",
        minHeight: 463,
        zIndex: 1000,
        borderRadius: 6
    },
    close: {
        float: "right",
        cursor: "pointer",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1
    },
    features: {
        "& button[role='tab']": {
            minWidth: "170px",
            minHeight: "50px",
            "& span": {
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.15px"
            }
        }
    },
}));