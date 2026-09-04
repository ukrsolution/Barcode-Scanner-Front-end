import React, { memo } from "react";
import { useSelector } from "react-redux";
import * as postsActions from "../../../../store/posts/actions";
import { Selectors } from "../../../../store/search/selectors";
import { SearchResultsStyle } from "./styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ImageIcon from "@material-ui/icons/Image";
import { getLanguageFlagUrl } from "../../../../helpers/data";
import { parseUpdated } from "../../../../helpers/date";
import { getUpdated } from "../../../../store/settings/selectors";
// import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
// import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export interface SearchResultsProps {
  // eslint-disable-next-line no-unused-vars
  onPress(post: any, action: string): void;
  posts: Array<any>;
  previewPressAction: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ posts, onPress }: SearchResultsProps) => {
  const classes = SearchResultsStyle();

  const loaderPostId = useSelector(Selectors.getLoaderPostId);
  const updated = parseUpdated(useSelector(getUpdated));

  return (
    <div className={classes.root} style={{ top: updated.message ? 95 : 73 }}>
      <List component="nav" aria-label="secondary mailbox folders">
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
          >
            <span style={{ display: "inline-block", width: 48, height: 48, textAlign: "center", marginRight: 10 }}>
              {post.post_type === "shop_order" && post.user && post.user.avatar ? (
                <img src={post.user.avatar} style={{ maxHeight: 48, maxWidth: 48 }} />
              ) : post.product_thumbnail_url ? (
                <img src={post.product_thumbnail_url} style={{ maxHeight: 48, maxWidth: 48 }} />
              ) : (
                <ImageIcon style={{ opacity: 0.4, margin: 10 }} />
              )}
            </span>
            {/* <ListItemText className={classes.productName} primary={`#${post.ID} ${post.post_title}`} /> */}
            {post.post_type === "shop_order" ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: `Order #${post.ID} - ${post.customer_name} / ${post.customer_country} / ${post.order_total_c} / ${post.preview_date_format}`,
                }}
              ></span>
            ) : (
              `#${post.ID} ${post.post_title ?? post.date_format}`
            )}
            {post.product_sku ? <span className={classes.productSku}>(SKU: {post.product_sku})</span> : null}
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
              {post.translation && post.translation.language_code ? (
                <img src={getLanguageFlagUrl(post.translation.language_code)} width={18} height={12} />
              ) : null}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default memo(SearchResults);
