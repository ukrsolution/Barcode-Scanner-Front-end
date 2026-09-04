import { makeStyles } from "@material-ui/core/styles";

export const SwitcherStyle = makeStyles(() => {
    return {
        root: {
            textAlign: "right",
            marginTop: 21,
            marginBottom: 14,
            marginRight: 4,
            flexGrow: 2,
        },
        button: {
            fontSize: "14px !important",
            textAlign: "center",
            margin: 0,
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0 !important",
            padding: "5px !important",
            color: "#4F4F4F !important",
            height: 36,
            width: 137,
            fontWeight: "400 !important" as any,
        },
        buttonActive: {
            fontSize: "14px !important",
            textAlign: "center",
            margin: 0,
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0 !important",
            padding: "5px !important",
            height: 36,
            width: 137,
            fontWeight: "400 !important" as any,
            '&[data-value="AUTO_DECREASING"]': {
                color: "#fff !important",
                background: "#EB5757 !important",
            },
            '&[data-value="AUTO_INCREASING"]': {
                color: "#fff !important",
                background: "#27AE60 !important",
            },
            '&[data-value="OPEN"]': {
                background: "#e1e1e1 !important",
            }
        },
    }
});

export const SoundButtonStyle = makeStyles(() => {
    return {
        button: {
            fontSize: "14px !important",
            textAlign: "center",
            margin: "6px 0 0 21px !important",
            textTransform: "initial !important" as any,
            border: "1px solid #E0E0E0",
            padding: "5px !important",
            color: "#4F4F4F !important",
            minWidth: "36px !important",
            height: 36,
            width: 36,
            background: "#F2F2F2 !important"
        }
    }
});

export const HeaderStyle = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#828282",
            height: 100,
            maxWidth: 535
        },
        icon: {
            width: "36px !important",
            height: "36px !important",
            margin: "0 5px"
        },
        image: {
            maxWidth: "100px !important",
            maxHeight: "100px !important",
            margin: "0 5px 0 0"
        },
        copy: {
            display: "inline-block",
            width: 20,
            height: 20,
            paddingBottom: 2,
            cursor: "pointer",
            verticalAlign: "middle",
            "& img": {
                transition: "0.2s",
                display: "none",
            }
        },
        copyAnim: {
            "& img": {
                opacity: 0.5,
            }
        },
        id: {
            color: "#1976D2",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "25px",
            letterSpacing: "0.15px",
            display: "inline-block",
        },
        idWrapper: {
            "&:hover > span > img": {
                display: "inline-block",
            }
        },
        name: {
            color: "#424242",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "25px",
            letterSpacing: "0.15px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: 520,
            maxHeight: 77,
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
        prodTitle: {
            outline: "0px solid transparent"
        },
        inputActions: {
            boxShadow: "none",
            width: "fit-content !important",
            margin: "5px auto",
        },
        inputIconButton: {
            margin: theme.spacing(0),
            padding: "5px !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        inputIconButtonOk: {
            margin: "0 5px 0 0",
            padding: "5px !important",
            color: "#219653 !important",
            background: "#f1f1f1",
            "&:hover": {
                background: "#d6d6d6 !important",
            },
        },
        createBtn: {
            textDecoration: "none",
            position: "absolute",
            bottom: -90,
            right: 30,
            border: "1px solid #E0E0E0 !important",
            color: "#4F4F4F !important",
            margin: 0,
            padding: "7px 24px !important",
            fontSize: "14px !important",
            borderRadius: 4,
            textAlign: "center"
        }
    }
});