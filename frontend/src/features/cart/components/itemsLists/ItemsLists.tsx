import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../../store/posts/actions";
import * as windowActions from "../../../../store/window/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as cartSelectors } from "../../store/selectors";
import { getWindowSize } from "../../../../store/window/selectors";
import Quantity from "./Quantity";
import { ItemsListsStyle } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";
import { TableHead } from "@material-ui/core";
import usePluginParams from "../../../../hooks/usePluginParams";
import PriceProduct from "./PriceProduct";
import * as cartActions from "../../store/actions";
import { text } from "../../../../helpers/languages";

export interface ItemsListsProps {
  // eslint-disable-next-line no-unused-vars
  onPress(item: any, action: string): void;
  // eslint-disable-next-line no-unused-vars
  handleQuantity(quantity: number, itemIndex: number): void;
  // handlePriceProduct(price: number, itemId: number): void;
  items: Array<any>;
}

const ItemsLists: React.FC<ItemsListsProps> = ({ items, onPress, handleQuantity }: ItemsListsProps) => {
  const dispatch = useDispatch();
  const classes = ItemsListsStyle();

  const loaderPostId = useSelector(searchSelectors.getLoaderPostId);
  const scrollBottom = useSelector(cartSelectors.getScrollBottom);
  const windowSize: windowActions.WindowSizeProps = useSelector(getWindowSize);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const itemsCustomPrices: any = useSelector(cartSelectors.getItemsCustomPrices);

  const tableRef: any = React.createRef();
  const pluginData = usePluginParams();

  const columns = [
    { id: "image", label: text("product") + `${items.length > 1 ? `s (${items.length})` : ""}`, colspan: 2 },
    // { id: "product", label: "" },
    { id: "single_price", label: text("price"), desc: pluginData.wcPricesInclTax ? text("incl_tax") : "" },
    { id: "qty", label: text("qty") },
    { id: "price", label: text("subtotal"), desc: text("incl_tax") },
    { id: "actions", label: "" },
  ];

  const updateItemCustomPrice = (itemId: number, price: string, cartKey: string) => {
    dispatch(cartActions.actions.setCustomOrderPrice({ price: undefined }));
    dispatch(cartActions.actions.setCustomItemPrice({ itemId, price, cartKey }));
  };

  useEffect(() => {
    if (scrollBottom && tableRef && tableRef.current) tableRef.current.scrollTop = 1000000;
  }, [scrollBottom]);

  if (!items.length)
    return (
      <div className={classes.notFound} style={{ padding: "82px 0 100px", height: 50 }}>
        {inputType === searchActions.inputTypes.SCAN ? (
          <img src={pluginData.pluginUrl + "assets/icons/scanner-icon.png"} width={80} height={80} />
        ) : (
          <img src={pluginData.pluginUrl + "assets/icons/keyboard-icon.png"} width={64} height={64} />
        )}
        <span style={{ marginLeft: 18 }}>{text("find_add_products")}</span>
      </div>
    );

  return (
    <div style={{ marginTop: 10, minHeight: 149 }}>
      <TableContainer
        ref={tableRef}
        component={Paper}
        className={classes.container}
        style={{ maxHeight: windowSize.height - 450, minHeight: 110, boxShadow: "none" }}
      >
        <Table stickyHeader className={classes.table} size="medium">
          <TableHead className={classes.tableHead}>
            <TableRow style={{ verticalAlign: "top" }}>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.labels} colSpan={column.colspan ?? 1}>
                  {column.label}
                  <br />
                  <span style={{ position: "relative" }}>{column.desc ? <span className={classes.desc}>{column.desc}</span> : null}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((post: any, i: number) => (
              <TableRow key={i} className={classes.tr} data-new={post.updatedAction === "new" ? 1 : 0}>
                <TableCell component="th" scope="row" align="center" width={64} className={classes.td}>
                  {post.product_thumbnail_url ? (
                    <img src={post.product_thumbnail_url} style={{ maxHeight: 64, maxWidth: 64 }} />
                  ) : (
                    <ImageIcon style={{ opacity: 0.4 }} />
                  )}
                </TableCell>
                <TableCell className={classes.tdTitle}>
                  <a className={classes.productLink} href={post.postEditUrl} target="_blank" rel="noreferrer">
                    {post.post_type === "product_variation"
                      ? `#${post.variation_id} ${post.post_title} (variation)`
                      : `#${post.ID} ${post.post_title}`}
                  </a>
                  {post.variationForPreview ? (
                    <div className={classes.variations}>
                      {post.variationForPreview.map((variation: any, i: number) => (
                        <div key={i}>
                          {variation.label}: {variation.value}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell align="right" className={classes.td}>
                  <div style={{ position: "relative", minWidth: 85, textAlign: "center" }}>
                    {itemsCustomPrices[post.ID] !== undefined || true ? (
                      <PriceProduct
                        post={post}
                        itemIndex={i}
                        currentPrice={itemsCustomPrices[post.ID] ? itemsCustomPrices[post.ID] : post.line_price}
                      />
                    ) : (
                      <>
                        <span dangerouslySetInnerHTML={{ __html: post.line_price_c }}></span>
                        <span className={classes.discount} onClick={() => updateItemCustomPrice(post.ID, post.line_price, post.cart_key ?? "")}>
                          {text("discount")}
                        </span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell align="right" className={classes.td}>
                  <Quantity post={post} onChange={handleQuantity} itemIndex={i} onMinus={() => { }} onPlus={() => { }} />
                </TableCell>
                <TableCell align="right" className={classes.td}>
                  <span dangerouslySetInnerHTML={{ __html: post.line_subtotal_c }}></span>
                </TableCell>
                <TableCell align="right" className={classes.td} style={{ paddingLeft: 7, paddingRight: 10 }}>
                  {loaderPostId == post.ID ? <CircularProgress className={classes.loaderPostId} size="18px" color="inherit" /> : null}
                  <IconButton
                    edge="end"
                    className={classes.button}
                    title="Remove"
                    onClick={() => {
                      onPress(post, postsActions.buttonActions.CART_REMOVE_ITEM);
                    }}
                    value={post.ID}
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default memo(ItemsLists);
