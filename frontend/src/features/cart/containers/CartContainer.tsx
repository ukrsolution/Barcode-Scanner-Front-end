import React, { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts/actions";
import * as cartActions from "../store/actions";
import * as searchActions from "../../../store/search/actions";
import * as usersActions from "../../../store/users/actions";
import { Selectors as selectors } from "../store/selectors";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import { CartDetailsProps } from "../store/models";
import ItemAttributesContainer from "./ItemAttributesContainer";
import ItemsLists from "../components/itemsLists/ItemsLists";
import Total from "../components/Total";
import OrderStatus from "../components/OrderStatus";
import Search from "../../search";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CartContainerStyle } from "./styles";
import { parseUpdated } from "../../../helpers/date";
import { getUpdated } from "../../../store/settings/selectors";
import usePluginParams from "../../../hooks/usePluginParams";
import OrderUser from "../components/OrderUser";
import OrderUsersList from "../components/OrderUsersList";
import OrderUserCreate from "../components/OrderUserCreate";
import OrderNote from "../components/OrderNote";
import { text } from "../../../helpers/languages";
import CartChanged from "../components/CartChanged";
import ShippingMethods from "../components/ShippingMethods";
import PaymentMethods from "../components/PaymentMethods";
import ItemQuantityContainer from "./ItemQuantityContainer";

