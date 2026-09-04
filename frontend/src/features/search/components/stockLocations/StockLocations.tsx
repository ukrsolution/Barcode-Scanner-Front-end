import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import usePluginParams from "../../../../hooks/usePluginParams";
import { StockLocationsStyle } from "./styles";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as postsActions from "../../../../store/posts/actions";

export interface locationProps {
  name: string;
  term_id: number;
}

const StockLocations: React.FC = () => {
  const classes = StockLocationsStyle();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const postToManagement: any = useSelector(postsSelectors.getPostToManagement);
  const activeLocation: locationProps = useSelector(postsSelectors.getStockLocation);

  const [open, setOpen] = useState<boolean>(false);

  // const dbCreateColumnLoading = useSelector(getDbCreateColumnLoading);

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleClick = (location: locationProps) => {
    dispatch(postsActions.actions.setStockLocation({ location }));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  if (parseInt(pluginData.isStockLocations) !== 1) return <></>;

  if (!postToManagement.stock_locations_list) return <></>;

  if (!postToManagement.stock_locations_list.length) return <></>;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div style={{ position: "relative" }}>
        <div className={classes.root}>
          <span className={classes.link} onClick={handleClose}>
            {activeLocation.name ? activeLocation.name : "stock locations"}
          </span>
        </div>
        {open ? (
          <div className={classes.dropdown}>
            <ul className={classes.ul}>
              {postToManagement.stock_locations_list.map((location: locationProps, index: number) => (
                <li
                  key={index}
                  className={classes.li}
                  data-active={activeLocation.term_id === location.term_id ? 1 : 0}
                  onClick={() => handleClick(location)}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default memo(StockLocations);
