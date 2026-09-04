import React, { memo } from "react";
import { CartDetailsProps } from "../store/models";
import PriceOrder from "./PriceOrder";
import { TotalStyle } from "./styles";

export interface TotalProps {
  onClearCart: () => void;
  details: CartDetailsProps;
  items: Array<any>;
  orderCustomPrice: any;
  orderCustomSubPrice: any;
  orderCustomTax: any;
}

const Total: React.FC<TotalProps> = ({ details, items, orderCustomPrice, orderCustomSubPrice, orderCustomTax }: TotalProps) => {
  const classes = TotalStyle();

  if (!items.length) return <></>;

  return (
    <div className={classes.root} style={{ marginTop: 22 }}>
      {/* <div>
        {items.length > 0 ? (
          <ThemeProvider theme={TotalTheme}>
            <Button className={classes.newOrder} variant="contained" color="primary" disableElevation onClick={onClearCart}>
              New order
            </Button>
          </ThemeProvider>
        ) : null}
      </div> */}
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
            <span>Items Subtotal:</span>
            <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
              {orderCustomSubPrice !== undefined ? (
                <PriceOrder currentPrice={orderCustomSubPrice} type="subtotal" />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: details.cart_subtotal_c }} style={{ padding: "3px 0 7px" }}></span>
              )}
            </div>
          </li>
          {details.shipping && parseInt(details.shipping) > 0 ? (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                // top: -4,
              }}
            >
              <span>Shipping:</span>
              <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
                {orderCustomTax !== undefined && false ? (
                  <PriceOrder currentPrice={orderCustomTax} type="tax" />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: details.shipping_tax }} style={{ padding: "3px 0 7px" }}></span>
                )}
              </div>
            </li>
          ) : null}
          {details.total_tax_c && false ? (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                position: "relative",
                // top: -4,
              }}
            >
              <span>Tax:</span>
              <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
                {orderCustomTax !== undefined ? (
                  <PriceOrder currentPrice={orderCustomTax} type="tax" />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: details.total_tax_c }} style={{ padding: "3px 0 7px" }}></span>
                )}
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
            <span style={{ padding: "0 0 6px" }}>Order Total:</span>
            <div style={{ position: "relative", minWidth: 85, textAlign: "center", display: "inline-block", padding: "0 0 6px 5px" }}>
              {orderCustomPrice !== undefined ? (
                <PriceOrder currentPrice={orderCustomPrice} type="total" />
              ) : (
                <span dangerouslySetInnerHTML={{ __html: details.cart_total_c }} style={{ padding: "8px 0 7px" }}></span>
              )}
            </div>
          </li>
          {details.total_tax_c ? (
            <li style={{ position: "relative", fontSize: 13, textAlign: "center", paddingLeft: 25 }}>
              (includes <b dangerouslySetInnerHTML={{ __html: details.total_tax_c }} style={{ fontWeight: "normal" }}></b> Tax)
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default memo(Total);
