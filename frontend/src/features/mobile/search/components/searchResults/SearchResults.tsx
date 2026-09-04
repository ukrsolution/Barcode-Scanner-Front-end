import React, { memo } from "react";
import { useSelector } from "react-redux";
import * as postsActions from "../../../../../store/posts/actions";
import { Selectors } from "../../../../../store/search/selectors";
import { SearchResultsStyle } from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ImageIcon from "@material-ui/icons/Image";
import * as searchModels from "../../../../../store/search/models";
import usePluginParams from "../../../../../hooks/usePluginParams";
// import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
// import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export interface SearchResultsProps {
  // eslint-disable-next-line no-unused-vars
  onPress(post: any, action: string): void;
  posts: Array<any>;
  previewPressAction: string;
  resultMessage: searchModels.ResultMessage;
}

const SearchResults: React.FC<SearchResultsProps> = ({ posts, onPress, resultMessage }: SearchResultsProps) => {
  const classes = SearchResultsStyle();
  const pluginData = usePluginParams();

  const loaderPostId = useSelector(Selectors.getLoaderPostId);

  return (
    <div className={classes.root}>
      {resultMessage.type && resultMessage.message ? (
        <div className={classes.query}>
          Found {posts.length} item{posts.length > 1 ? "s" : ""} with{" "}
          {resultMessage.message ? resultMessage.message.replaceAll(/&apos;/gi, `'`).replaceAll(/&quot;/gi, `"`) : null}
        </div>
      ) : null}
      <List component="nav" aria-label="secondary mailbox folders" className={classes.list}>
        {posts.map((post: any, i) => (
          <ListItem
            key={i}
            button
            onClick={() => {
              ["product", "product_variation"].includes(post.post_type)
                ? onPress(post, postsActions.buttonActions.MANAGEMENT_INVENTORY)
                : ["shop_order"].includes(post.post_type)
                  ? onPress(post, postsActions.buttonActions.MANAGEMENT_ORDER)
                  : ["product_for_cart"].includes(post.post_type) /* && !["variable"].includes(post.product_type)*/
                    ? onPress(post, postsActions.buttonActions.CREATE_ORDER)
                    : null;
            }}
            className={classes.item}
          >
            <span className={classes.imageBox}>
              {post.product_thumbnail_url ? (
                <img src={post.product_thumbnail_url} className={classes.image} />
              ) : (
                <ImageIcon className={classes.icon} />
              )}
            </span>
            {/* <ListItemText className={classes.productName} primary={`#${post.ID} ${post.post_title}`} /> */}
            <div className={classes.productName}>
              {post.post_type === "product_variation" ? (
                <>
                  #{post.variation_id} {post.post_title} (variation)
                </>
              ) : (
                <>
                  #{post.ID} {post.post_title}
                </>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <div className={classes.productPrice}>
                  {post.product_sale_price ? post.product_sale_price : post.product_regular_price}
                  {pluginData.currencySymbol}
                </div>
                {post.product_manage_stock ? <div className={classes.productQty}>{post.product_quantity || 0} in stock</div> : null}
              </div>
            </div>
            {/* {post.product_sku ? <span className={classes.productSku}>({post.product_sku})</span> : null} */}
            <ListItemSecondaryAction>
              {loaderPostId == post.ID ? <CircularProgress className={classes.loaderPostId} size="18px" color="inherit" /> : null}
              {/* {["product", "product_variation"].includes(post.post_type) ? (
                <IconButton
                  edge="end"
                  className={classes.button}
                  title="Manage"
                  onClick={() => {
                    onPress(post, postsActions.buttonActions.MANAGEMENT_INVENTORY);
                  }}
                  value={post.ID}
                >
                  <EditIcon />
                </IconButton>
              ) : null} */}
              {/* {["shop_order"].includes(post.post_type) ? (
                <IconButton
                  edge="end"
                  className={classes.button}
                  title="Manage"
                  onClick={() => {
                    onPress(post, postsActions.buttonActions.MANAGEMENT_ORDER);
                  }}
                  value={post.ID}
                >
                  <EditIcon />
                </IconButton>
              ) : null} */}
              {/* {["product_for_cart"].includes(post.post_type) && !["variable"].includes(post.product_type) ? (
                <IconButton
                  edge="end"
                  className={classes.button}
                  title="Add to cart"
                  onClick={() => {
                    onPress(post, postsActions.buttonActions.CREATE_ORDER);
                  }}
                  value={post.ID}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              ) : null} */}
              {/* <IconButton
                edge="end"
                className={classes.button}
                title="Open"
                onClick={() => {
                  onPress(post, postsActions.buttonActions.FIND_POST);
                }}
                value={post.ID}
              >
                <OpenInBrowserIcon />
              </IconButton> */}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default memo(SearchResults);
