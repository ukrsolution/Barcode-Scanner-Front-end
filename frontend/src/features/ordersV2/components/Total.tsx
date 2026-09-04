import React, { memo } from "react";
import { text } from "../../../helpers/languages";
import PriceOrder from "./PriceOrder";
import { TotalStyle } from "./styles";

export interface TotalProps {
  order: any;
  orderCustomPrice: any;
}

const Total: React.FC<TotalProps> = ({ order, orderCustomPrice }: TotalProps) => {
  const classes = TotalStyle();

  if (!order.ID) return <></>;

  return (
    <div className={classes.root} style={{ marginTop: 22 }}>
      <div>
        <ul className={classes.list}>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              // top: -4,
            }}
          >
            <span>{text("order_items_subtotal")}</span>
            <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
              <span dangerouslySetInnerHTML={{ __html: order.order_subtotal_c }} style={{ padding: "3px 0 7px" }}></span>
            </div>
          </li>
          {order.order_tax ? (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                // top: -4,
              }}
            >
              <span>{text("order_tax")}</span>
              <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
                <span dangerouslySetInnerHTML={{ __html: order.order_tax_c }} style={{ padding: "3px 0 7px" }}></span>
              </div>
            </li>
          ) : null}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              // top: -4,
            }}
          >
            <span style={{ padding: "0 0 6px" }}>{text("order_total")}</span>
            <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
              {orderCustomPrice !== undefined ? (
                <PriceOrder currentPrice={orderCustomPrice} type="total" />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: order.order_total }} style={{ padding: "8px 0 7px" }}></span>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Total);
