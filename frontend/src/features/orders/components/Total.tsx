import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUpdated } from "../../../store/settings/selectors";
import { parseUpdated } from "../../../helpers/date";
import { TotalStyle } from "./styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export interface TotalProps {
  // eslint-disable-next-line no-unused-vars
  onStatus: (orderId: number, status: string) => void;
  order: any;
}

const Total: React.FC<TotalProps> = ({ order, onStatus }: TotalProps) => {
  const classes = TotalStyle();

  const updated = parseUpdated(useSelector(getUpdated));

  const [status, setStatus] = useState<string>("");

  const totalTax = order?.data?.total_tax ?? "";
  const statuses = order?.statuses ?? {};

  const handleStatus = (event: any) => {
    setStatus(event.target.value);
    onStatus(order.ID, event.target.value);
  };

  useEffect(() => {
    const defaultStatus = order?.data?.status ?? "";
    setStatus(`wc-${defaultStatus}`);
  }, [order]);

  if (!order.ID) return <></>;

  return (
    <div className={classes.root}>
      <div className={classes.status}>
      </div>
      <div>
        <ul className={classes.list}>
          <li>
            <span>Items Subtotal:</span>
            <span dangerouslySetInnerHTML={{ __html: order.order_subtotal }}></span>
          </li>
          {totalTax ? (
            <li>
              <span>Tax:</span>
              <span dangerouslySetInnerHTML={{ __html: order.order_tax }}></span>
            </li>
          ) : null}
          <li>
            <span>Order Total:</span>
            <span dangerouslySetInnerHTML={{ __html: order.order_total }}></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(Total);
