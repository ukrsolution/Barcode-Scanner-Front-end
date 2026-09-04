import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../../store/posts/selectors";
import { getUpdated } from "../../../../../store/settings/selectors";
import { parseUpdated } from "../../../../../helpers/date";
import { MetaFieldStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { InputLabel } from "@material-ui/core";

export interface MetaFieldProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (key: string, value: any) => void;
  label: string;
  defaultValue: number;
  fieldKey: string;
  postUpdated: number;
  disabled: boolean;
}

const MetaField: React.FC<MetaFieldProps> = ({ onChange, label, defaultValue, fieldKey, postUpdated, disabled }: MetaFieldProps) => {
  const classes = MetaFieldStyle();
  const dispatch = useDispatch();

  const focusOn = useSelector(searchSelectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(getUpdated));

  const [fieldValue, setFieldValue] = useState<number>(defaultValue);

  const focusLabel = `meta-${label}`;

  const handleFocus = () => {
    if (!disabled && focusOn !== focusLabel) dispatch(searchActions.actions.autoFocus({ status: false, focusOn: focusLabel }));
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setFieldValue(value);
    onChange(fieldKey, value);
  };

  useEffect(() => {
    if (defaultValue !== fieldValue) setFieldValue(defaultValue);
  }, [dispatch, defaultValue, postUpdated]);

  return (
    <Paper className={classes.root}>
      <InputLabel className={classes.inputLabel}>{label}</InputLabel>
      <InputBase
        className={classes.input}
        type="text"
        value={fieldValue}
        onChange={handleChange}
        onMouseDown={handleFocus}
        placeholder=""
        inputProps={{
          "aria-label": label,
        }}
        disabled={loaderStatus || !updated.status}
      />
    </Paper>
  );
};

export default memo(MetaField);
