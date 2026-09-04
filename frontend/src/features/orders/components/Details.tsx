import React, { memo } from "react";
import { DetailsStyle } from "./styles";

export interface DetailsProps {
  order: any;
}

const Details: React.FC<DetailsProps> = ({ order }: DetailsProps) => {
  const classes = DetailsStyle();

  const customerNote = order?.data?.customer_note ?? "";
  const user = order?.user ?? {};
  const billing = order?.data?.billing ?? {};
  const shipping = order?.data?.shipping ?? {};
  const isShipping: boolean = Object.values(shipping).filter((s: any) => s.length > 0).length > 0;
  const isBilling: boolean = Object.values(billing).filter((s: any) => s.length > 0).length > 0;
  const isCustomer: boolean = order.ID && (user.user_email || user.phone || customerNote.length > 0);

  if (!isBilling && !isShipping && !isCustomer) return <></>;

  return (
    <div className={classes.root} style={!order.ID ? { padding: 0, minHeight: 0 } : {}}>
      {isBilling ? (
        <ul className={classes.list}>
          <li className={classes.listHeadline}>Billing</li>
          <li className={classes.listLine}>
            {billing.first_name} {billing.last_name}
          </li>
          <li className={classes.listLine}>{billing.company}</li>
          <li className={classes.listLine}>
            {billing.address_1} {billing.address_2}
          </li>
          <li className={classes.listLine}>
            {billing.postcode} {billing.city}
          </li>
          <li className={classes.listLine}>
            {billing.state} {billing.country}
          </li>
        </ul>
      ) : null}

      {isShipping ? (
        <ul className={classes.list}>
          <li className={classes.listHeadline}>Shipping</li>
          <li className={classes.listLine}>
            {shipping.first_name} {shipping.last_name}
          </li>
          <li className={classes.listLine}>{shipping.company}</li>
          <li className={classes.listLine}>
            {shipping.address_1} {shipping.address_2}
          </li>
          <li className={classes.listLine}>
            {shipping.postcode} {shipping.city}
          </li>
          <li className={classes.listLine}>
            {shipping.state} {shipping.country}
          </li>
        </ul>
      ) : null}

      {order.ID ? (
        <ul className={classes.list} style={isShipping ? {} : { width: 360 }}>
          {isBilling && billing.email ? <li className={classes.listLine}>{billing.email} </li> : null}
          {/* <li className={classes.listLine}>{user.user_email}</li> */}
          {isBilling && billing.phone ? <li className={classes.listLine}>{billing.phone}</li> : null}
          {customerNote.length ? (
            <>
              <li className={classes.listHeadlineSecond}>Customer note:</li>
              <li className={classes.listLine}>
                <span className={classes.customerNote}>{customerNote}</span>
              </li>
            </>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
};

export default memo(Details);
