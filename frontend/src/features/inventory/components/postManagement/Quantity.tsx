import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as searchActions from "../../../../store/search/actions";
import * as postsActions from "../../../../store/posts/actions";
import { getUpdated } from "../../../../store/settings/selectors";
import { parseUpdated } from "../../../../helpers/date";
import { QuantityStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
// import CircularProgress from "@material-ui/core/CircularProgress";
import usePluginParams from "../../../../hooks/usePluginParams";
import { text } from "../../../../helpers/languages";

export interface QuantityProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: any) => void;
  onPlus: () => void;
  onMinus: () => void;
  post: any;
  activeAction: string;
}

const Quantity: React.FC<QuantityProps> = ({ post, onChange, onPlus, onMinus, activeAction }: QuantityProps) => {
  const classes = QuantityStyle();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const autoFocusStatus = useSelector(Selectors.getAutoFocus);
  const focusOn = useSelector(Selectors.getFocusOn);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  // const quantityLoaderStatus = useSelector(postsSelectors.getQuantityLoaderStatus);
  // const requestCounter = useSelector(postsSelectors.getQuantityRequestCounter);
  const quantityError = useSelector(postsSelectors.getQuantityRequestError);
  const saveActiveField = useSelector(postsSelectors.getSaveActiveField);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);
  const sUpdated = parseUpdated(useSelector(getUpdated));

  const allowNegativeStock = pluginData.settings.general?.allowNegativeStock === "on";

  const label = "Quantity";
  const minQuantity: string = post.product_manage_stock && !allowNegativeStock ? "" : "";

  const [quantity, setQuantity] = useState<string>(post.product_quantity ?? minQuantity);
  const [updated, setUpdated] = useState<number>(post.updated);
  const [autoPlus, setAutoPlus] = useState<boolean>(false);
  const [autoMinus, setAutoMinus] = useState<boolean>(false);
  const [incorrectType] = useState<boolean>(post.product_type === "external");

  const setValue = (value: number) => {
    setQuantity(`${value ?? minQuantity}`);
  };

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.QUANTITY }));
  };

  const handleMinus = (e: any, qty: number | null = null) => {
    const value: number = qty ? qty - 1 : quantity ? parseInt(quantity) - 1 : -1;

    if (value >= 0 || allowNegativeStock) {
      dispatch(postsActions.actions.updatePostManagementFields({ fields: { useAction: "", product_quantity: value } }));
      dispatch(postsActions.actions.updatePostManagementFields({ fields: { product_manage_stock: true } }));

      setQuantity(`${value ?? minQuantity}`);
      onMinus();
    }
  };

  const handlePlus = (e: any, qty: number | null = null) => {
    const value: number = qty ? qty + 1 : quantity ? parseInt(quantity) + 1 : 1;

    dispatch(postsActions.actions.updatePostManagementFields({ fields: { useAction: "", product_quantity: value } }));
    dispatch(postsActions.actions.updatePostManagementFields({ fields: { product_manage_stock: true } }));

    setQuantity(`${value ?? minQuantity}`);
    onPlus();
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode == 13) handleApply(null, null);
  };

  const handleApply = (e: any, value: number | null = null) => {
    e;
    const qty: number = value !== null ? value : quantity !== "" ? parseInt(quantity) : post.product_quantity ?? minQuantity;
    onChange(qty);
  };

  const handleCancel = () => {
    setValue(post.product_quantity);

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleRefresh = () => {
    dispatch(postsActions.actions.managementInventory({ query: post.ID, autoFill: false }));
  };

  const handleChangeQuantity = (event: any) => {
    // const value: number = parseInt(event.target.value);
    // let value: number = event.target.value;

    const rxLive = allowNegativeStock ? /^[+-]?\d*?$/ : /^\d*?$/;

    if (rxLive.test(event.target.value) || event.target.value === "") {
      setValue(event.target.value);
      // setValue(value && value > 0 ? value : value && allowNegativeStock ? value : 0);
    }
  };

  const triggerAuto = (callback: any) => {
    callback(true);

    setTimeout(() => {
      callback(false);
    }, 500);

    dispatch(postsActions.actions.updatePostManagementFields({ fields: { useAction: "" } }));
  };

  useLayoutEffect(() => {
    if (post.updated !== updated) {
      setUpdated(post.updated);
      setQuantity(post.product_quantity ?? minQuantity);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
      dispatch(postsActions.actions.updateQuantityError({ error: "" }));
    }

    if (autoFocusStatus || focusOn !== label) {
      setQuantity(post.product_quantity ?? minQuantity);
    }
  }, [dispatch, autoFocusStatus, updated, post.updated, focusOn]);

  useEffect(() => {
    if (post.useAction && post.product_type !== "external") {
      switch (activeAction) {
        case searchActions.requestTypes.AUTO_INCREASING:
          triggerAuto(setAutoPlus);
          break;
        case searchActions.requestTypes.AUTO_DECREASING:
          triggerAuto(setAutoMinus);
          break;
      }
    }
  }, [post]);

  useEffect(() => {
    if (saveActiveField === searchActions.focusTypes.QUANTITY) {
      // auto save
      dispatch(postsActions.actions.saveActiveField({ field: "" }));
      handleApply(null, null);
    }
  }, [saveActiveField]);

  useEffect(() => {
    if (cancelActiveField === searchActions.focusTypes.QUANTITY) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      handleCancel();
    }
  }, [cancelActiveField]);

  return (
    <div className={classes.root}>
      <Grid className={classes.label}>{post.field_quantity_label ?? label}</Grid>
      <Grid container spacing={0} justifyContent="center" direction="row" className={classes.grid}>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <Button
              variant="outlined"
              color="default"
              onClick={handleMinus}
              disabled={loaderStatus || !sUpdated.status || incorrectType}
              className={`${classes.iconMinus} ${autoMinus ? "active" : ""}`}
            >
              <RemoveIcon />
            </Button>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <TextField
              className={classes.input}
              value={quantity}
              onChange={handleChangeQuantity}
              onMouseDown={handleFocus}
              onKeyDown={handleKeyDown}
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled={loaderStatus || !sUpdated.status || incorrectType}
            />
            {focusOn === label ? (
              <Grid
                container
                className={classes.inputActions}
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{ position: "absolute", zIndex: 1, paddingLeft: 15, width: 90 }}
              >
                <Grid item xs>
                  <IconButton
                    onClick={handleApply}
                    disabled={loaderStatus || !sUpdated.status || incorrectType}
                    className={classes.inputIconButtonOk}
                    aria-label="search"
                  >
                    <DoneIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton onClick={handleCancel} disabled={loaderStatus} className={classes.inputIconButton} aria-label="directions">
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.gridItem}>
            <Button
              variant="outlined"
              color="default"
              onClick={handlePlus}
              disabled={loaderStatus || !sUpdated.status || incorrectType}
              className={`${classes.iconPlus} ${autoPlus ? "active" : ""}`}
            >
              <AddIcon />
            </Button>
          </Paper>
        </Grid>
      </Grid>
      {/* {quantityLoaderStatus || requestCounter > 0 ? (
        <div style={{ padding: 5, textAlign: "center" }}>
          <CircularProgress size={14} /> <span style={{ position: "relative", top: "-2px", color: "#656565", fontSize: "14px" }}>updating...</span>
        </div>
      ) : null} */}
      {quantityError ? (
        <div style={{ padding: 5, fontSize: "14px", position: "relative", top: "-2px", textAlign: "center" }}>
          <span style={{ color: "#ff0000" }}>{quantityError} </span>
          <span style={{ color: "#1976D2", cursor: "pointer" }} onClick={handleRefresh}>
            {text("refresh")}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Quantity);
