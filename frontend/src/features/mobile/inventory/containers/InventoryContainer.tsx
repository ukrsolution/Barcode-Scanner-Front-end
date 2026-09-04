import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostManagement from "../components/postManagement/PostManagement";
import Search from "../../../mobile/search";
import * as searchActions from "../../../../store/search/actions";
import * as postsActions from "../../../../store/posts/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import { InventoryContainerStyle } from "./styles";
import Quantity from "../components/postManagement/Quantity";
import { MobileCommandProps } from "../../scanning/containers/ScanningContainer";
import * as mobileCommandsActions from "../../../../store/mobile/commands/actions";
import { getInfoBlockApp, getIsBlockApp } from "../../../../store/settings/selectors";
import { CircularProgress } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as searchModels from "../../../../store/search/models";
import MetaField from "../components/postManagement/MetaField";

const InventoryContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = InventoryContainerStyle();

  const postToManagement: any = useSelector(postsSelectors.getPostToManagement);
  const postAutoAction = useSelector(postsSelectors.getPostAutoAction);
  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const postLoaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const focusOn = useSelector(searchSelectors.getFocusOn);

  const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  const quantityRequestCounter = useSelector(postsSelectors.getQuantityRequestCounter);

  const getMessage = useMemo(
    () => searchSelectors.makeGetMessage(postsActions.buttonActions.MANAGEMENT_INVENTORY),
    [postsActions.buttonActions.MANAGEMENT_INVENTORY]
  );
  const resultMessage: searchModels.ResultMessage = useSelector(getMessage) as any;

  // const requestError = useSelector(postsSelectors.getRequestError);

  const isBlockApp = useSelector(getIsBlockApp);
  const infoBlockApp = useSelector(getInfoBlockApp);

  // const updated = parseUpdated(useSelector(getUpdated));

  const emptyProduct: any = {
    product_manage_stock: true,
    post_title: "Product name",
    product_quantity: 0,
    product_regular_price: 0,
    product_sale_price: 0,
  };

  const updateMessages: any = {
    DEFAULT: "Updating...",
    QUANTITY: "Updating product quantity",
    REGULAR_PRICE: "Updating product regular price",
    SALE_PRICE: "Updating product sale price",
    STOCK_STATUS: "Updating product stock status",
  };
  const [updatingMessage, setUpdatingMessage] = useState<string>(updateMessages.DEFAULT);
  const [postTitle, setPostTitle] = useState<string>(postToManagement.post_title);

  const handleQuantity = (quantity: any) => {
    setUpdatingMessage(updateMessages.QUANTITY);
    // dispatch(postsActions.updateProductQuantity(postToManagement.ID, quantity, postToManagement.translationProductsIds));
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: postToManagement.ID, field: "quantity", value: quantity }));
  };

  const handleQuantityPlus = () => {
    setUpdatingMessage(updateMessages.QUANTITY);
    dispatch(postsActions.actions.updateProductQuantityPlus({ productId: postToManagement.ID, products: postToManagement.translationProductsIds }));
  };

  const handleQuantityMinus = () => {
    setUpdatingMessage(updateMessages.QUANTITY);
    dispatch(postsActions.actions.updateProductQuantityMinus({ productId: postToManagement.ID, products: postToManagement.translationProductsIds }));
  };

  const handleSave = () => {
    dispatch(postsActions.actions.managementInventoryApplyChanges());
  };

  const handleClose = () => {
    const data: MobileCommandProps = {
      message: "mobile.postMessage",
      method: mobileCommandsActions.commands.CMD_BOTTOM_DRAWER_CLOSE,
      options: {},
    };
    window.parent.postMessage(data, "*");
  };

  const handlePostTitle = (e: any) => {
    setPostTitle(e.target.value);
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: postToManagement.ID, field: "postTitle", value: e.target.value }));
  };

  const handleMetaFieldChange = (key: string, value: any) => {
    // dispatch(postsActions.updateProductMeta(postToManagement.ID, key, value, postToManagement.translationProductsIds));
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: postToManagement.ID, field: key, value }));
  };

  // const handleDescription = useCallback(() => {
  //   console.log(postToManagement)
  //   dispatch(
  //     mobileModalActions.mobModalUpdate({
  //       isOpen: true,
  //       type: "info",
  //       title: postToManagement.post_title,
  //       description: postToManagement.product_desc,
  //     })
  //   );
  // }, [dispatch, postToManagement]);

  useEffect(() => {
    setPostTitle(postToManagement.post_title);
  }, [dispatch, postToManagement]);

  return (
    <div className="barcode-scanner-modal" style={{ display: "flex", flexDirection: "column" /*height: "100%"*/ }}>
      {/* mobile webview - top padding */}
      {/* <div style={{ height: 15 }}></div> */}

      {isBlockApp && !loaderStatus && !postLoaderStatus ? (
        <div style={{ padding: "0 20px 30px ", textAlign: "center" }}>
          This app ({infoBlockApp.appVersion}) is not compatible with plugin version ({infoBlockApp.pluginVersion}), please update the app or plugin.
        </div>
      ) : (
        <>
          <div>
            <Search activeAction={postsActions.buttonActions.MANAGEMENT_INVENTORY} />

            {/* {requestError ? (
              <div style={{ padding: "10px 0" }}>
                {requestError === "ECONNABORTED" ? (
                  <>
                    1. No connection to the website,{" "}
                    <span onClick={handleClose} style={{ color: "#2067F0", textAlign: "center" }}>
                      please try again.
                    </span>
                  </>
                ) : (
                  requestError
                )}
              </div>
            ) : null} */}

            {postToManagement.ID ? (
              <div className={classes.postTitle}>
                {postToManagement.newProduct ? (
                  <>
                    <div style={{ height: 10 }}></div>
                    <TextField
                      label="Name"
                      multiline
                      rows={2}
                      value={postTitle}
                      variant="outlined"
                      className={classes.postTitleField}
                      onChange={handlePostTitle}
                    />
                  </>
                ) : postToManagement.post_type === "product_variation" ? (
                  <>
                    {/* <a href={updated.status ? postToManagement.postEditUrl : "#"} rel="noreferrer" target="_blank" className={classes.postId}>
                      #{postToManagement.variation_id}
                    </a>{" "} */}
                    #{postToManagement.variation_id} {postToManagement.post_title} (variation)
                  </>
                ) : (
                  <>
                    {/* <a href={updated.status ? postToManagement.postEditUrl : "#"} rel="noreferrer" target="_blank" className={classes.postId}>
                      #{postToManagement.ID}
                    </a>{" "} */}
                    #{postToManagement.ID} {postToManagement.post_title}
                  </>
                )}
              </div>
            ) : null}
            {postToManagement.ID ? (
              <div className={classes.postManagementWrapper}>
                <div className={classes.imageContainerWrapper}>
                  {postToManagement.product_thumbnail_url ? (
                    <div className={classes.imageContainer}>
                      <img src={postToManagement.product_thumbnail_url} className={classes.image} />
                    </div>
                  ) : (
                    <div className={classes.imageContainer} style={{ backgroundColor: "#F2F2F2" }}>
                      <ImageIcon />
                    </div>
                  )}
                  {/* <a href={updated.status ? postToManagement.postEditUrl : "#"} rel="noreferrer" target="_blank" className={classes.button}>
                Open in browser
              </a> */}
                </div>
                <PostManagement post={postToManagement.ID ? postToManagement : emptyProduct} activeAction={postAutoAction} />
              </div>
            ) : null}
            {postToManagement.ID ? (
              <>
                <div style={{ zIndex: focusOn === `meta-SKU` ? 100 : "auto", position: "relative", paddingBottom: 16 }}>
                  {/* Sku */}
                  <MetaField
                    onChange={handleMetaFieldChange}
                    label="SKU"
                    defaultValue={postToManagement.product_sku}
                    fieldKey="_sku"
                    postUpdated={postToManagement.updated}
                    disabled={false}
                  />
                </div>
                <div style={{ zIndex: focusOn === searchActions.focusTypes.QUANTITY ? 100 : "auto", position: "relative" }}>
                  {/* Quantity */}
                  <Quantity
                    post={postToManagement}
                    onChange={handleQuantity}
                    onPlus={handleQuantityPlus}
                    onMinus={handleQuantityMinus}
                    activeAction={postAutoAction}
                  />
                </div>
              </>
            ) : null}
          </div>

          <div>
            {postToManagement.ID ? (
              <div style={{ display: "flex", justifyContent: "space-between", whiteSpace: "nowrap" }}>
                <Button onClick={handleSave} variant="contained" disableElevation className={classes.panelButton}>
                  Save
                </Button>
                <Button onClick={handleClose} variant="contained" disableElevation className={classes.panelButtonCancel}>
                  Close
                </Button>
              </div>
            ) : null}

            {/* mobile webview - bottom padding */}
            <div style={{ height: resultMessage.message || postToManagement.ID ? 30 : 5 }}></div>
          </div>
        </>
      )}

      {/* preloader */}
      {loaderStatus || postLoaderStatus || quantityLoaderStatus || quantityRequestCounter > 0 ? (
        <div className={classes.manageBlockedBox}>
          {loaderStatus || postLoaderStatus || quantityLoaderStatus ? <CircularProgress size={24} color="inherit" title={updatingMessage} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default memo(InventoryContainer);
