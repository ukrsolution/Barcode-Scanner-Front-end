import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as settingsSelectors from "../../../store/settings/selectors";
import { ProductsStyle } from "./styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ImageIcon from "@material-ui/icons/Image";

const columns = [
  { id: "name", label: "Products" },
  { id: "cost", label: "Cost" },
  { id: "qty", label: "Qty" },
  { id: "total", label: "Total" },
];

export interface ProductsProps {
  order: any;
}

const Products: React.FC<ProductsProps> = ({ order }: ProductsProps) => {
  const classes = ProductsStyle();

  const activeTab: number = useSelector(settingsSelectors.getActiveModalTab);

  const [height, setHeight] = useState(200);
  const products = order.products ?? [];

  const resizeWindow = useCallback(
    () => {
      setHeight(window.innerHeight < 800 ? 100 : 200);
    },
    [],
  )

  useEffect(() => {
    window.addEventListener("resize", resizeWindow, false);
    resizeWindow();

    return () => {
      window.removeEventListener("resize", resizeWindow, false);
    };
  }, [activeTab])

  if (!order.ID) return <></>;

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} style={{ maxHeight: height }}>
        <Table stickyHeader>
          <TableHead className={classes.tableHead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.th}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {products.map((product: any, i: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i} className={classes.tr}>
                  <TableCell>
                    <span style={{ display: "inline-block", height: 48, width: 48, textAlign: "center", marginRight: 5 }}>
                      {product.product_thumbnail_url ? <img src={product.product_thumbnail_url} style={{ maxHeight: 48, maxWidth: 48 }} /> : <ImageIcon style={{ opacity: 0.4, margin: 8 }} />}
                    </span>
                    <span>{product.name}</span>
                  </TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: product.subtotal }}></TableCell>
                  <TableCell>x {product.quantity}</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: product.total }}></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <hr style={{ border: "none", borderTop: "1px solid #E0E0E0", marginTop: 0 }} />
    </div>
  );
};

export default memo(Products);
