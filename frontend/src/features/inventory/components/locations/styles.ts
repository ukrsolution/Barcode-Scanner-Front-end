import { makeStyles } from "@material-ui/core/styles";

export const LocationsStyle = makeStyles(() => {
    return {
        button: {
            fontSize: "14px !important",
            lineHeight: "14px !important",
            textAlign: "center",
            margin: 0,
            border: "1px solid #E0E0E0 !important",
            padding: "6px 12px !important",
            borderRadius: "4px",
            color: "#333333 !important",
            backgroundColor: "#F2F2F2 !important",
            height: 26,
            fontWeight: "400 !important" as any,
            textTransform: "capitalize"
        },
        hide: {
            color: "#828282",
            fontSize: "14px",
            lineHeight: "14px",
            cursor: "pointer",
            paddingRight: 10
        },
        label: {
            fontSize: "14px",
            lineHeight: "16.4px",
            color: "#4F4F4F",
            display: "flex",
            alignItems: "center",
            "& > span": {
                width: "initial",
                maxWidth: 106
            }
        },
        input: {
            margin: "0 24px 0 8px !important",
            flex: 1,
            outline: "none !important",
            border: "none !important",
            "& fieldset": {
                border: "none !important",
                outline: "none !important"

            },
            "& input": {
                fontSize: "16px",
                lineHeight: "18px",
                padding: "10px 5px 9px",
                // width: 94,
                width: "initial",
                maxWidth: 94,
                minWidth: 68,
                height: 42,
                textAlign: "center",
                boxShadow: "none",
                minHeight: "auto",
                border: "none !important",
                outline: "1px solid #E0E0E0 !important",
                borderRadius: "4px !important" as any,
                color: "#333333 !important",
                userSelect: "auto",
                boxSizing: "border-box"
            },
            "&:focus": {
                outline: "none !important",
            },
        },
        separator: {
            border: "1px solid #F2F2F2",
            height: 0,
            width: "94%",
            margin: "12px auto 0"

        },
        inputActions: {
            boxShadow: "none",
            // width: "fit-content !important",
            width: "80px !important",
            bottom: -40,
            right: 17,
        },
        inputIconButton: {
            margin: 0,
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
    }
});
