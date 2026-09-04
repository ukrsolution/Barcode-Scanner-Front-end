import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../store/search/actions";
import { Selectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import { getUpdated } from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { PriceStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { InputLabel } from "@material-ui/core";
import * as postsActions from "../../../../store/posts/actions";
import { formatPriceToApi } from "../../../../helpers/data";
// import usePluginParams from "../../../../hooks/usePluginParams";

export interface PriceProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
  label: string;
  defaultValue: number;
  maxValue?: string;
  disabled: boolean;
}

const Price: React.FC<PriceProps> = ({ onChange, label, defaultValue, maxValue, disabled }: PriceProps) => {
  const classes = PriceStyle();
  const dispatch = useDispatch();

  // const pluginData = usePluginParams();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(getUpdated));
  const saveActiveField = useSelector(postsSelectors.getSaveActiveField);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);

  const [price, setPrice] = useState<any>(defaultValue);

  // pluginData.priceDecimalSeparator;
  // pluginData.priceThousandSeparator;
  // pluginData.priceDecimals;

  const handleFocus = () => {
    if (!disabled && focusOn !== label) dispatch(searchActions.actions.autoFocus({ status: false, focusOn: label }));
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

    setPrice(price);
  };

  const handleApply = () => {
    onChange(price);
  };

  const handleCancel = () => {
    setPrice(defaultValue);

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply();
  };

  useEffect(() => {
    if (defaultValue !== price) {
      setPrice(defaultValue);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    }

    if (autoFocusStatus || focusOn !== label) {
      setPrice(defaultValue);
    }
  }, [dispatch, defaultValue, autoFocusStatus, focusOn]);

  useEffect(() => {
    if (saveActiveField === label) {
      // auto save
      dispatch(postsActions.actions.saveActiveField({ field: "" }));
      handleApply();
    }
  }, [saveActiveField]);

  useEffect(() => {
    if (cancelActiveField === label) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      handleCancel();
    }
  }, [cancelActiveField]);

  return (
    <Paper className={classes.root}>
      <InputLabel className={classes.inputLabel} htmlFor="input-with-icon-adornment">
        {label}
      </InputLabel>
      <InputBase
        className={classes.input}
        type="text"
        value={price}
        onChange={handleChange}
        onMouseDown={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="0.00"
        inputProps={{
          "aria-label": label,
        }}
        disabled={loaderStatus || !updated.status || disabled}
      />
      {/* <div className={classes.currency}>{pluginData.currencySymbol}</div> */}
      {focusOn === label && !disabled ? (
        <div className={classes.actions}>
          <IconButton onClick={handleApply} disabled={loaderStatus || !updated.status} className={classes.iconButtonOk} aria-label="search">
            <DoneIcon />
          </IconButton>
          <IconButton onClick={handleCancel} disabled={loaderStatus} className={classes.iconButton} aria-label="directions">
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </Paper>
  );
};

export default memo(Price);
