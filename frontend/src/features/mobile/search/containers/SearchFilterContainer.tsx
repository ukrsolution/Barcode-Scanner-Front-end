import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import * as settingsActions from "../../../../store/settings/actions";
import { getOrdersFilterParams, getProductsFilterParams } from "../../../../store/settings/selectors";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles(() => ({
  root: {
    padding: "3px 75px 3px 7px",
    position: "relative",
  },
  link: {
    cursor: "pointer",
    color: "#828282",
    fontSize: "12px",
    lineHeight: "16px",
  },
}));

export interface SearchFilterProps {
  // eslint-disable-next-line no-unused-vars
  onFilter(status: boolean): void;
}

const SearchFilterContainer: React.FC<SearchFilterProps> = ({ onFilter }: SearchFilterProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const productsParams = useSelector(getProductsFilterParams);
  const ordersParams = useSelector(getOrdersFilterParams);

  const [open, setOpen] = useState<boolean>(false);
  const [productsFields, setProductsFields] = React.useState({
    ID: productsParams.ID === false ? false : true,
    post_title: productsParams.post_title === false ? false : true,
    _sku: productsParams._sku === false ? false : true,
    custom: productsParams.custom || "",
    _variation_description: productsParams._variation_description === false ? false : true,
  });
  const [ordersFields, setOrdersFields] = React.useState({
    ID: ordersParams.ID === false ? false : true,
    custom: ordersParams.custom || "",
  });

  const handleProductsChange = useCallback(
    (event: any) => {
      setProductsFields({ ...productsFields, [event.target.name]: event.target.checked });
      dispatch(settingsActions.searchFilterUpdateProduct(event.target.name, event.target.checked));
    },
    [dispatch, productsFields]
  );

  const handleOrdersChange = useCallback(
    (event: any) => {
      setOrdersFields({ ...ordersFields, [event.target.name]: event.target.checked });
      dispatch(settingsActions.searchFilterUpdateOrder(event.target.name, event.target.checked));
    },
    [dispatch, productsFields]
  );

  const handleProductsTextChange = useCallback(
    (event: any) => {
      setProductsFields({ ...productsFields, [event.target.name]: event.target.value });
      dispatch(settingsActions.searchFilterUpdateProduct(event.target.name, event.target.value));
    },
    [dispatch, productsFields]
  );

  const handleOrdersTextChange = useCallback(
    (event: any) => {
      setOrdersFields({ ...ordersFields, [event.target.name]: event.target.value });
      dispatch(settingsActions.searchFilterUpdateOrder(event.target.name, event.target.value));
    },
    [dispatch, productsFields]
  );

  const handleClose = () => {
    const status = !open;

    setOpen(status);
    onFilter(status);
  };

  const handleClickAway = () => {
    if (open) {
      setOpen(false);
      onFilter(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <div className={classes.link} onClick={handleClose}>
          search fields
        </div>
        {open ? (
          <SearchFilter
            productsFields={productsFields}
            ordersFields={ordersFields}
            handleClose={handleClose}
            handleProductsChange={handleProductsChange}
            handleOrdersChange={handleOrdersChange}
            handleProductsTextChange={handleProductsTextChange}
            handleOrdersTextChange={handleOrdersTextChange}
          />
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default memo(SearchFilterContainer);
