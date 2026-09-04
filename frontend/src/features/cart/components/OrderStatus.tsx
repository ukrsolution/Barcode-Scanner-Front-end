import { FormControl, InputBase, NativeSelect, withStyles } from "@material-ui/core";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
// import { text } from "../../../helpers/languages";
import { getUpdated } from "../../../store/settings/selectors";
import { OrderStatusStyle } from "./styles";

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

export interface OrderStatusProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  statuses: any;
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ statuses, onChange, status }: OrderStatusProps) => {
  const classes = OrderStatusStyle();

  const sUpdated = parseUpdated(useSelector(getUpdated));

  const list: Array<any> = Object.keys(statuses);

  const handleChange = (event: any) => {
    const value: string = event.target.value || "";

    if (!sUpdated.status) return;

    onChange(value);
  };

  return (
    <div className={classes.status}>
      <label id="barcode-scanner-order-statuses" style={{ display: "flex", flexDirection: "column" }}>
        {/* <span>{text("order_status")}</span> */}
        <FormControl>
          {/* @ts-ignore */}
          <NativeSelect style={{ height: 40 }} value={status} onChange={handleChange} input={<BootstrapInput />} disabled={!sUpdated.status}>
            {/* <option value="" disabled={true}>
              {list.length ? "Select one" : "Loading..."}
            </option> */}
            {list.map((keyStatus, i) => (
              <option key={i} value={keyStatus}>
                {statuses[keyStatus]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </label>
    </div>
  );
};

export default memo(OrderStatus);
