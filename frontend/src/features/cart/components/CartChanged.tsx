import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../store/search/actions";
import * as cartActions from "../store/actions";
import { Selectors as selectors } from "../store/selectors";
import { text } from "../../../helpers/languages";
import { CartChangedStyle } from "./styles";
import { Button } from "@material-ui/core";

const CartChanged: React.FC = () => {
  const classes = CartChangedStyle();
  const dispatch = useDispatch();

  const cartChangesMsg: string = useSelector(selectors.getCartChangesMsg);

  const handleCartReload = () => {
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    dispatch(cartActions.actions.recalculate());
    // reset reload cart message
    dispatch(cartActions.actions.setCartChangesMsg({ message: "" }));
  };

  if (!cartChangesMsg || cartChangesMsg.length < 1) return <></>;

  return (
    <div className={classes.root} id="usbs_users_list">
      <div className={classes.message}>{cartChangesMsg}</div>
      <div>
        <Button variant="contained" color="primary" disableElevation onClick={handleCartReload}>
          {text("cart_reload")}
        </Button>
      </div>
    </div>
  );
};

export default memo(CartChanged);
