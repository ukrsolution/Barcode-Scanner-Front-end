import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as searchActions from "../../../../store/search/actions";
import { getUpdated } from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { PriceStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as cartActions from "../../../cart/store/actions";

export interface PriceProductProps {
  // eslint-disable-next-line no-unused-vars
  // onChange: (price: number, itemId: number) => void;
  post: any;
  itemIndex: number;
  currentPrice: number;
}

const PriceProduct: React.FC<PriceProductProps> = ({ itemIndex, post, currentPrice }: PriceProductProps) => {
  const classes = PriceStyle();
  const dispatch = useDispatch();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const loaderStatus = useSelector(Selectors.getLoaderStatus);
  const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  const requestCounter = useSelector(postsSelectors.getQuantityRequestCounter);
  const sUpdated = parseUpdated(useSelector(getUpdated));

  const focusName: string = searchActions.focusTypes.CART_ITEM_PRICE_PROD + itemIndex;
  const [price, setPrice] = useState<number>(currentPrice);
  const [updated, setUpdated] = useState<number>(post.updated);

  const setValue = (value: number) => {
    setPrice(value);
  };

  // const handleFocus = () => {
  //   dispatch(searchActions.autoFocus(false, focusName));
  // };

  // const handleKeyDown = (e: any) => {
  //   if (e.keyCode == 13) handleApply(null, null);
  // };

  const handleApply = (e: any, value: number | null = null) => {
    e;
    const newPrice: number = value !== null ? value : price;
    dispatch(cartActions.actions.setCustomItemPrice({ itemId: post.ID, price: `${newPrice}`, cartKey: post.cart_key ?? "" }));
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    dispatch(cartActions.actions.recalculate());
  };

  const handleCancel = () => {
    setValue(currentPrice);

    dispatch(cartActions.actions.setCustomItemPrice({ itemId: post.ID, price: undefined, cartKey: post.cart_key ?? "" }));
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    dispatch(cartActions.actions.recalculate());
  };

  // const handleChangePrice = (event: any) => {
  //   const value: number = parseFloat(event.target.value);
  //   setValue(event.target.value && value ? value : event.target.value);
  // };

  useLayoutEffect(() => {
    if (post.updated !== updated) {
      setUpdated(post.updated);
      setPrice(currentPrice);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
      // dispatch(postsActions.actions.updateQuantityError({ error: "" }));
    }

    if (autoFocusStatus || focusOn !== focusName) {
      setPrice(currentPrice);
    }
  }, [dispatch, autoFocusStatus, updated, post.updated, focusOn]);

  useEffect(() => {
    if (currentPrice !== price) setPrice(currentPrice);
  }, [currentPrice]);

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" direction="row" className={classes.grid}>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <TextField
              className={classes.input}
              value={`${price ? parseFloat(`${price}`) : price}`}
              // onChange={handleChangePrice}
              // onMouseDown={handleFocus}
              // onKeyDown={handleKeyDown}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled={loaderStatus || !sUpdated.status || true}
              style={{ zIndex: `${focusOn === focusName ? 20 : "initial"}` as any }}
            />
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
                    <IconButton
                      onClick={handleCancel}
                      disabled={loaderStatus}
                      className={classes.inputIconButton}
                      aria-label="directions"
                      title="Click to remove discount"
                    >
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

export default memo(PriceProduct);
