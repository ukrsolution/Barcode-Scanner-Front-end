import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { RequestTypesProps } from "../../../../store/search/actions";
import { SwitcherStyle } from "./styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export interface SwitcherProps {
  // eslint-disable-next-line no-unused-vars
  onChange(value: string): void;
  // eslint-disable-next-line no-unused-vars
  handleSound(value: boolean): void;
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
      <div className={classes.label}>Auto action:</div>
      <div>
        <ButtonGroup size="large" color="default">
          {list.map((item: RequestTypesProps, i: number) => {
            return (
              <Button
                key={i}
                onClick={() => {
                  handleChange({ target: { value: item.value } });
                }}
                className={value === item.value ? classes.buttonActive : classes.button}
                data-value={item.value}
              >
                {item.label}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default memo(Switcher);
