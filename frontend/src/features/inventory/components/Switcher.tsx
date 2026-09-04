import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Selectors } from "../../../store/search/selectors";
import { RequestTypesProps } from "../../../store/search/actions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { SwitcherStyle } from "./styles";
import { text } from "../../../helpers/languages";

export interface SwitcherProps {
  // eslint-disable-next-line no-unused-vars
  onChange(value: string): void;
  list: Array<RequestTypesProps>;
  defaultValue: number | string;
}

const Switcher: React.FC<SwitcherProps> = ({ onChange, list, defaultValue }: SwitcherProps) => {
  const classes = SwitcherStyle();

  const loaderStatus = useSelector(Selectors.getLoaderStatus);

  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (e) => {
      if (loaderStatus) return;

      const val: string = e.target.value === value ? "" : e.target.value;

      setValue(val);
      onChange(val);
    },
    [onChange, loaderStatus]
  );

  return (
    <div className={classes.root}>
      <span style={{ paddingRight: 8, color: "#4F4F4F", fontSize: "14px" }}>{text("do_after_search")}</span>
      <ButtonGroup size="large" color="default">
        {list.map((item: RequestTypesProps, i: number) => {
          return (
            <Tooltip key={i} title={<span style={{ fontSize: "12px" }}>{item.tooltip}</span>} arrow>
              <Button
                onClick={() => {
                  handleChange({ target: { value: item.value } });
                }}
                className={value === item.value ? classes.buttonActive : classes.button}
                data-value={item.value}
              >
                {item.label}
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default memo(Switcher);
