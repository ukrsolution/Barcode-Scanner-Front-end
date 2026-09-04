import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../../store/posts/actions";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import { Selectors } from "../../../../store/search/selectors";
import Quantity from "./Quantity";
import Price from "./Price";
import { PostManagementStyle } from "./styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import MetaField from "./MetaField";
import usePluginParams from "../../../../hooks/usePluginParams";
import QuestionIcon from "../../../../components/icons/Question";
import CustomPrice from "./CustomPrice";
import { text } from "../../../../helpers/languages";
// import { locationProps } from "../../../search/components/stockLocations/StockLocations";

export interface PostManagementProps {
  post: any;
  activeAction: string;
}

const PostManagement: React.FC<PostManagementProps> = ({ post, activeAction }: PostManagementProps) => {
  const dispatch = useDispatch();
  const classes = PostManagementStyle();
  const pluginData = usePluginParams();

  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  const searchLoaderStatus = useSelector(Selectors.getLoaderStatus);
  const focusOn = useSelector(Selectors.getFocusOn);

  // const activeLocation: locationProps = useSelector(postsSelectors.getStockLocation);

  const [isQtyMore, setIsQtyMore] = useState(false);

  const updateMessages: any = {
    DEFAULT: "Updating...",
    QUANTITY: "Updating product quantity",
    REGULAR_PRICE: "Updating product regular price",
    SALE_PRICE: "Updating product sale price",
    STOCK_STATUS: "Updating product stock status",
  };
  const [updatingMessage, setUpdatingMessage] = useState<string>(updateMessages.DEFAULT);

  const handleQuantity = (quantity: any) => {
    setUpdatingMessage(updateMessages.QUANTITY);

    if (post.product_manage_stock === "parent" && post.post_parent)
      dispatch(postsActions.actions.updateProductQuantity({ productId: post.post_parent, quantity, products: post.translationProductsIds }));
    else dispatch(postsActions.actions.updateProductQuantity({ productId: post.ID, quantity, products: post.translationProductsIds }));
  };

  const handleQuantityPlus = () => {
    setUpdatingMessage(updateMessages.QUANTITY);

    if (post.product_manage_stock === "parent" && post.post_parent)
      dispatch(postsActions.actions.updateProductQuantityPlus({ productId: post.post_parent, products: post.translationProductsIds }));
    else dispatch(postsActions.actions.updateProductQuantityPlus({ productId: post.ID, products: post.translationProductsIds }));
  };

  const handleQuantityMinus = () => {
    setUpdatingMessage(updateMessages.QUANTITY);
    if (post.product_manage_stock === "parent" && post.post_parent)
      dispatch(postsActions.actions.updateProductQuantityMinus({ productId: post.post_parent, products: post.translationProductsIds }));
    else dispatch(postsActions.actions.updateProductQuantityMinus({ productId: post.ID, products: post.translationProductsIds }));
  };

  const handleRegularPrice = (price: number) => {
    setUpdatingMessage(updateMessages.REGULAR_PRICE);
    dispatch(postsActions.actions.updateProductRegularPrice({ productId: post.ID, price: price || 0, products: post.translationProductsIds }));
  };

  const handleCustomPrice = (field: string, price: number) => {
    dispatch(postsActions.actions.updateProductCustomPrice({ productId: post.ID, field, price: price || 0, products: post.translationProductsIds }));
  };

  const handleSalePrice = (price: number) => {
    setUpdatingMessage(updateMessages.SALE_PRICE);
    dispatch(postsActions.actions.updateProductSalePrice({ productId: post.ID, price: price || 0, products: post.translationProductsIds }));
  };

  const handleManageStock = () => {
    setUpdatingMessage(updateMessages.DEFAULT);
    dispatch(postsActions.actions.enableProductManageStock({ productId: post.ID, products: post.translationProductsIds }));
  };

  const handleMetaFieldChange = (key: string, value: any) => {
    dispatch(postsActions.actions.updateProductMeta({ productId: post.ID, key, value, products: post.translationProductsIds }));
  };

  const handleQtyMore = () => {
    setIsQtyMore(true);
  };

  const handleClickOutside = (event: any) => {
    if (!event.target.closest("[data-tooltip]")) setIsQtyMore(false);
  };

  const handleClickBlockedBox = () => {
    dispatch(postsActions.actions.saveActiveField({ field: focusOn }));
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside, false);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [dispatch]);

  if (!post.ID) return <></>;

  return (
    <div>
      <div style={{ position: "relative", padding: "0 6px" }}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className={classes.grid} style={{ position: "relative", marginTop: 11 }}>
              {/* regular price */}
              {pluginData.settings?.prices?.show_regular_price === "off" ? null : (
                <>
                  <div style={{ position: "relative", zIndex: focusOn === searchActions.focusTypes.REGULAR_PRICE ? 100 : "auto" }}>
                    <Price
                      onChange={handleRegularPrice}
                      label={text("regular_price")}
                      defaultValue={post.product_regular_price}
                      disabled={post.product_type === "variable"}
                    />
                    {post.product_type === "variable" ? (
                      <Tooltip title={<span style={{ fontSize: "12px" }}>{text("price_is_not_editable")}</span>} placement="right" arrow>
                        <span className={classes.priceInfo} style={{ top: 27 }}>
                          <QuestionIcon />
                        </span>
                      </Tooltip>
                    ) : null}
                  </div>
                </>
              )}

              {/* currency */}
              {pluginData.settings?.prices?.show_regular_price !== "off" ? (
                <div style={{ color: "#4F4F4F", fontSize: "14px", textAlign: "center", paddingLeft: 60, paddingTop: 0, paddingBottom: 1 }}>
                  {pluginData.currencyLabel}({pluginData.currencySymbol})
                </div>
              ) : null}

              {/* sale price */}
              {pluginData.settings?.prices?.show_sale_price === "off" ? null : (
                <div style={{ position: "relative", zIndex: focusOn === searchActions.focusTypes.SALE_PRICE ? 100 : "auto" }}>
                  <Price
                    onChange={handleSalePrice}
                    label="Sale price"
                    defaultValue={post.product_sale_price}
                    maxValue={post.product_regular_price}
                    disabled={post.product_type === "variable"}
                  />
                  {post.product_type === "variable" ? (
                    <Tooltip title={<span style={{ fontSize: "12px" }}>{text("price_is_not_editable")}</span>} placement="right" arrow>
                      <span className={classes.priceInfo} style={{ top: 17 }}>
                        <QuestionIcon />
                      </span>
                    </Tooltip>
                  ) : null}
                </div>
              )}

              {/* currency */}
              {pluginData.settings?.prices?.show_sale_price !== "off" &&
                pluginData.settings?.prices?.show_regular_price === "off" &&
                pluginData.settings?.prices?.show_other_price === "off" ? (
                <div style={{ color: "#4F4F4F", fontSize: "14px", textAlign: "center", paddingLeft: 60, paddingTop: 0, paddingBottom: 1 }}>
                  {pluginData.currencyLabel}({pluginData.currencySymbol})
                </div>
              ) : null}

              {/* custom prices */}
              {pluginData.settings?.prices?.show_other_price === "on" ? (
                <>
                  {/* currency */}
                  {pluginData.settings?.prices?.show_sale_price !== "off" ? (
                    <div style={{ color: "#4F4F4F", fontSize: "14px", textAlign: "center", paddingLeft: 60, paddingTop: 0, paddingBottom: 1 }}>
                      {pluginData.currencyLabel}({pluginData.currencySymbol})
                    </div>
                  ) : null}

                  <div style={{ position: "relative", zIndex: focusOn.search(searchActions.focusTypes.CUSTOM_PRICE) !== -1 ? 100 : "auto" }}>
                    <CustomPrice
                      onChange={handleCustomPrice}
                      label={pluginData.settings?.prices?.other_price_label ?? "Price"}
                      field={pluginData.settings?.prices?.other_price_field ?? "_other_price_field"}
                      defaultValue={post[pluginData.settings?.prices?.other_price_field ?? "_other_price_field"]}
                    />
                  </div>

                  {/* currency */}
                  {pluginData.settings?.prices?.show_regular_price === "off" && pluginData.settings?.prices?.show_sale_price === "off" ? (
                    <div style={{ color: "#4F4F4F", fontSize: "14px", textAlign: "center", paddingLeft: 60, paddingTop: 0, paddingBottom: 1 }}>
                      {pluginData.currencyLabel}({pluginData.currencySymbol})
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={6} style={{ position: "relative" }}>
            <div style={{ zIndex: focusOn === `meta-SKU` ? 100 : "auto", position: "relative", paddingTop: 20 }}>
              {/* Sku */}
              <MetaField onChange={handleMetaFieldChange} label="SKU" defaultValue={post.product_sku} fieldKey="_sku" disabled={false} />
            </div>
            <div style={{ zIndex: focusOn === searchActions.focusTypes.QUANTITY ? 100 : "auto", position: "relative" }}>
              {/* Quantity */}
              <Quantity post={post} onChange={handleQuantity} onPlus={handleQuantityPlus} onMinus={handleQuantityMinus} activeAction={activeAction} />
              {/* alert for enabling manage stock */}
              {!post.product_manage_stock && post.product_type === "external" ? (
                <div className={classes.alert}>{text("qty_not_available")}</div>
              ) : !post.product_manage_stock ? (
                <div className={classes.alert}>
                  {text("stock_disabled")},{" "}
                  <span className={classes.alertButton} onClick={handleManageStock}>
                    {text("enable")}
                  </span>
                </div>
              ) : null}
              {/* alert if variation uses parent manage stock */}
              {post.product_manage_stock === "parent" ? (
                <div className={classes.alert}>
                  {text("parent_quantity")},{" "}
                  <span className={classes.alertButton} onClick={handleQtyMore}>
                    {text("more")}
                  </span>
                  {isQtyMore ? (
                    <span className={classes.alertTooltip} data-tooltip="1">
                      {text("variation_use_parent_1")} &quot;{text("manage_stock")}&quot; {text("variation_use_parent_2")}{" "}
                      <a className={classes.alertButton} href={post.postEditUrl} target="_blank" rel="noreferrer">
                        {text("product_page")}
                      </a>
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>
            {/* delimiter */}
            <div className={classes.delimiter}></div>
          </Grid>
        </Grid>
        {!post.ID || searchLoaderStatus ? <div className={classes.manageBlockedBox} onClick={handleClickBlockedBox}></div> : null}
      </div>
      {[
        searchActions.focusTypes.QUANTITY,
        searchActions.focusTypes.REGULAR_PRICE,
        searchActions.focusTypes.SALE_PRICE,
        searchActions.focusTypes.PROD_TITLE,
      ].includes(focusOn) ||
        focusOn.search("meta-") !== -1 ||
        focusOn.search("usbs_stock_location_level_") !== -1 ||
        focusOn.search("_pp_location_") !== -1 ||
        focusOn.search(searchActions.focusTypes.CUSTOM_PRICE) !== -1 ||
        quantityLoaderStatus ||
        loaderStatus ? (
        <div className={classes.manageBlockedBox} onClick={handleClickBlockedBox}>
          {loaderStatus || quantityLoaderStatus ? <CircularProgress size={24} color="inherit" title={updatingMessage} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default memo(PostManagement);