const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = CartContainerStyle();
  const pluginData = usePluginParams();

  // const itemAttributes = useSelector(getItemAttributes);
  const cartItems = useSelector(selectors.getCartItems);
  const cartDetails: CartDetailsProps = useSelector(selectors.getCartDetails);
  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const updateQtyItemLoader = useSelector(selectors.getUpdateQtyItemLoader);
  const focusOn = useSelector(searchSelectors.getFocusOn);
  const availableStatuses = useSelector(selectors.getStatuses);
  const newOrderStatus = useSelector(selectors.getNewOrderStatus);
  const newOrderShipping = useSelector(selectors.getNewOrderShipping);
  const newOrderPayment = useSelector(selectors.getNewOrderPayment);
  const sUpdated = parseUpdated(useSelector(getUpdated));
  const createdOrder = useSelector(selectors.getCreatedOrder);
  // const orderCustomPrice = useSelector(selectors.getOrderCustomPrice);

  const defaultStatuses: any = Object.keys(availableStatuses).length ? availableStatuses : {};
  const [statuses, setStatuses] = useState<any>(defaultStatuses);
  const [user, setUser] = useState<any>({});
  const [note, setNote] = useState<string>("");

  const handleItemPress = useCallback(
    (item: any, action: string) => {
      if (!sUpdated.status) return;

      switch (action) {
        case postsActions.buttonActions.CART_REMOVE_ITEM:
          dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
          dispatch(cartActions.actions.removeItem({ cartKey: item.cart_key }));
          dispatch(cartActions.actions.setCustomItemPrice({ itemId: item.ID, price: undefined, cartKey: item.cart_key ?? "" }));
          break;
      }
    },
    [dispatch]
  );

  const handleQuantity = useCallback(
    (quantity: number, itemIndex: number) => {
      if (!sUpdated.status) return;

      dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
      dispatch(cartActions.actions.updateItemQuantity({ quantity, itemIndex, productQty: false }));
    },
    [dispatch]
  );

  const handleClearCart = () => {
    if (!sUpdated.status) return;

    dispatch(cartActions.actions.clear());
    dispatch(cartActions.actions.clearCustomItemsPrices());
    dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
    dispatch(cartActions.actions.setCustomOrderSubPrice({ price: undefined }));
    dispatch(cartActions.actions.setCustomOrderTax({ price: undefined }));
    dispatch(usersActions.actions.setOrderUser({ userId: 0 }));
  };

  const handleSetOrderData = (isOpen: boolean): void => {
    if (!sUpdated.status) return;

    const userId = user.ID ?? 0;
    // const userId = 0;
    dispatch(cartActions.actions.orderCreate({ isOpen: isOpen, userId, extraData: { note } }));
    dispatch(cartActions.actions.clearCustomItemsPrices());
    dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
    dispatch(cartActions.actions.setCustomOrderSubPrice({ price: undefined }));
    dispatch(cartActions.actions.setCustomOrderTax({ price: undefined }));

    setUser({});
  };

  const handleStatus = (value: string) => {
    if (!sUpdated.status) return;

    dispatch(cartActions.actions.updateNewOrderStatus({ status: value }));
  };

  const handleShipping = (value: string) => {
    if (!sUpdated.status) return;

    dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
    dispatch(cartActions.actions.updateNewOrderShipping({ value, isRecalculate: true }));
  };

  const handlePayment = (value: string) => {
    if (!sUpdated.status) return;

    dispatch(cartActions.actions.updateNewOrderPayment({ value }));
  };

  const handleUserChange = (user: any) => {
    if (!sUpdated.status) return;

    const userId = user.ID ?? 0;

    setUser(user);
    dispatch(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
    dispatch(usersActions.actions.setOrderUser({ userId }));
    dispatch(cartActions.actions.recalculate());
  };

  const handleNoteChange = (value: string) => {
    if (!sUpdated.status) return;
    setNote(value);
  };

  const handleClickBlockedBox = () => {
    dispatch(postsActions.actions.saveActiveField({ field: focusOn }));
  };

  useLayoutEffect(() => {
    dispatch(cartActions.actions.getStatuses());

    dispatch(cartActions.actions.updateNewOrderStatus({ status: "wc-processing" }));

    if (pluginData.settings?.general?.defaultOrderStatus) {
      dispatch(cartActions.actions.updateNewOrderStatus({ status: pluginData.settings.general.defaultOrderStatus }));
    }
  }, [dispatch]);

  useEffect(() => {
    setStatuses(availableStatuses);
  }, [availableStatuses]);

  return (
    <div className="barcode-scanner-cart">
      <Search activeAction={postsActions.buttonActions.CREATE_ORDER} />
      <div style={{ position: "relative" }}>
        {createdOrder && createdOrder.id ? (
          <div className={classes.orderCreated}>
            <img src={pluginData.pluginUrl + "assets/icons/package-box.png"} width={64} height={64} />
            {/* @ts-ignore */}
            <a href={createdOrder.url} target="_blank" rel="noreferrer">
              {text("order")} #{createdOrder.id} {text("created")}
            </a>
          </div>
        ) : (
          <ItemsLists items={cartItems} onPress={handleItemPress} handleQuantity={handleQuantity} />
        )}

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} style={{ alignSelf: "start", paddingTop: 6, display: cartItems.length ? "initial" : "none" }}>
          </Grid>
          <Grid item xs={6}>
            {/* details */}
            <Total
              details={cartDetails}
              items={cartItems}
              onClearCart={handleClearCart}
              orderCustomPrice={cartDetails.cart_total /*orderCustomPrice*/}
              orderCustomSubPrice={undefined /*cartDetails.cart_subtotal */}
              orderCustomTax={undefined /*cartDetails.total_tax */}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: 5, opacity: cartItems.length ? 1 : 0, width: cartItems.length ? "" : 535 }}
        >
          <Grid item xs={6}>
            {/* cancel */}
            <Button variant="outlined" color="default" disableElevation onClick={handleClearCart} disabled={cartItems.length === 0}>
              {text("cancel_order")}
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: "right" }}>
            {/* create */}
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                handleSetOrderData(false);
              }}
              disabled={cartItems.length === 0}
            >
              {text("create")}
            </Button>
          </Grid>
        </Grid>
        {loaderStatus ||
          focusOn.search(searchActions.focusTypes.CART_ITEM_PRICE_PROD) !== -1 ||
          focusOn === searchActions.focusTypes.CART_ORDER_PRICE /*|| (cartItems.length === 0 && !itemAttributes.ID)*/ ||
          focusOn === searchActions.focusTypes.CART_ORDER_SUB_PRICE ||
          focusOn === searchActions.focusTypes.CART_ORDER_TAX ? (
          <div className={classes.blockedBox} onClick={handleClickBlockedBox}>
            {updateQtyItemLoader ? <CircularProgress size={24} color="inherit" title="Updating..." style={{ marginTop: -100 }} /> : null}
          </div>
        ) : null}
      </div>
      <ItemAttributesContainer />
      <ItemQuantityContainer />
      {focusOn.search(searchActions.focusTypes.QUANTITY) !== -1 ? (
        <div className={classes.blockedBox} onClick={handleClickBlockedBox}>
          {loaderStatus ? <CircularProgress size={24} color="inherit" title="Updating..." /> : null}
        </div>
      ) : null}
      {user.isCreateNew === true ? (
        <div className={classes.blockedBox} style={{ zIndex: 1 }} onClick={handleClickBlockedBox}>
          <CircularProgress size={24} color="inherit" title="Updating..." />
        </div>
      ) : null}
      <CartChanged />
    </div>
  );
};

export default memo(CartContainer);
