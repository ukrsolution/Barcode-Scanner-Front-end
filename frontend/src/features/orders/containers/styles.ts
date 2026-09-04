import { makeStyles } from "@material-ui/core/styles";

export const OrdersContainerStyle = makeStyles(() => {
    return {
        linearProgressBox: {
            position: "relative",
            top: 5,
            padding: "0px 0 0 110px",
            margin: "0 0 0 0",
            "& span": {
                margin: "0 5px",
                position: "relative",
                top: "-2px",
            }
        },
        linearProgress: {
            height: "2px",
            backgroundColor: "silver",
            "& div:first-child": {
                background: "#424242",
            },
            "& div:last-child": {
                background: "#8c8c8c",
            },
        },
        manageBlockedBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            background: "#fff",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 15,
            opacity: 0.7,
            transition: "0.3s"
        }
    }
});