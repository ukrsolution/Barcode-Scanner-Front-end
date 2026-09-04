import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../../store/search/actions";
import { Selectors as postsSelectors } from "../../../../../store/posts/selectors";
import { getUpdated } from "../../../../../store/settings/selectors";
import { parseUpdated } from "../../../../../helpers/date";
import { PriceStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import usePluginParams from "../../../../../hooks/usePluginParams";
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@material-ui/core";
import { formatPriceToApi } from "../../../../../helpers/data";

export interface PriceProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
  label: string;
  defaultValue: number;
  maxValue?: string;
  disabled: boolean;
  postUpdated: number;
}

const Price: React.FC<PriceProps> = ({ onChange, label, defaultValue, maxValue, disabled, postUpdated }: PriceProps) => {
  const classes = PriceStyle();
  const dispatch = useDispatch();

  const pluginData = usePluginParams();

  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(getUpdated));

  const [price, setPrice] = useState<number>(defaultValue);

  const handleFocus = () => {
    if (!disabled) dispatch(searchActions.actions.autoFocus({ status: false, focusOn: label }));
  };

  const handleChange = (event: any) => {
    // const value: number = parseFloat(event.target.value);
    const value = event.target.value;
    // const price: number = value && value > 0 ? value : 0;
    const price: number = value ? value : 0;

    try {
      // check max value
      if (maxValue && parseFloat(formatPriceToApi(`${price}`)) >= parseFloat(formatPriceToApi(maxValue))) {
        return;
      }
    } catch (error: any) {
      console.error("> handleChange", error.message);
    }

    const newPrice = event.target.value.trim();

    setPrice(newPrice);
    onChange(newPrice);
  };

  useEffect(() => {
    if (defaultValue !== price) setPrice(defaultValue);
  }, [dispatch, defaultValue, postUpdated]);

  return (
    <Paper className={classes.root}>
      <FormControl variant="outlined">
        <FormHelperText className={classes.inputLabel}>{label}</FormHelperText>
        <OutlinedInput
          className={classes.input}
          value={price}
          type="text"
          onChange={handleChange}
          onMouseDown={handleFocus}
          endAdornment={
            <InputAdornment position="end" className={classes.currency}>
              {pluginData.currencySymbol}
            </InputAdornment>
          }
          labelWidth={0}
          placeholder="0.00"
          inputProps={{
            "aria-label": label, style: { textAlign: "left" },
          }}
          disabled={loaderStatus || !updated.status || disabled}
        />
      </FormControl>
      {/* <TextField
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
      <div className={classes.currency}>{pluginData.currencySymbol}</div> */}
    </Paper>
  );
};

export default memo(Price);
