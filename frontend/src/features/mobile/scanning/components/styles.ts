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
        buttonActive: {
            color: "black",
            padding: 5,
            "& svg": {
                fontSize: "33px"
            },
            animation: "$blink-animation 1s steps(20, start) infinite"
        },
        "@keyframes blink-animation": {
            "0%": {
                color: "black"
            },
            "33%": {
                color: "#2067F0"
            },
            "66%": {
                color: "#2067F0"
            },
            "100%": {
                color: "black"
            }
        }
    }
});