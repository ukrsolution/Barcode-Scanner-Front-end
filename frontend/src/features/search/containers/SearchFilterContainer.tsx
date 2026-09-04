import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import * as settingsActions from "../../../store/settings/actions";
import * as settingsSelectors from "../../../store/settings/selectors";
import usePluginParams from "../../../hooks/usePluginParams";
import { calcIndexingPercent, getFilterWpmlOptions } from "../../../helpers/data";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons//CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import * as searchActions from "../../../store/search/actions";
import { translations } from "../../../helpers/translations";
import { text } from "../../../helpers/languages";
import { Selectors as searchSelectors } from "../../../store/search/selectors";

const useStyles = makeStyles(() => ({
  root: {
    padding: "3px 5px 3px 7px",
    position: "relative",
  },
  link: {
    cursor: "pointer",
    color: "#828282",
    fontSize: "12px",
    lineHeight: "16px",
  },
  messageBox: {
    position: "absolute",
    top: -70,
    right: 10,
    width: 505,
    minHeight: 352,
    zIndex: 20,
    background: "#4c4c4c8a",
    padding: 30,
    boxSizing: "border-box",
  },
  message: {
    background: "white",
    padding: 32,
    position: "relative",
    top: "20%",
    borderRadius: 4,
  },
}));

export interface SearchFilterProps {
  // eslint-disable-next-line no-unused-vars
  onFilter(status: boolean): void;
}

