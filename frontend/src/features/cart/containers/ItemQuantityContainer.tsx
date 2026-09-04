import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../store/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as cartSelectors } from "../store/selectors";
import { ItemQuantityContainerStyle } from "./styles";
import { text } from "../../../helpers/languages";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";

const ItemQuantityContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = ItemQuantityContainerStyle();

  const item: any = useSelector(cartSelectors.getUpdateQtyItem);

  const currQty = parseInt(item.product_quantity ?? 0);
  const defQty = item.updateQtyData ? item.updateQtyData.newQty : currQty >= 0 ? currQty + 1 : 1;
  const [qty, setQty] = useState(defQty);

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.CART_ITEM_UPDATE_QTY }));
  };

  const handleCancel = () => {
    dispatch(cartActions.actions.updateQty({ item: {} }));
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply();
  };

  const handleApply = () => {
    if (item.updateQtyData?.action === "updateQuantity") {
      dispatch(cartActions.actions.updateItemQuantity({ quantity: qty, itemIndex: item.updateQtyData.itemIndex, productQty: true }));
    } else {
      dispatch(cartActions.actions.addItemQty({ query: item.ID, qty }));
    }
  };

  const handleChange = (event: any) => {
    setQty(event.target.value);
  };

  useEffect(() => {
    if (item.ID && qty != defQty) setQty(defQty);
  }, [item]);

  if (!item.ID) return <></>;

  return (
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "100%" }}>
        <Grid item xs={9}>
          <div className={classes.productName} style={{ fontWeight: "bold" }}>{text("fill_cant_add_item")}</div>
          <div>
            <a href={item.postEditUrl} target={"_blank"} rel="noreferrer" className={classes.link}>
              #{item.post_type === "product_variation" ? item.variation_id : item.ID}
            </a>
            {item.post_type === "product_variation"
              ? ` ${item.post_title} (variation)`
              : ` ${item.post_title}`}
          </div>
        </Grid>
        <Grid item xs={9} style={{ textAlign: "center" }}>
          <div style={{ padding: 20 }}>
            {parseInt(item.product_quantity ?? '0') > 0 ?
              <>{text("fill_qty_2")} (Qty = {item.product_quantity ?? '0'})</> :
              <>{text("fill_qty")} (Qty = {item.product_quantity ?? '0'})</>}
            <br />
          </div>
          <div style={{ padding: 0 }}>
            {text("fill_would_u_inc_qty")}
          </div>
          <div style={{ padding: 10, paddingBottom: 20 }}>
            <TextField
              className={classes.input}
              value={qty}
              onChange={handleChange}
              onMouseDown={handleFocus}
              onKeyDown={handleKeyDown}
              type="number"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.actions}>
          <Button variant="contained" color="default" disableElevation onClick={handleCancel}>
            {text("cancel_attributes")}
          </Button>
          <Button variant="contained" color="primary" disableElevation onClick={handleApply}>
            {text("apply_attributes")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(ItemQuantityContainer);
