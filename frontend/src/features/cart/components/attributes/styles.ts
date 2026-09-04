import { makeStyles } from "@material-ui/core/styles";

export const AttributeStyle = makeStyles(() => {
    return {
        root: {
            marginBottom: 20,
            "&:last-child": {
                marginBottom: 30,
            }
        },
        formControl: {
            minWidth: 120,
        }
    }
});