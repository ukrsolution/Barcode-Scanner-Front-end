import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as orderSelectors from "../../../store/order/selectors";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import * as settingsSelectors from "../../../store/settings/selectors";
import * as orderActions from "../../../store/order/actions";
import * as usersActions from "../../../store/users/actions";
import { CartContainerStyle } from "../../cart/containers/styles";
import ItemsLists from "../components/itemsLists/ItemsLists";
import Total from "../components/Total";
import OrderStatus from "../components/OrderStatus";
import Search from "../../search";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import OrderUser from "../components/OrderUser";
import OrderNote from "../components/OrderNote";
import Header from "../components/Header";
import Details from "../components/Details";
import OrderUsersList from "../components/OrderUsersList";
import OrderUserCreate from "../components/OrderUserCreate";
import { parseUpdated } from "../../../helpers/date";

const OrdersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = CartContainerStyle();

  const sUpdated = parseUpdated(useSelector(settingsSelectors.getUpdated));
  const loaderStatus = useSelector(orderSelectors.getLoaderStatus);
  // const searchLoaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const orderManagement: any = useSelector(postsSelectors.getOrderManagement);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const activeTab: number = useSelector(settingsSelectors.getActiveModalTab);

  const [prevInputType, setPrevInputType] = useState(inputType);
  const [user, setUser] = useState<any>({});

  const emptyOrder: any = {
    product_manage_stock: true,
    post_title: "Product name",
    product_quantity: 0,
    product_regular_price: 0,
    product_sale_price: 0,
  };

  const handleChangeStatus = useCallback(
    (orderId: number, status: string) => {
      dispatch(orderActions.changeStatus(orderId, status));
    },
    [dispatch]
  );

  const handleUserChange = (user: any) => {
    if (!sUpdated.status) return;
    setUser(user);
    dispatch(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
  };

  useEffect(() => {
    if (prevInputType !== inputType) {
      dispatch(postsActions.actions.updatePostManagement({ post: {} }));
      dispatch(postsActions.actions.updateOrderManagement({ order: {} }));
      setPrevInputType(inputType);
    }

    dispatch(searchActions.actions.autofill({ query: "" }));

    if (activeTab !== 1) {
      dispatch(searchActions.actions.updateMessage({
        place: postsActions.buttonActions.MANAGEMENT_ORDER,
        message: "",
        type: searchActions.messageTypes.GENERAL,
        query: "",
        params: {}
      }));
    }
  }, [dispatch, inputType]);

  useEffect(() => {
    setUser({
      ID: orderManagement.user?.ID,
      user_nicename: orderManagement.user?.user_nicename,
      display_name: orderManagement.user?.display_name,
    });
  }, [dispatch, orderManagement]);

  return (
    <div className="barcode-scanner-cart">
      <Search activeAction={postsActions.buttonActions.MANAGEMENT_ORDER} />
      <Header post={orderManagement.ID ? orderManagement : emptyOrder} />
      <div style={{ position: "relative" }}>
        {orderManagement.ID ? <Details order={orderManagement} /> : null}
        {orderManagement.ID ? <ItemsLists order={orderManagement} /> : null}

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} style={{ alignSelf: "start", paddingTop: 0, display: orderManagement.products ? "initial" : "none" }}>
           
          </Grid>
          <Grid item xs={6}>
            {/* details */}
            <Total order={orderManagement.ID ? orderManagement : emptyOrder} orderCustomPrice={orderManagement.order_total /*orderCustomPrice*/} />
          </Grid>
        </Grid>
        {/* preloader */}
        {loaderStatus ? <div className={classes.blockedBox}></div> : null}
      </div>
      {loaderStatus ? (
        <div className={classes.blockedBox}>{loaderStatus ? <CircularProgress size={24} color="inherit" title="Updating..." /> : null}</div>
      ) : null}
    </div>
  );
};

export default memo(OrdersContainer);
