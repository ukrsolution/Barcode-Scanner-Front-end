import { makeStyles } from "@material-ui/core/styles";

export const ButtonStyle = makeStyles(() => {
    return {
        button: {
            color: "black",
            padding: 5,
            "& svg": {
                fontSize: "33px"
            }
        },
    }
});