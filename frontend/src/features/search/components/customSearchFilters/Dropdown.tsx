import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import usePluginParams, { CustomSearchFilter, CustomSearchFilterOption } from "../../../../hooks/usePluginParams";
import { CustomSearchFiltersStyle } from "./styles";
import * as customSearchFiltersActions from "../../../../store/customSearchFilters/actions";
import { Selectors as customSearchFiltersSelectors } from "../../../../store/customSearchFilters/selectors";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { text } from "../../../../helpers/languages";

interface DropdownProps {
  filter: CustomSearchFilter;
}

const Dropdown: React.FC<DropdownProps> = ({ filter }: DropdownProps) => {
  const classes = CustomSearchFiltersStyle();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const savedValues: any = useSelector(customSearchFiltersSelectors.getValues);

  const [open, setOpen] = useState<any>(false);

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleClick = useCallback(
    (plugin: string, option: CustomSearchFilterOption) => {
      const o: any = { ...option };
      delete o.label;
      dispatch(customSearchFiltersActions.actions.changeValue({ plugin, option: o }));
      setOpen(false);
    },
    [dispatch, setOpen]
  );

  const handleClose = () => {
    setOpen(!open);
  };

  if (pluginData.customSearchFilters && pluginData.customSearchFilters.length === 0) return <></>;

  if (!filter.plugin) {
    console.warn(`custom filter: "plugin" is required`);
    return <></>;
  }

  if (!filter.type) {
    console.warn(`custom filter: "type" is required`);
    return <></>;
  }

  if (!filter.options || filter.options.length === 0) {
    console.warn(`${filter.plugin}: "options" ${text("is empty")}`);
    return <></>;
  }

  useLayoutEffect(() => {
    // find selected option
    const defOption = filter.options?.find((o) => o.selected === 1);
    const selectedOption = filter.options?.find((o) => o.value === savedValues[filter.plugin]?.value);

    if (!savedValues[filter.plugin] || !selectedOption) {
      // select option
      if (defOption) handleClick(filter.plugin, defOption);
    }
  }, [filter, savedValues, handleClick]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div style={{ position: "relative" }}>
        <div className={classes.root}>
          <span className={classes.link} style={{ paddingRight: 25, verticalAlign: "top" }} onClick={handleClose}>
            {savedValues[filter.plugin] && filter.options
              ? filter.options.find((o) => o.value === savedValues[filter.plugin].value)?.label ?? "-"
              : filter.placeholder ?? "All"}
            <span style={{ position: "absolute", top: -5, right: 3 }}>{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
          </span>
          <span style={{ position: "relative", padding: "0 5px" }}>
            <span style={{ position: "absolute", fontSize: "12px" }}>|</span>
          </span>
        </div>
        {open ? (
          <div className={classes.dropdown}>
            <ul className={classes.ul}>
              {filter.options
                ? filter.options.map((option: CustomSearchFilterOption, index: number) => (
                  <li
                    key={index}
                    className={classes.li}
                    data-active={savedValues[filter.plugin] && savedValues[filter.plugin].value === option.value ? 1 : 0}
                    onClick={() => handleClick(filter.plugin, option)}
                  >
                    {option.label}
                  </li>
                ))
                : null}
            </ul>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default memo(Dropdown);
