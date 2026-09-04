import { makeStyles } from "@material-ui/core/styles";

export const InventoryContainerStyle = makeStyles(() => {
    return {
        freeActionsMessage: {
            width: 535,
            fontSize: "16px",
            padding: "20px 0 9px",
            textAlign: "center",
            "& a": {
                color: "#1976D2",
                textDecoration: "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }
        },
    }
});