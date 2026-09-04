import { makeStyles, Theme } from "@material-ui/core/styles";

export const MobileContainerStyle = makeStyles((theme: Theme) => ({
    paper: {
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "none",
        outline: "none",
        padding: "0 24px",
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
                fontWeight: 600,
                letterSpacing: "0.15px"
            }
        }
    },
}));