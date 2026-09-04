import { FormControl, InputBase, NativeSelect, withStyles } from "@material-ui/core";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import usePluginParams from "../../../hooks/usePluginParams";
import { getUpdated } from "../../../store/settings/selectors";
import * as cartActions from "../store/actions";
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

export interface ShippingMethodsProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  activeValue: string;
}

const ShippingMethods: React.FC<ShippingMethodsProps> = ({ onChange, activeValue }: ShippingMethodsProps) => {
  const dispatch = useDispatch();
  const classes = OrderStatusStyle();
  const pluginData = usePluginParams();

  const sUpdated = parseUpdated(useSelector(getUpdated));

  const freeShipping = pluginData.shippingMethods ? pluginData.shippingMethods.find((m) => m.id === "free_shipping") : null;
  const firstOption = pluginData.shippingMethods && pluginData.shippingMethods.length ? pluginData.shippingMethods[0] : null;

  const handleChange = (event: any) => {
    const value: string = event.target.value || "";

    if (!sUpdated.status) return;

    onChange(value);
  };

  useEffect(() => {
    if (activeValue === "") {
      if (freeShipping) dispatch(cartActions.actions.updateNewOrderShipping({ value: `${freeShipping.id}:${freeShipping.instance_id} `, isRecalculate: false }));
      else if (firstOption) dispatch(cartActions.actions.updateNewOrderShipping({ value: `${firstOption.id}:${firstOption.instance_id} `, isRecalculate: false }));
    }
  }, [activeValue, freeShipping, firstOption]);

  return (
    <div className={classes.status}>
      <label id="barcode-scanner-order-shipping-methods" style={{ display: "flex", flexDirection: "column" }}>
        {/* <span>{text("shipping_methods")}</span> */}
        <FormControl>
          {/* @ts-ignore */}
          <NativeSelect style={{ height: 40 }} value={activeValue} onChange={handleChange} input={<BootstrapInput />} disabled={!sUpdated.status}>
            {freeShipping ? (
              // free shipping
              <option value={`${freeShipping.id}:${freeShipping.instance_id} `}>Shipping method</option>
            ) : firstOption ? (
              // first from the list
              <option value={`${firstOption.id}:${firstOption.instance_id} `}>Shipping method</option>
            ) : (
              // empty
              <option value="">Shipping method</option>
            )}

            {pluginData.shippingMethods
              ? pluginData.shippingMethods.map((shipping, i) => (
                <option key={i} value={`${shipping.id}:${shipping.instance_id}`} dangerouslySetInnerHTML={{ __html: shipping.title }}></option>
              ))
              : null}
          </NativeSelect>
        </FormControl>
      </label>
    </div>
  );
};

export default memo(ShippingMethods);
