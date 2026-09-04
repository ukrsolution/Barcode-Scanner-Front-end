import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import { getUpdated } from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { MetaFieldStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { InputLabel } from "@material-ui/core";
import * as postsActions from "../../../../store/posts/actions";

export interface MetaFieldProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (key: string, value: any) => void;
  label: string;
  defaultValue: number;
  fieldKey: string;
  disabled: boolean;
}

const MetaField: React.FC<MetaFieldProps> = ({ onChange, label, defaultValue, fieldKey, disabled }: MetaFieldProps) => {
  const classes = MetaFieldStyle();
  const dispatch = useDispatch();

  const autoFocusStatus = useSelector(searchSelectors.getAutoFocus);
  const focusOn = useSelector(searchSelectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(getUpdated));
  const saveActiveField = useSelector(postsSelectors.getSaveActiveField);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);

  const [fieldValue, setFieldValue] = useState<number>(defaultValue);

  const focusLabel = `meta-${label}`;

  const handleFocus = () => {
    if (!disabled && focusOn !== focusLabel) dispatch(searchActions.actions.autoFocus({ status: false, focusOn: focusLabel }));
  };

  const handleChange = (event: any) => {
    setFieldValue(event.target.value);
  };

  const handleApply = () => {
    onChange(fieldKey, fieldValue);
  };

  const handleCancel = () => {
    setFieldValue(defaultValue);

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply();
  };

  useEffect(() => {
    if (defaultValue !== fieldValue) {
      setFieldValue(defaultValue);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    }

    if (autoFocusStatus || focusOn !== focusLabel) {
      setFieldValue(defaultValue);
    }
  }, [dispatch, defaultValue, autoFocusStatus, focusOn]);

  useEffect(() => {
    if (saveActiveField === focusLabel) {
      // auto save
      dispatch(postsActions.actions.saveActiveField({ field: "" }));
      handleApply();
    }
  }, [saveActiveField]);

  useEffect(() => {
    if (cancelActiveField === focusLabel) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      handleCancel();
    }
  }, [cancelActiveField]);

  return (
    <Paper className={classes.root}>
      <InputLabel className={classes.inputLabel}>{label}</InputLabel>
      <InputBase
        className={classes.input}
        type="text"
        value={fieldValue}
        onChange={handleChange}
        onMouseDown={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder=""
        inputProps={{
          "aria-label": label,
        }}
        disabled={loaderStatus || !updated.status || disabled}
      />
      {focusOn === focusLabel && !disabled ? (
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

export default memo(MetaField);
