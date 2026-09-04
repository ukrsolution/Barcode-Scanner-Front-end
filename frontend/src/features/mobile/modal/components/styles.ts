import { makeStyles, Theme } from "@material-ui/core/styles";

export const MobModalStyle = makeStyles((theme: Theme) => {
    return {
        root: {
            position: 'absolute',
            width: "100%",
            maxWidth: "90%",
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #444',
            boxShadow: theme.shadows[5],
            padding: "5px 20px 20px",
            boxSizing: "border-box",
        },
        title: {
            fontSize: "16px"
        },
        body: {
            fontSize: "14px"
        },
        close: {
            position: "absolute",
            right: 0,
            top: 0,
            padding: "5px 10px 0 0",
            cursor: "pointer",
            display: "inline-block",
            fontSize: "21px",
            opacity: 0.3,
            "&:hover": {
                opacity: 1
            },
        }
    }
});