import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Details from "../components/Details";
import Products from "../components/Products";
import Total from "../components/Total";
import Search from "../../search";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import * as postsActions from "../../../store/posts/actions";
import * as orderActions from "../../../store/order/actions";
import { OrdersContainerStyle } from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getActiveModalTab } from "../../../store/settings/selectors";

const OrdersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = OrdersContainerStyle();

  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const searchLoaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const orderManagement = useSelector(postsSelectors.getOrderManagement);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const activeTab: number = useSelector(getActiveModalTab);

  const [prevInputType, setPrevInputType] = useState(inputType);

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

  return (
    <div className="barcode-scanner-modal" style={{ minWidth: 535 }}>
      <Search activeAction={postsActions.buttonActions.MANAGEMENT_ORDER} />
      <Header post={orderManagement.ID ? orderManagement : emptyOrder} />
      <div style={{ position: "relative" }}>
        <Details order={orderManagement.ID ? orderManagement : emptyOrder} />
        <Products order={orderManagement.ID ? orderManagement : emptyOrder} />
        <Total order={orderManagement.ID ? orderManagement : emptyOrder} onStatus={handleChangeStatus} />
        {!orderManagement.ID || searchLoaderStatus ? <div className={classes.manageBlockedBox}></div> : null}
      </div>
      {loaderStatus ? (
        <div className={classes.manageBlockedBox}>{loaderStatus ? <CircularProgress size={24} color="inherit" title="Updating..." /> : null}</div>
      ) : null}
    </div>
  );
};

export default memo(OrdersContainer);
