import React, { memo, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as searchActions from "../../../../store/search/actions";
import { QuantityStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface QuantityProps {
  post: any;
  itemIndex: number;
}

const Quantity: React.FC<QuantityProps> = ({ itemIndex, post }: QuantityProps) => {
  const classes = QuantityStyle();
  const dispatch = useDispatch();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  const requestCounter = useSelector(postsSelectors.getQuantityRequestCounter);

  const focusName: string = searchActions.focusTypes.QUANTITY + itemIndex;
  const [quantity, setQuantity] = useState<number>(post.quantity);
  const [updated, setUpdated] = useState<number>(post.updated);
  const [animation, setAnimation] = useState<number>(0);

  useLayoutEffect(() => {
    if (post.updated !== updated) {
      setUpdated(post.updated);
      setQuantity(post.quantity);
    }

    if (autoFocusStatus || focusOn !== focusName) {
      setQuantity(post.quantity);
    }

    setAnimation(0);
    if (post.updatedAction === "quantity" && animation === 0) {
      setTimeout(() => {
        setAnimation(1);
      }, 0);
    }
  }, [dispatch, autoFocusStatus, updated, post.updated, focusOn]);

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" direction="row" className={classes.grid}>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <TextField
              className={classes.input}
              value={`${quantity ? parseInt(`${quantity}`) : quantity}`}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled={true}
              style={{ zIndex: `${focusOn === focusName ? 20 : "initial"}` as any }}
              data-updated={animation}
            />
          </Paper>
        </Grid>
      </Grid>
      {quantityLoaderStatus || requestCounter > 0 ? (
        <div style={{ padding: 5, textAlign: "center" }}>
          <CircularProgress size={14} /> <span style={{ position: "relative", top: "-2px", color: "#656565", fontSize: "14px" }}>updating...</span>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Quantity);
