import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../../store/search/actions";
import { Selectors } from "../../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../../store/posts/selectors";
import { getUpdated } from "../../../../../store/settings/selectors";
import { parseUpdated } from "../../../../../helpers/date";
import { PriceStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
// import InputBase from "@material-ui/core/InputBase";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import usePluginParams from "../../../../../hooks/usePluginParams";
// import usePluginParams from "../../../../hooks/usePluginParams";

export interface CustomPriceProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (field: string, value: any) => void;
  label: string;
  field: string;
  defaultValue: number;
  maxValue?: string;
  disabled?: boolean;
}

const CustomPrice: React.FC<CustomPriceProps> = ({ onChange, label, field, defaultValue, maxValue, disabled }: CustomPriceProps) => {
  const classes = PriceStyle();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(getUpdated));

  const [price, setPrice] = useState<number>(defaultValue);

  // pluginData.priceDecimalSeparator;
  // pluginData.priceThousandSeparator;
  // pluginData.priceDecimals;

  const focusName = searchActions.focusTypes.CUSTOM_PRICE + field;

  const handleFocus = () => {
    if (!disabled && focusOn !== focusName) dispatch(searchActions.actions.autoFocus({ status: false, focusOn: focusName }));
  };

  const handleChange = (event: any) => {
    const value: number = parseFloat(event.target.value);
    const price: number = value && value > 0 ? value : 0;

    // check max value
    if (maxValue && price >= parseFloat(maxValue)) {
      return;
    }

    setPrice(price);
    onChange(field, price);
  };

  useEffect(() => {
    if (defaultValue !== price) {
      setPrice(defaultValue);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    }

    if (autoFocusStatus || focusOn !== focusName) {
      setPrice(defaultValue);
    }
  }, [dispatch, defaultValue, autoFocusStatus, focusOn]);

  return (
    <Paper className={classes.root} style={{}}>
      <TextField
        label={label}
        className={classes.input}
        variant="outlined"
        type="number"
        value={price}
        onChange={handleChange}
        onMouseDown={handleFocus}
        placeholder="0.00"
        inputProps={{
          "aria-label": label,
          style: { textAlign: "center" },
        }}
        disabled={loaderStatus || !updated.status || disabled}
      />
      <div className={classes.currency}>{pluginData.currencySymbol}</div>
    </Paper>
  );
};

export default memo(CustomPrice);
