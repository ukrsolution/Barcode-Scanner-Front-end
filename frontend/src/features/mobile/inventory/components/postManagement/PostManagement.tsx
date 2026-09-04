import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../../../store/posts/actions";
import * as searchActions from "../../../../../store/search/actions";
import { Selectors as postsSelectors } from "../../../../../store/posts/selectors";
import { Selectors } from "../../../../../store/search/selectors";
// import Quantity from "./Quantity";
import Price from "./Price";
import { PostManagementStyle } from "./styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomPrice from "./CustomPrice";
import usePluginParams from "../../../../../hooks/usePluginParams";

export interface PostManagementProps {
  post: any;
  activeAction: string;
}

const PostManagement: React.FC<PostManagementProps> = ({ post /*activeAction*/ }: PostManagementProps) => {
  const dispatch = useDispatch();
  const classes = PostManagementStyle();
  const pluginData = usePluginParams();

  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const searchLoaderStatus = useSelector(Selectors.getLoaderStatus);
  const focusOn = useSelector(Selectors.getFocusOn);

  const updateMessages: any = {
    DEFAULT: "Updating...",
    QUANTITY: "Updating product quantity",
    REGULAR_PRICE: "Updating product regular price",
    SALE_PRICE: "Updating product sale price",
    STOCK_STATUS: "Updating product stock status",
  };
  const [updatingMessage, setUpdatingMessage] = useState<string>(updateMessages.DEFAULT);

  const handleRegularPrice = (price: number) => {
    setUpdatingMessage(updateMessages.REGULAR_PRICE);
    // dispatch(postsActions.actions.updateProductRegularPrice({ productId: post.ID, price: price || 0, products: post.translationProductsIds }));
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: post.ID, field: "regularPrice", value: price || 0 }));
  };

  const handleSalePrice = (price: number) => {
    setUpdatingMessage(updateMessages.SALE_PRICE);
    // dispatch(postsActions.actions.updateProductSalePrice({ productId: post.ID, price: price || 0, products: post.translationProductsIds }));
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: post.ID, field: "salePrice", value: price || 0 }));
  };

  const handleCustomPrice = (field: string, price: number) => {
    // dispatch(postsActions.actions.updateProductCustomPrice({ productId: post.ID, field, price: price || 0, products: post.translationProductsIds }));
    dispatch(postsActions.actions.managementInventorySetChanges({ postId: post.ID, field, value: price || 0 }));
  };

  if (!post.ID) return <></>;

  return (
    <div>
      <div style={{ position: "relative" }}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={classes.grid} style={{ position: "relative" }}>
              {/* regular price */}
              {pluginData.settings?.prices?.show_regular_price === "off" ? null : (
                <>
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      zIndex: focusOn === searchActions.focusTypes.REGULAR_PRICE ? 100 : "auto",
                    }}
                  >
                    <Price
                      onChange={handleRegularPrice}
                      label="Regular price"
                      defaultValue={post.product_regular_price}
                      disabled={post.product_type === "variable"}
                      postUpdated={post.updated}
                    />
                  </div>
                  <div></div>
                </>
              )}

              {/* sale price */}
              {pluginData.settings?.prices?.show_sale_price === "off" ? null : (
                <>
                  <div
                    style={{ position: "relative", display: "inline-block", zIndex: focusOn === searchActions.focusTypes.SALE_PRICE ? 100 : "auto" }}
                  >
                    <Price
                      onChange={handleSalePrice}
                      label="Sale price"
                      defaultValue={post.product_sale_price}
                      maxValue={post.product_regular_price}
                      disabled={post.product_type === "variable"}
                      postUpdated={post.updated}
                    />
                  </div>
                  <div></div>
                </>
              )}

              {/* custom price */}
              {pluginData.settings?.prices?.show_other_price === "on" ? (
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    zIndex: focusOn.search(searchActions.focusTypes.CUSTOM_PRICE) !== -1 ? 100 : "auto",
                  }}
                >
                  <CustomPrice
                    onChange={handleCustomPrice}
                    label={pluginData.settings?.prices?.other_price_label ?? "Price"}
                    field={pluginData.settings?.prices?.other_price_field ?? "_other_price_field"}
                    defaultValue={post[pluginData.settings?.prices?.other_price_field ?? "_other_price_field"]}
                  />
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>

        {/* preloader */}
        {!post.ID || searchLoaderStatus ? <div className={classes.manageBlockedBox}></div> : null}
      </div>

      {/* preloader */}
      {loaderStatus && false ? (
        <div className={classes.manageBlockedBox}>{loaderStatus ? <CircularProgress size={24} color="inherit" title={updatingMessage} /> : null}</div>
      ) : null}
    </div>
  );
};

export default memo(PostManagement);
