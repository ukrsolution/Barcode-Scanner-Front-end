import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as cartSelectors } from "../../../cart/store/selectors";
import { ItemsListsStyle } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ImageIcon from "@material-ui/icons/Image";
import { TableHead } from "@material-ui/core";
import usePluginParams from "../../../../hooks/usePluginParams";
import Quantity from "./Quantity";
import PriceProduct from "./PriceProduct";
import { text } from "../../../../helpers/languages";
import { productLocationsToString } from "../../../../helpers/data";

export interface ItemsListsProps {
  order: any;
}

const ItemsLists: React.FC<ItemsListsProps> = ({ order }: ItemsListsProps) => {
  const classes = ItemsListsStyle();

  const scrollBottom = useSelector(cartSelectors.getScrollBottom);
  const inputType: string = useSelector(searchSelectors.getInputType);

  const tableRef: any = React.createRef();
  const pluginData = usePluginParams();

  const products = order.products ?? [];

  const columns = [
    { id: "image", label: text("product") + `Product${products.length > 1 ? `s (${products.length})` : ""}`, colspan: 2 },
    // { id: "product", label: "" },
    { id: "single_price", label: text("price") },
    { id: "qty", label: text("qty") },
    { id: "price", label: text("total") },
    { id: "actions", label: "" },
  ];

  useEffect(() => {
    if (scrollBottom && tableRef && tableRef.current) tableRef.current.scrollTop = 1000;
  }, [scrollBottom]);

  if (!products.length)
    return (
      <div className={classes.notFound} style={{ padding: "82px 0 52px", height: 50 }}>
        {inputType === searchActions.inputTypes.SCAN ? (
          <img src={pluginData.pluginUrl + "assets/icons/scanner-icon.png"} width={80} height={80} />
        ) : (
          <img src={pluginData.pluginUrl + "assets/icons/keyboard-icon.png"} width={64} height={64} />
        )}
        <span style={{ marginLeft: 18 }}>{text("find_add_products")}</span>
      </div>
    );

  return (
    <div style={{ marginTop: 10 /* , minHeight: 149 */ }}>
      <TableContainer
        ref={tableRef}
        component={Paper}
        className={classes.container}
        style={{ maxHeight: 260 /* windowSize.height - 450 */, minHeight: 110, boxShadow: "none" }}
      >
        <Table stickyHeader className={classes.table} size="medium">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.labels} colSpan={column.colspan ?? 1}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((post: any, i: number) => (
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
                    {post.post_type === "product_variation" ? `#${post.variation_id} ${post.name} (variation)` : `#${post.ID} ${post.name}`}
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
                  {post.locations ? (
                    <>
                      <br />
                      {productLocationsToString(post.locations)}
                    </>
                  ) : null}
                </TableCell>
                <TableCell align="right" className={classes.td}>
                  <div style={{ position: "relative", minWidth: 85, textAlign: "center" }}>
                    <span dangerouslySetInnerHTML={{ __html: post.subtotal_c }}></span>
                  </div>
                </TableCell>
                <TableCell align="center" className={classes.td}>
                  <Quantity post={post} itemIndex={i} />
                </TableCell>
                <TableCell align="right" className={classes.td}>
                  <PriceProduct post={post} itemIndex={i} currentPrice={post.total} />
                </TableCell>
                <TableCell align="right" className={classes.td} style={{ paddingLeft: 7, paddingRight: 10 }}>
                  &nbsp;
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
