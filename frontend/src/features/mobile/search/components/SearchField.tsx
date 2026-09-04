import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as permissions from "../../../../hooks/permissions";
import * as searchModels from "../../../../store/search/models";
import { Selectors as cartSelectors } from "../../../cart/store/selectors";
import { SearchFieldStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

export interface SearchFieldProps {
  // eslint-disable-next-line no-unused-vars
  onChange(value: string): void;
  // eslint-disable-next-line no-unused-vars
  onSearch(value: string): void;
  // eslint-disable-next-line no-unused-vars
  onInputType(type: string): void;
  defaultValue: string;
  activeAction: string;
  resultMessage: searchModels.ResultMessage;
}

const SearchField: React.FC<SearchFieldProps> = ({ defaultValue, onChange, onSearch, resultMessage }: SearchFieldProps) => {
  const classes = SearchFieldStyle();
  const dispatch = useDispatch();

  const [value, setValue] = useState(defaultValue.trim());
  const [searchInput, setSearchInput] = useState<any>(null);
  const filterModal = false;
  // const [filterModal, setFilterModal] = useState<boolean>(false);

  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const autoFocusStatus = useSelector(searchSelectors.getAutoFocus);
  const focusOn = useSelector(searchSelectors.getFocusOn);
  const postsList = useSelector(postsSelectors.getPostsList);
  const createdOrder = useSelector(cartSelectors.getCreatedOrder);
  const autoFill: string = useSelector(searchSelectors.getAutoFill);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const mobileSearch = useSelector(searchSelectors.getMobileSearch);
  const searchHistory = useSelector(searchSelectors.getHistory);

  // @ts-ignore
  const messageClass: string = classes[`message${resultMessage.type}`] ?? "";

  // const handleFilter = useCallback(
  //   (status: boolean) => {
  //     setFilterModal(status);
  //     if (!status && searchInput && focusOn === "search") setFocus(searchInput);
  //   },
  //   [setFilterModal, filterModal]
  // );

  const handleChange = (e: any) => {
    e.preventDefault();

    setValue(e.target.value);
    if (inputType === searchActions.inputTypes.SCAN) onChange(e.target.value.trim());
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      e.preventDefault();

      if (!loaderStatus && value.length > 0) onSearch(value.trim());

      return false;
    }
  };

  const handleMouseClick = () => {
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: "search" }));
  };

  const handleBlur = (e: any) => {
    if (!filterModal && autoFocusStatus && focusOn === "search") setFocus(e.target);
  };

  const setFocus = (ref: any): void => {
    if (permissions.check(permissions.list.AUTO_FOCUS)) {
      ref.focus();
    }
  };

  const handleRunFromHistory = (query: string) => {
    onSearch(query);
  };

  useEffect(() => {
    if (mobileSearch && searchInput) {
      searchInput.focus();
      setTimeout(() => {
        searchInput.focus();
      }, 100);
      setTimeout(() => {
        searchInput.focus();
      }, 200);
    }

    if (!loaderStatus && value && postsList.length === 0 && !autoFill.length && inputType === searchActions.inputTypes.SCAN) setValue("");

    if (autoFill) {
      setValue(autoFill.trim());
      onChange(autoFill.trim());

      dispatch(searchActions.actions.autofill({ query: "" }));
    }
  }, [focusOn, loaderStatus, autoFill, mobileSearch]);

  useEffect(() => {
    if (inputType === searchActions.inputTypes.SCAN) setValue("");
  }, [inputType]);

  return (
    <div className={classes.wrapper}>
      <div style={{ display: "flex" }}>
        <Paper component="form" className={classes.root} style={{ flexGrow: 1 }}>
          <InputBase
            inputRef={(input: any) => setSearchInput(input)}
            type="search"
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onMouseDown={handleMouseClick}
            value={value}
            className={classes.input}
            placeholder="Enter product SKU"
            autoFocus={true}
          />
          {loaderStatus ? (
            <IconButton type="button" className={classes.iconButton}>
              <CircularProgress size="20px" color="inherit" />
            </IconButton>
          ) : null}

          {inputType === searchActions.inputTypes.ENTER ? (
            <IconButton
              onClick={() => {
                onSearch(value.trim());
              }}
              type="button"
              className={classes.searchButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          ) : null}
        </Paper>
      </div>

      <Grid container className={classes.filterRoot} spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0} justifyContent="space-between">
            {resultMessage.type && resultMessage.message ? (
              <Grid item>
                <div className={messageClass}>
                  {resultMessage.message ? resultMessage.message.replaceAll(/&apos;/gi, `'`).replaceAll(/&quot;/gi, `"`) : null}
                </div>
              </Grid>
            ) : createdOrder.id && createdOrder.url ? (
              <Grid item>
                <div className={classes.successMessage}>
                  <>Order was created </>
                  <>#{createdOrder.id}</>
                </div>
              </Grid>
            ) : (
              <Grid item style={{ minHeight: 19 }}></Grid>
            )}

            {/* <Grid item>
              <SearchFilterContainer onFilter={handleFilter} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      {searchHistory.length ? (
        <Grid container className={classes.filterRoot} spacing={0}>
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {searchHistory.map((history: any, index: number) => (
                <div
                  key={index}
                  style={{ borderBottom: "1px solid #efefef", padding: "6px 12px" }}
                  onClick={() => {
                    handleRunFromHistory(history.query);
                  }}
                >
                  {history.query}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default memo(SearchField);
