import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilterContainer from "../containers/SearchFilterContainer";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as postsActions from "../../../store/posts/actions";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import { getUpdated } from "../../../store/settings/selectors";
import { parseUpdated } from "../../../helpers/date";
// import { de } from "../../../helpers/data";
// import usePluginParams from "../../../hooks/usePluginParams";
import * as permissions from "../../../hooks/permissions";
import * as searchModels from "../../../store/search/models";
import { Selectors as cartSelectors } from "../../cart/store/selectors";
import { SearchFieldStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import TimeLeft from "./TimeLeft";
import CustomSearchFilters from "./customSearchFilters/CustomSearchFilters";
import { text } from "../../../helpers/languages";
import usePluginParams, { ExternalPlugin } from "../../../hooks/usePluginParams";
import * as settingsActions from "../../../store/settings/actions";

export interface SearchFieldProps {
  // eslint-disable-next-line no-unused-vars
  onChange(value: string): void;
  // eslint-disable-next-line no-unused-vars
  onSearch(value: string, autoFill: boolean): void;
  // eslint-disable-next-line no-unused-vars
  onInputType(type: string): void;
  defaultValue: string;
  activeAction: string;
  resultMessage: searchModels.ResultMessage;
}

let inputTimer: any = null;

const SearchField: React.FC<SearchFieldProps> = ({
  defaultValue,
  activeAction,
  onChange,
  onSearch,
  onInputType,
  resultMessage,
}: SearchFieldProps) => {
  const classes = SearchFieldStyle();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const [value, setValue] = useState(defaultValue);
  const [searchInput, setSearchInput] = useState<any>(null);
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [blockChanges, setBlockChanges] = useState<boolean>(false);

  const updated = parseUpdated(useSelector(getUpdated));
  // const activeTab: number = useSelector(getActiveModalTab);

  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const loaderAutofillStatus = useSelector(searchSelectors.getLoaderAutofillStatus);
  const autoFocusStatus = useSelector(searchSelectors.getAutoFocus);
  const focusOn = useSelector(searchSelectors.getFocusOn);
  const postsList = useSelector(postsSelectors.getPostsList);
  const createdOrder = useSelector(cartSelectors.getCreatedOrder);
  const autoFill: string = useSelector(searchSelectors.getAutoFill);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);
  const postToManagement: any = useSelector(postsSelectors.getPostToManagement);

  // @ts-ignore
  const messageClass: string = classes[`message${resultMessage.type}`] ?? "";
  const invTextType: string = inputType === searchActions.inputTypes.SCAN ? "Scan barcode of product/order" : "Type id, name, sku of product/order";
  const orderTextType: string = inputType === searchActions.inputTypes.SCAN ? "Scan barcode of order" : "Type id of order";
  const orderCreateTextType: string = inputType === searchActions.inputTypes.SCAN ? "Scan barcode of product" : "Type id, sku, name of product";
  const placeholder: string =
    activeAction === postsActions.buttonActions.CREATE_ORDER
      ? `${orderCreateTextType}`
      : activeAction === postsActions.buttonActions.MANAGEMENT_ORDER
        ? `${orderTextType}`
        : `${invTextType}`;

  const handleFilter = useCallback(
    (status: boolean) => {
      setFilterModal(status);
      if (!status && searchInput && focusOn === "search") setFocus(searchInput);
    },
    [setFilterModal, filterModal]
  );

  const handleChange = (e: any) => {
    e.preventDefault();

    if (!updated.status) return;

    // block changes after pressing enter
    if (blockChanges) return;

    setValue(e.target.value);

    // clear previous search result
    if (!e.target.value) {
      dispatch(postsActions.actions.updatePostsList({ list: [] }));
    }

    if (inputType === searchActions.inputTypes.SCAN) {
      // clear previous change event if use a scanner
      if (inputTimer) clearTimeout(inputTimer);

      inputTimer = setTimeout(() => {
        onChange(e.target.value);
      }, 200);
    } else if (inputType === searchActions.inputTypes.ENTER) {
      // clear previous change event if press enter after changing string in the input
      if (inputTimer) clearTimeout(inputTimer);

      inputTimer = setTimeout(() => {
        onSearch(e.target.value, true);
      }, 0);
    }
  };

  const handleKeyDown = (e: any) => {
    if (!updated.status) {
      e.preventDefault();
      return;
    }

    // get input symbol
    const symbol = e.key;

    // check for scanning
    let isStart = inputType === searchActions.inputTypes.SCAN ? symbol.length > 1 && ![8, 46].includes(e.keyCode) : e.keyCode === 13;

    if (isStart) {
      e.preventDefault();

      if (!loaderStatus && value.length > 0) {
        // clear previous change event if press enter after changing string in the input
        if (inputTimer) clearTimeout(inputTimer);
        inputTimer = setTimeout(() => {
          setBlockChanges(true);
          onSearch(value, false);
        }, 0);
      }

      return false;
    }
  };

  const handleMouseClick = () => {
    if (!updated.status) return;

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: "search" }));
  };

  const handleBlur = (e: any) => {
    if (!updated.status) return;

    if (!filterModal && autoFocusStatus && focusOn === "search") {
      // exclude dropdown
      if (e.relatedTarget && e.relatedTarget.closest("#barcode-scanner-order-statuses")) {
        return;
      }
      if (e.relatedTarget && e.relatedTarget.closest("#barcode-scanner-order-shipping-methods")) {
        return;
      }
      if (e.relatedTarget && e.relatedTarget.closest("#barcode-scanner-order-payment-methods")) {
        return;
      }

      setFocus(e.target);
    }
  };

  const handleImportLabels = useCallback(() => {
    dispatch(settingsActions.importLabels([postToManagement.ID], [postToManagement.post_type]));
  }, [dispatch, postToManagement]);

  const setFocus = (ref: any): void => {
    setTimeout(() => {
      if (permissions.check(permissions.list.AUTO_FOCUS)) ref.focus();

      // @ts-ignore
      const el = document.getElementById("barcode-scanner-search-input");
      if (el) el.focus();
    }, 0);
  };

  /**
   * change input type
   * @param type
   */
  const setInputType = (type: any): void => {
    onInputType(type);
  };

  useEffect(() => {
    if (searchInput && focusOn === "search" && !autoFill.length) setFocus(searchInput);

    if (!loaderStatus && value && postsList.length === 0 && !autoFill.length && inputType === searchActions.inputTypes.SCAN) setValue("");

    // run autofill by checking loader status
    if (autoFill && !loaderStatus) {
      setValue(autoFill);
      onChange(autoFill);
    }

    if (!loaderStatus) {
      setBlockChanges(false);
    }
  }, [focusOn, loaderStatus, autoFill]);

  useEffect(() => {
    if (inputType === searchActions.inputTypes.SCAN) setValue("");
  }, [inputType]);

  if (openMobileFilter)
    return (
      <div className={classes.wrapper}>
        <SearchFilterContainer onFilter={handleFilter} />
      </div>
    );

  if (pluginData.mode === "ZLzPzQWGSuIVmZmglpW8tg==") return <></>;

  return (
    <div className={classes.wrapper}>
      {/* {!updated.status ? (
        updated.message ? (
          <div
            style={{ color: "#f00", fontSize: "14px", padding: "0 10px 5px", textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: updated.message }}
          ></div>
        ) : (
          <div style={{ color: "#f00", fontSize: "14px", padding: "0 10px 5px", textAlign: "center" }}>
            {de("EVovD0UIkupYDASCNSgcNg==")}{" "}
            <a style={{ color: "red" }} href={`${pluginData.wpAdminUrl}${de("+8XhKlUMO9mQCDQG5oBudmFVyS0TfsO9MI7oS4TWP6osFZkfbHeO7Meww5DAr1Sy")}`}>
              {de("yifns+Y4QKNrqdG+ngbGxA==")}
            </a>{" "}
            {de("kwKIAeGfdSljHbemr21nGJSIVpnBV8vSQEOF0Je0H/8=")}
          </div>
        )
      ) : updated.message ? (
        <div
          style={{ color: "#f00", fontSize: "14px", padding: "0 10px 5px", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: updated.message }}
        ></div>
      ) : null} */}

      {updated.message ? (
        <div
          style={{ color: !updated.status ? "#f00" : "initial", fontSize: "14px", padding: "0 10px 5px", textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: updated.message }}
        ></div>
      ) : null}

      <div style={{ display: "flex" }}>
        <Paper component="form" className={classes.root} style={{ flexGrow: 1 }}>
          <div className={classes.inputType}>
            <span
              className={inputType === searchActions.inputTypes.SCAN ? "active" : ""}
              onClick={() => {
                setInputType(searchActions.inputTypes.SCAN);
              }}
            >
              {text("search_type_scan")}
            </span>
            <span
              className={inputType === searchActions.inputTypes.ENTER ? "active" : ""}
              onClick={() => {
                setInputType(searchActions.inputTypes.ENTER);
              }}
            >
              {text("search_type_enter")}
            </span>
          </div>
          <InputBase
            inputRef={(input: any) => setSearchInput(input)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onMouseDown={handleMouseClick}
            value={value}
            className={classes.input}
            placeholder={placeholder}
            autoFocus={permissions.check(permissions.list.AUTO_FOCUS) ? true : false}
            id="barcode-scanner-search-input"
            autoComplete="off"
          />
          {loaderStatus || loaderAutofillStatus ? (
            <IconButton type="button" className={classes.iconButton}>
              <CircularProgress size="24px" color="inherit" />
            </IconButton>
          ) : null}

          {inputType === searchActions.inputTypes.ENTER ? (
            <IconButton
              onClick={() => {
                onSearch(value, false);
              }}
              type="button"
              className={classes.searchButton}
              aria-label="search"
            >
              <SearchIcon className={classes.searchButtonIcon} /> {text("search")}
            </IconButton>
          ) : null}
        </Paper>
      </div>

      <Grid container className={classes.filterRoot} spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0} justifyContent="space-between">
            <TimeLeft />
            {resultMessage.type && resultMessage.message ? (
              <Grid item>
                <div className={messageClass}>
                  {resultMessage.message
                    ? resultMessage.message === "ECONNABORTED"
                      ? "No connection to the website, please try again."
                      : resultMessage.message.replaceAll(/&apos;/gi, `'`).replaceAll(/&quot;/gi, `"`)
                    : null}{" "}
                  {/* {activeTab === 0 && resultMessage.query ? (
                    <a
                      href="#"
                      onClick={() => handleCreateProduct(resultMessage.query)}
                      style={{ color: "#3676b5", textDecoration: "none", fontSize: "13px", marginLeft: 7 }}
                    >
                      Create product
                    </a>
                  ) : null} */}
                </div>
              </Grid>
            ) : createdOrder.id && createdOrder.url ? (
              <Grid item>
              </Grid>
            ) : (
              <Grid item></Grid>
            )}

            <Grid item>
              <div style={{ display: "flex" }}>
                {Object.values(pluginData.plugins).find((p: ExternalPlugin) => p.key === "us_print_labels" && p.status) && postToManagement.ID ? (
                  <div style={{ padding: "3px 5px 3px 7px", position: "relative" }}>
                    <span className={classes.link} style={{ paddingRight: 10, verticalAlign: "top" }} onClick={handleImportLabels}>
                      {text("print_label")}
                    </span>
                    <span style={{ position: "relative", padding: "0 5px" }}>
                      <span style={{ position: "absolute", fontSize: "12px" }}>|</span>
                    </span>
                  </div>
                ) : null}
                <CustomSearchFilters />
                <SearchFilterContainer onFilter={handleFilter} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(SearchField);
