import React, { memo } from "react";
import { SearchFilterStyle } from "./styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

export interface SearchFilterProps {
  // eslint-disable-next-line no-unused-vars
  handleProductsChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleProductsTextChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleOrdersChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleOrdersTextChange(event: any): void;
  handleClose(): void;
  productsFields: any;
  ordersFields: any;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  productsFields,
  ordersFields,
  handleClose,
  handleProductsChange,
  handleOrdersChange,
  handleProductsTextChange,
  handleOrdersTextChange,
}: SearchFilterProps) => {
  const classes = SearchFilterStyle();

  return (
    <div className={classes.filter}>
      <span className={classes.close} onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </span>
      <ul className={classes.filterList}>
        <li className={classes.listLabel}>Products</li>
        <li>
          <FormControlLabel control={<Checkbox checked={productsFields.ID} onChange={handleProductsChange} name="ID" color="primary" />} label="ID" />
        </li>
        <li>
          <FormControlLabel control={<Checkbox checked={productsFields.post_title} onChange={handleProductsChange} name="post_title" color="primary" />} label="Name" />
        </li>
        <li>
          <FormControlLabel control={<Checkbox checked={productsFields._sku} onChange={handleProductsChange} name="_sku" color="primary" />} label="SKU" />
        </li>
        <li>
          <FormControlLabel control={<Checkbox checked={productsFields._variation_description} onChange={handleProductsChange} name="_variation_description" color="primary" />} label="Variation Description" />
        </li>
        <li>
          <TextField className={classes.textField} onChange={handleProductsTextChange} value={productsFields.custom} name="custom" placeholder="Custom field name" />
        </li>
      </ul>
      <ul className={classes.filterList}>
        <li className={classes.listLabel}>Orders</li>
        <li>
          <FormControlLabel control={<Checkbox checked={ordersFields.ID} onChange={handleOrdersChange} name="ID" color="primary" />} label="ID" />
        </li>
        <li>
          <TextField className={classes.textField} onChange={handleOrdersTextChange} value={ordersFields.custom} name="custom" placeholder="Custom field name" />
        </li>
      </ul>
    </div>
  );
};

export default memo(SearchFilter);
