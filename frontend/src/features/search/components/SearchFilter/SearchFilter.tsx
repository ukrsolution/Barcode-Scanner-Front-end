import React, { memo, useEffect } from "react";
// import { useSelector } from "react-redux";
import { SearchFilterStyle } from "./styles";
import usePluginParams from "../../../../hooks/usePluginParams";
import { getLanguageFlagUrl } from "../../../../helpers/data";
// import { getDbCreateColumnLoading } from "../../../../store/settings/selectors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { text } from "../../../../helpers/languages";
import { useSelector } from "react-redux";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";

export interface SearchFilterProps {
  // eslint-disable-next-line no-unused-vars
  handleWpmlChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleProductsChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleProductsTextChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleOrdersChange(event: any): void;
  // eslint-disable-next-line no-unused-vars
  handleOrdersTextChange(event: any): void;
  handleClose(): void;
  handleSave(): void;
  wpmlFields: any;
  productsFields: any;
  ordersFields: any;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  wpmlFields,
  productsFields,
  ordersFields,
  handleClose,
  handleSave,
  handleWpmlChange,
  handleProductsChange,
  handleOrdersChange,
  handleProductsTextChange,
  handleOrdersTextChange,
}: SearchFilterProps) => {
  const classes = SearchFilterStyle();
  const pluginData = usePluginParams();

  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);

  // const dbCreateColumnLoading = useSelector(getDbCreateColumnLoading);

  const orderList = ["wt_seq_ordnum"];

  const _wpml_style = openMobileFilter ? { width: 615, right: -20, top: -200 } : { width: 615, right: -20 };
  const _def_style = openMobileFilter ? { top: -200 } : {};

  useEffect(() => {
    if (openMobileFilter) {
      setTimeout(() => {
        // set vertical position
        const element = document.getElementById("barcode-scanner-search-filter");
        const elHeight = element ? element.clientHeight : null;

        if (element && elHeight) element.style.top = `-${elHeight / 2}px`;
      }, 0);
    }
  }, [openMobileFilter]);

  return (
    <div
      className={classes.filter}
      style={pluginData.wpml && pluginData.wpml.translations ? _wpml_style : _def_style}
      id="barcode-scanner-search-filter"
    >
      <span className={classes.close} onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </span>
      <div style={{ textAlign: "center", padding: "32px 10px 10px", display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>{text("filter_search_fields")}</span>
        <span style={{ fontSize: "14px", margin: "6px 0 0" }}>{text("filter_search_fields_info")}</span>
      </div>
      <div style={{ display: "flex", padding: "0 17px" }}>
        <ul className={classes.filterList} style={{ marginRight: 0 }}>
          <li className={classes.listLabel}>{text("filter_products")}</li>
          <li>
            <FormControlLabel
              control={
                <Checkbox checked={productsFields.ID} onChange={handleProductsChange} name="ID" color="primary" className={classes.checkbox} />
              }
              label="ID"
            />
          </li>
          <li>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productsFields.post_title}
                  onChange={handleProductsChange}
                  name="post_title"
                  color="primary"
                  className={classes.checkbox}
                />
              }
              label="Name"
            />
          </li>
          <li>
            <FormControlLabel
              control={
                <Checkbox checked={productsFields._sku} onChange={handleProductsChange} name="_sku" color="primary" className={classes.checkbox} />
              }
              label="SKU"
            />
          </li>
          <li>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productsFields._variation_description}
                  onChange={handleProductsChange}
                  name="_variation_description"
                  color="primary"
                  className={classes.checkbox}
                />
              }
              style={{ marginRight: 0 }}
              label={text("filter_variation_description")}
            />
          </li>
          {pluginData.plugins && Object.values(pluginData.plugins).length > 0
            ? Object.values(pluginData.plugins).map((plugin) => {
              return plugin.status && plugin.filter && !orderList.includes(plugin.key) ? (
                <li key={plugin.key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={productsFields[plugin.key] ?? false}
                        onChange={handleProductsChange}
                        name={plugin.key}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={
                      <span className={classes.chLabel} title={plugin.label}>
                        {plugin.label}
                      </span>
                    }
                    style={{ marginRight: 0 }}
                  />
                </li>
              ) : null;
            })
            : null}
          <li>
            <FormControlLabel
              control={
                <Checkbox
                  checked={productsFields.customStatus}
                  onChange={handleProductsChange}
                  name="customStatus"
                  color="primary"
                  className={classes.checkbox}
                />
              }
              label=""
              style={{ paddingRight: "0 !important", marginRight: 0 }}
            />
            <TextField
              className={classes.textField}
              onChange={handleProductsTextChange}
              value={productsFields.custom}
              name="custom"
              placeholder={text("filter_custom_field_name")}
            />
          </li>
        </ul>
        <ul className={classes.filterList}>
          <li className={classes.listLabel}>{text("filter_orders")}</li>
          <li>
            <FormControlLabel
              control={<Checkbox checked={ordersFields.ID} onChange={handleOrdersChange} name="ID" color="primary" className={classes.checkbox} />}
              label="ID"
            />
          </li>
          {pluginData.plugins && Object.values(pluginData.plugins).length > 0
            ? Object.values(pluginData.plugins).map((plugin) => {
              return plugin.status && plugin.filter && orderList.includes(plugin.key) ? (
                <li key={plugin.key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ordersFields[plugin.key] ?? false}
                        onChange={handleOrdersChange}
                        name={plugin.key}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={
                      <span className={classes.chLabel} title={plugin.label}>
                        {plugin.label}
                      </span>
                    }
                    style={{ marginRight: 0 }}
                  />
                </li>
              ) : null;
            })
            : null}
          <li>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ordersFields.customStatus}
                  onChange={handleOrdersChange}
                  name="customStatus"
                  color="primary"
                  className={classes.checkbox}
                />
              }
              label=""
              style={{ paddingRight: "0 !important", marginRight: 0 }}
            />
            <TextField
              className={classes.textField}
              onChange={handleOrdersTextChange}
              value={ordersFields.custom}
              name="custom"
              placeholder={text("filter_custom_field_name")}
            />
          </li>
        </ul>
        {pluginData.wpml && pluginData.wpml.translations ? (
          <ul className={classes.filterList}>
            <li className={classes.listLabel}>WPML {text("filter_languages")}</li>
            {Object.values(pluginData.wpml.translations).map((lang: any, i: number) => {
              return (
                <li key={i} style={{ whiteSpace: "nowrap" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={wpmlFields[lang.language_code]}
                        onChange={handleWpmlChange}
                        name={lang.language_code}
                        color="primary"
                        className={classes.checkbox}
                      />
                    }
                    label={lang.native_name}
                  />
                  <img src={getLanguageFlagUrl(lang.language_code)} width={18} height={12} style={{ position: "relative", left: -5 }} />
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      {/* actions */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 32px 32px" }}>
        <div>
          <Button variant="outlined" onClick={handleClose}>
            {text("filter_cancel")}
          </Button>
        </div>
        <div>
          <Button variant="contained" color="primary" disableElevation onClick={handleSave}>
            {text("filter_save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchFilter);
