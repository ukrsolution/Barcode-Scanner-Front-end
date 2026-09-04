import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as searchActions from "../../../../store/search/actions";
import * as postsActions from "../../../../store/posts/actions";
import * as cartActions from "../../store/actions";
import { getUpdated } from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { QuantityStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";

export interface QuantityProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (quantity: number, itemIndex: number) => void;
  onPlus: () => void;
  onMinus: () => void;
  post: any;
  itemIndex: number;
}

const Quantity: React.FC<QuantityProps> = ({ itemIndex, post, onChange }: QuantityProps) => {
  const classes = QuantityStyle();
  const dispatch = useDispatch();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const loaderStatus = useSelector(Selectors.getLoaderStatus);
  const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  const requestCounter = useSelector(postsSelectors.getQuantityRequestCounter);
  const sUpdated = parseUpdated(useSelector(getUpdated));
  const saveActiveField = useSelector(postsSelectors.getSaveActiveField);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);

  const focusName: string = searchActions.focusTypes.QUANTITY + itemIndex;
  const [quantity, setQuantity] = useState<number>(post.quantity);
  const [updated, setUpdated] = useState<number>(post.updated);
  const [animation, setAnimation] = useState<number>(0);

  const setValue = (value: number) => {
    setQuantity(value);
  };

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: focusName }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply(null, null);
  };

  const handleApply = (e: any, value: number | null = null) => {
    e;
    const qty: number = value !== null ? value : quantity;
    onChange(qty, itemIndex);
  };

  const handleCancel = () => {
    setValue(post.quantity);

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleChangeQuantity = (event: any) => {
    const value: number = parseInt(event.target.value);
    setValue(event.target.value && value ? value : event.target.value);
  };

  useLayoutEffect(() => {
    if (post.updated !== updated) {
      setUpdated(post.updated);
      setQuantity(post.quantity);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
      dispatch(postsActions.actions.updateQuantityError({ error: "" }));
    }

    if (autoFocusStatus || focusOn !== focusName) {
      setQuantity(post.quantity);
    }

    setAnimation(0);
    if (post.updatedAction === "quantity" && animation === 0) {
      dispatch(cartActions.actions.setItemUpdatedAction({ itemIndex, item: { ...post, updatedAction: "" } }));
      setTimeout(() => {
        setAnimation(1);
      }, 0);
    }
  }, [dispatch, autoFocusStatus, updated, post.updated, focusOn]);

  useEffect(() => {
    if (saveActiveField === focusName) {
      // auto save
      dispatch(postsActions.actions.saveActiveField({ field: "" }));
      handleApply(null, null);
    }
  }, [saveActiveField]);

  useEffect(() => {
    if (cancelActiveField === focusName) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      handleCancel();
    }
  }, [cancelActiveField]);

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" direction="row" className={classes.grid}>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <TextField
              className={classes.input}
              value={`${quantity ? parseInt(`${quantity}`) : quantity}`}
              onChange={handleChangeQuantity}
              onMouseDown={handleFocus}
              onKeyDown={handleKeyDown}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled={loaderStatus || !sUpdated.status}
              style={{ zIndex: `${focusOn === focusName ? 20 : "initial"}` as any }}
              data-updated={animation}
            />
            {/* <span style={{ color: "black", fontSize: "16px", position: "relative", top: 1 }}>{quantity}</span> */}
            {focusOn === focusName ? (
              <div style={{ position: "relative" }}>
                <Grid container className={classes.inputActions} justifyContent="center" alignItems="center" direction="row">
                  <Grid item xs>
                    <IconButton
                      onClick={handleApply}
                      disabled={loaderStatus || !sUpdated.status}
                      className={classes.inputIconButtonOk}
                      aria-label="search"
                    >
                      <DoneIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs>
                    <IconButton onClick={handleCancel} disabled={loaderStatus} className={classes.inputIconButton} aria-label="directions">
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ) : null}
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