const SearchFilterContainer: React.FC<SearchFilterProps> = ({ onFilter }: SearchFilterProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const wpmlParams = useSelector(settingsSelectors.getProductsWpmlParams);
  const productsParams = useSelector(settingsSelectors.getProductsFilterParams);
  const ordersParams = useSelector(settingsSelectors.getOrdersFilterParams);
  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);

  // indexing
  const indexingStatus = useSelector(settingsSelectors.getDbCreateColumnLoading);
  const columnProgress = useSelector(settingsSelectors.getDbCreateColumnProgress);

  // custom fields
  const checkCustomFieldStatus = useSelector(settingsSelectors.getCheckCustomFieldStatus);
  const checkCustomFieldMessage = useSelector(settingsSelectors.getCheckCustomFieldMessage);
  const checkCustomFieldIsError = useSelector(settingsSelectors.getCheckCustomFieldIsError);

  const [open, setOpen] = useState<boolean>(openMobileFilter === true);

  const [productsFields, setProductsFields] = React.useState({
    ID: productsParams.ID === false ? false : true,
    customStatus: productsParams.customStatus === false ? false : true,
    post_title: productsParams.post_title === false ? false : true,
    _sku: productsParams._sku === false ? false : true,
    custom: productsParams.custom || "",
    // custom fields
    _variation_description: productsParams._variation_description ?? true,
    // external plugins
    _alg_ean: productsParams._alg_ean ?? true,
    _wpm_gtin_code: productsParams._wpm_gtin_code ?? true,
    hwp_product_gtin: productsParams.hwp_product_gtin ?? true,
    _wepos_barcode: productsParams._wepos_barcode ?? true,
    _ts_gtin: productsParams._ts_gtin ?? true,
    _ts_mpn: productsParams._ts_mpn ?? true,
    usbs_barcode_field: productsParams.usbs_barcode_field ?? true,
  });
  const [ordersFields, setOrdersFields] = React.useState({
    ID: ordersParams.ID === false ? false : true,
    customStatus: ordersParams.customStatus === false ? false : true,
    custom: ordersParams.custom || "",
    // external plugins
    wt_seq_ordnum: ordersParams.wt_seq_ordnum ?? true,
  });
  const [wpmlFields, setWpmlFields] = React.useState(getFilterWpmlOptions(wpmlParams));
  const [messageBoxHeight, setMessageBoxHeight] = React.useState(350);

  let _msg_style: any = pluginData.wpml && pluginData.wpml.translations ? { right: -20, width: 617 } : {};
  if (openMobileFilter) _msg_style.top = -200;

  const handleProductsChange = useCallback(
    (event: any) => {
      setProductsFields({ ...productsFields, [event.target.name]: event.target.checked });
      // dispatch(settingsActions.searchFilterUpdateProduct(event.target.name, event.target.checked));
    },
    [dispatch, productsFields]
  );

  const handleOrdersChange = useCallback(
    (event: any) => {
      setOrdersFields({ ...ordersFields, [event.target.name]: event.target.checked });
      // dispatch(settingsActions.searchFilterUpdateOrder(event.target.name, event.target.checked));
    },
    [dispatch, ordersFields]
  );

  const handleWpmlChange = useCallback(
    (event: any) => {
      setWpmlFields({ ...wpmlFields, [event.target.name]: event.target.checked });
      dispatch(settingsActions.searchFilterUpdateWpml(event.target.name, event.target.checked));
    },
    [dispatch, wpmlFields]
  );

  const handleProductsTextChange = useCallback(
    (event: any) => {
      setProductsFields({ ...productsFields, [event.target.name]: event.target.value });
      // dispatch(settingsActions.searchFilterUpdateProduct(event.target.name, event.target.value));
    },
    [dispatch, productsFields]
  );

  // const handleProductsTextApply = useCallback(
  //   (name: string, value: string) => {
  //     if (pluginData.settings.general?.dbOwnSearch === "on") {
  //       dispatch(settingsActions.dbCreateColumn(value, "product"));
  //     }

  //     setProductsFields({ ...productsFields, [name]: value });
  //     dispatch(settingsActions.searchFilterUpdateProduct(name, value));
  //   },
  //   [dispatch, productsFields]
  // );

  const handleOrdersTextChange = useCallback(
    (event: any) => {
      setOrdersFields({ ...ordersFields, [event.target.name]: event.target.value });
      // dispatch(settingsActions.searchFilterUpdateOrder(event.target.name, event.target.value));
    },
    [dispatch, productsFields]
  );

  const handleProgressOk = useCallback(() => {
    // hide progress message
    dispatch(settingsActions.dbCreateColumnResult(false, {}));

    // hide filters
    dispatch(searchActions.actions.setFilterStatus({ status: false }));
    setOpen(false);
    onFilter(false);
  }, [dispatch]);

  const handleProgressErrorOk = useCallback(() => {
    // hide progress message
    dispatch(settingsActions.dbCreateColumnResult(false, { afterError: true }));
  }, [dispatch]);

  const handleCustomFieldsErrorOk = useCallback(() => {
    // hide custom fields message
    dispatch(settingsActions.checkCustomFieldsResult(false, "validation", false));
  }, [dispatch]);

  const handleSave = useCallback(() => {
    let customFields = [];

    // update product fields
    for (const name in productsFields) {
      if (Object.prototype.hasOwnProperty.call(productsFields, name)) {
        // @ts-ignore
        const value = productsFields[name];
        setProductsFields({ ...productsFields, [name]: value });
        dispatch(settingsActions.searchFilterUpdateProduct(name, value));

        if (name === "custom") {
          customFields.push({ field: value, type: "product" });
        }
      }
    }

    // update order fields
    for (const name in ordersFields) {
      if (Object.prototype.hasOwnProperty.call(ordersFields, name)) {
        // @ts-ignore
        const value = ordersFields[name];
        setOrdersFields({ ...ordersFields, [name]: value });
        dispatch(settingsActions.searchFilterUpdateOrder(name, value));

        if (name === "custom") {
          customFields.push({ field: value, type: "order" });
        }
      }
    }

    if (pluginData.settings.general?.dbOwnSearch === "on" && customFields.length) {
      // check and create fields
      dispatch(settingsActions.dbCreateColumn(customFields));
    } else {
      // check fields
      dispatch(settingsActions.checkCustomFields(customFields));
    }
  }, [dispatch, productsFields, ordersFields]);

  const handleClose = () => {
    if (indexingStatus) return;

    const status = !open;

    setProductsFields({
      ID: productsParams.ID === false ? false : true,
      customStatus: productsParams.customStatus === false ? false : true,
      post_title: productsParams.post_title === false ? false : true,
      _sku: productsParams._sku === false ? false : true,
      custom: productsParams.custom || "",
      // custom fields
      _variation_description: productsParams._variation_description ?? true,
      // external plugins
      _alg_ean: productsParams._alg_ean ?? true,
      _wpm_gtin_code: productsParams._wpm_gtin_code ?? true,
      hwp_product_gtin: productsParams.hwp_product_gtin ?? true,
      _wepos_barcode: productsParams._wepos_barcode ?? true,
      _ts_gtin: productsParams._ts_gtin ?? true,
      _ts_mpn: productsParams._ts_mpn ?? true,
      usbs_barcode_field: productsParams.usbs_barcode_field ?? true,
    });

    setOrdersFields({
      ID: ordersParams.ID === false ? false : true,
      customStatus: ordersParams.customStatus === false ? false : true,
      custom: ordersParams.custom || "",
      wt_seq_ordnum: ordersParams.wt_seq_ordnum ?? true,
    });

    dispatch(searchActions.actions.setFilterStatus({ status }));

    setOpen(status);
    onFilter(status);
  };

  const handleClickAway = () => {
    if (open && !indexingStatus) {
      dispatch(searchActions.actions.setFilterStatus({ status: false }));
      setOpen(false);
      onFilter(false);
    }
  };

  useEffect(() => {
    if (!indexingStatus && !columnProgress.total && !columnProgress.error && !columnProgress.afterError && open) {
      dispatch(searchActions.actions.setFilterStatus({ status: false }));
      setOpen(false);
      onFilter(false);
    }
  }, [indexingStatus, columnProgress]);

  useEffect(() => {
    if (!checkCustomFieldStatus && !checkCustomFieldMessage && !checkCustomFieldIsError && open) {
      dispatch(searchActions.actions.setFilterStatus({ status: false }));
      setOpen(false);
      onFilter(false);
    }
  }, [checkCustomFieldStatus, checkCustomFieldMessage, checkCustomFieldIsError]);

  useEffect(() => {
    // update background height
    const el = document.querySelector("#barcode-scanner-search-filter");
    if (el?.clientHeight) setMessageBoxHeight(el.clientHeight + 3);
  }, [open]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <div className={classes.link} onClick={handleClose}>
          {pluginData.wpml && pluginData.wpml.translations ? text("search_fields_languages") : text("search_fields")}
        </div>
        {open ? (
          <SearchFilter
            productsFields={productsFields}
            ordersFields={ordersFields}
            wpmlFields={wpmlFields}
            handleClose={handleClose}
            handleSave={handleSave}
            handleProductsChange={handleProductsChange}
            handleOrdersChange={handleOrdersChange}
            handleWpmlChange={handleWpmlChange}
            handleProductsTextChange={handleProductsTextChange}
            handleOrdersTextChange={handleOrdersTextChange}
          />
        ) : null}
        {open && calcIndexingPercent(columnProgress) === 100 ? (
          <div className={classes.messageBox} style={{ height: messageBoxHeight, ..._msg_style }} data-name="barcode-scanner-search-filter-overlay">
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("success")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <CheckCircleOutlineOutlinedIcon style={{ color: "#219653" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {translations.indexingMsg_1}
                  <br />
                  {translations.indexingMsg_2}
                </div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                <Button variant="outlined" disableElevation size="small" onClick={handleProgressOk}>
                  {translations.btnOk}
                </Button>
              </div>
            </div>
          </div>
        ) : open && indexingStatus ? (
          <div className={classes.messageBox} style={{ height: messageBoxHeight, ..._msg_style }} data-name="barcode-scanner-search-filter-overlay">
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("increase_search_speed")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <InfoOutlinedIcon style={{ color: "#56CCF2" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {translations.indexingMsg_6}
                  <br />
                  {translations.indexingMsg_7}
                </div>
              </div>
              <div style={{ padding: "16px 0 8px" }}>
                <LinearProgress variant="determinate" value={calcIndexingPercent(columnProgress)} />
              </div>
              <div style={{ textAlign: "center", fontSize: "16px" }}>
                {columnProgress.total ? (
                  <span>
                    {columnProgress.offset && columnProgress.limit
                      ? columnProgress.offset <= columnProgress.total
                        ? columnProgress.offset
                        : columnProgress.total
                      : 0}{" "}
                    {translations.indexingMsg_8.replace("%d", columnProgress.total)}
                  </span>
                ) : (
                  <span> </span>
                )}
              </div>
            </div>
          </div>
        ) : open && columnProgress.error ? (
          <div className={classes.messageBox} style={{ height: messageBoxHeight, ..._msg_style }} data-name="barcode-scanner-search-filter-overlay">
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("we_are_sorry")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <ErrorOutlineIcon style={{ color: "#EB5757" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {columnProgress.error === "ECONNABORTED" ? (
                    <>
                      {translations.indexingMsg_3}
                      <br />
                      {translations.indexingMsg_4}
                    </>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: columnProgress.error }}></div>
                      {translations.indexingMsg_5}
                    </>
                  )}
                </div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                <Button variant="outlined" disableElevation size="small" onClick={handleProgressErrorOk}>
                  {translations.btnOk}
                </Button>
              </div>
            </div>
          </div>
        ) : checkCustomFieldStatus ? (
          <div className={classes.messageBox} style={{ height: messageBoxHeight, ..._msg_style }} data-name="barcode-scanner-search-filter-overlay">
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{translations.indexingMsg_9}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <InfoOutlinedIcon style={{ color: "#56CCF2" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>{translations.indexingMsg_10}</div>
              </div>
              <div style={{ padding: "16px 0 8px" }}>
                <LinearProgress />
              </div>
            </div>
          </div>
        ) : checkCustomFieldMessage && checkCustomFieldIsError ? (
          <div className={classes.messageBox} style={{ height: messageBoxHeight, ..._msg_style }} data-name="barcode-scanner-search-filter-overlay">
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("we_are_sorry")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <ErrorOutlineIcon style={{ color: "#EB5757" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {columnProgress.error === "ECONNABORTED" ? (
                    <>
                      {translations.indexingMsg_3}
                      <br />
                      {translations.indexingMsg_4}
                    </>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: checkCustomFieldMessage }}></div>
                      {translations.indexingMsg_5}
                    </>
                  )}
                </div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                <Button variant="outlined" disableElevation size="small" onClick={handleCustomFieldsErrorOk}>
                  {translations.btnOk}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default memo(SearchFilterContainer);
