import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocationsStyle } from "./styles";
import usePluginParams, { GlobalLocation } from "../../../../hooks/usePluginParams";
import { Grid, IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import * as searchActions from "../../../../store/search/actions";
import * as settingsSelectors from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as postsActions from "../../../../store/posts/actions";
// import usePluginParams from "../../../../hooks/usePluginParams";

export interface LocationProps {
  post: any;
  location: GlobalLocation;
  index: number;
}

const Location: React.FC<LocationProps> = ({ post, location: _location, index }: LocationProps) => {
  const classes = LocationsStyle();
  const dispatch = useDispatch();

  const pluginData = usePluginParams();

  const autoFocusStatus = useSelector(searchSelectors.getAutoFocus);
  const focusOn = useSelector(searchSelectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const sUpdated = parseUpdated(useSelector(settingsSelectors.getUpdated));
  const saveActiveField = useSelector(postsSelectors.getSaveActiveField);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);

  const list = post.locations ?? [];

  const [value, setValue] = useState<string>(list[_location.slug] ?? "");
  const [updated] = useState<number>(post.updated);

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: _location.slug }));
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply();
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleApply = () => {
    dispatch(postsActions.actions.updateProductMeta({ productId: post.ID, key: _location.slug, value, products: [post.ID] }));
  };

  const handleCancel = () => {
    setValue(list[_location.slug] ?? "");
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  useEffect(() => {
    // if (autoFocusStatus || focusOn !== _location.slug) {
    //   console.log("updated", { value });
    //   // setQuantity(post.product_quantity ?? minQuantity);
    // }
  }, [dispatch, autoFocusStatus, updated, post.updated, focusOn]);

  useEffect(() => {
    if (saveActiveField === _location.slug) {
      // auto save
      dispatch(postsActions.actions.saveActiveField({ field: "" }));
      handleApply();
    }
  }, [saveActiveField]);

  useEffect(() => {
    if (cancelActiveField === _location.slug) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      handleCancel();
    }
  }, [cancelActiveField]);

  if (!post.locations || !pluginData.locations) return <></>;

  return (
    <label className={classes.label} style={{ position: "relative", zIndex: focusOn === _location.slug ? 100 : "auto" }}>
      <span style={{ display: "inline-block", textAlign: index === 0 ? "right" : "left", width: index === 0 ? 106 : "initial" }}>
        {_location.name}
      </span>
      <TextField
        className={classes.input}
        value={value}
        onChange={handleChange}
        onMouseDown={handleFocus}
        onKeyDown={handleKeyDown}
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ size: value.length || 1 }}
        variant="outlined"
        disabled={loaderStatus || !sUpdated.status}
      />
      {focusOn === _location.slug ? (
        <Grid
          container
          className={classes.inputActions}
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ position: "absolute", zIndex: 1 }}
        >
          <Grid item xs style={{ textAlign: "right" }}>
            <IconButton onClick={handleApply} disabled={loaderStatus || !sUpdated.status} className={classes.inputIconButtonOk} aria-label="search">
              <DoneIcon />
            </IconButton>
          </Grid>
          <Grid item xs style={{ textAlign: "left" }}>
            <IconButton onClick={handleCancel} disabled={loaderStatus} className={classes.inputIconButton} aria-label="directions">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : null}
    </label>
  );
};

export default memo(Location);
