import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../../../store/search/selectors";
import { Selectors as postsSelectors } from "../../../../../store/posts/selectors";
import * as searchActions from "../../../../../store/search/actions";
import * as postsActions from "../../../../../store/posts/actions";
import { getUpdated } from "../../../../../store/settings/selectors";
import { parseUpdated } from "../../../../../helpers/date";
import { QuantityStyle } from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import usePluginParams from "../../../../../hooks/usePluginParams";
// import CircularProgress from "@material-ui/core/CircularProgress";

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
  // const quantityLoaderStatus = useSelector(getQuantityLoaderStatus);
  // const requestCounter = useSelector(getQuantityRequestCounter);
  const quantityError = useSelector(postsSelectors.getQuantityRequestError);
  const sUpdated = parseUpdated(useSelector(getUpdated));

  const label = "Quantity";
  const minQuantity = post.product_manage_stock ? "0" : "";

  const [quantity, setQuantity] = useState<string>(post.product_quantity || minQuantity);
  const [updated, setUpdated] = useState<number>(post.updated);
  const [autoPlus, setAutoPlus] = useState<boolean>(false);
  const [autoMinus, setAutoMinus] = useState<boolean>(false);
  const [incorrectType] = useState<boolean>(post.product_type === "external");

  const setValue = (value: number | string) => {
    const allowNegativeStock = pluginData.settings.general?.allowNegativeStock === "on";
    setQuantity(`${allowNegativeStock ? value : value || minQuantity}`);
  };

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.QUANTITY }));
  };

  const handleMinus = (e: any, qty: number | null = null) => {
    const value: number = qty ? qty - 1 : quantity ? parseInt(quantity) - 1 : -1;
    const allowNegativeStock = pluginData.settings.general?.allowNegativeStock === "on";

    if (value >= 0 || allowNegativeStock) {
      dispatch(postsActions.actions.updatePostManagementFields({ fields: { useAction: "", product_quantity: value } }));
      dispatch(postsActions.actions.updatePostManagementFields({ fields: { product_manage_stock: true } }));

      setQuantity(`${value || minQuantity}`);
      onMinus();
    }
  };

  const handlePlus = (e: any, qty: number | null = null) => {
    const value: number = qty ? qty + 1 : quantity ? parseInt(quantity) + 1 : 1;

    dispatch(postsActions.actions.updatePostManagementFields({ fields: { useAction: "", product_quantity: value } }));
    dispatch(postsActions.actions.updatePostManagementFields({ fields: { product_manage_stock: true } }));

    setQuantity(`${value || minQuantity}`);
    onPlus();
  };

  const handleRefresh = () => {
    dispatch(postsActions.actions.managementInventory({ query: post.ID, autoFill: false }));
  };

  const handleChangeQuantity = (event: any) => {
    const value: number | string = event.target.value ? parseInt(event.target.value) : 0; //"";
    const allowNegativeStock = pluginData.settings.general?.allowNegativeStock === "on";

    const rxLive = allowNegativeStock ? /^[+-]?\d*?$/ : /^\d*?$/;

    if (["", "-"].includes(event.target.value) && allowNegativeStock && false) {
      setValue(event.target.value);
      onChange(event.target.value);
    } else if (rxLive.test(event.target.value) || event.target.value === "") {
      setValue(value && value > 0 ? value : value && allowNegativeStock ? value : 0);
      onChange(value && value > 0 ? value : value && allowNegativeStock ? value : 0);
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
      setQuantity(post.product_quantity || minQuantity);
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
      dispatch(postsActions.actions.updateQuantityError({ error: "" }));
    }

    if (autoFocusStatus || focusOn !== label) {
      // setQuantity(post.product_quantity || minQuantity);
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

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justifyContent="center" direction="row" style={{ alignItems: "center" }}>
        <Grid item xs className={classes.label}>
          {label}
        </Grid>
        <Grid item xs style={{ display: "inline-block" }}>
          <Grid container spacing={0} justifyContent="center" direction="row" className={classes.grid}>
            <Grid item xs style={{ maxWidth: 42 }}>
              <Paper className={classes.gridItem} style={{ display: "inline-block" }}>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handleMinus}
                  disabled={loaderStatus || !sUpdated.status || incorrectType}
                  className={`${classes.iconMinus} ${autoMinus ? "active" : ""}`}
                >
                  {/* <RemoveIcon /> */}
                  <img src={pluginData.pluginUrl.replace("src/features/", "") + "assets/icons/minus.svg"} width={32} height={32} />
                </Button>
              </Paper>
            </Grid>
            <Grid item xs style={{ position: "relative" }}>
              <Paper className={classes.gridItem}>
                <TextField
                  className={classes.input}
                  value={quantity}
                  onChange={handleChangeQuantity}
                  onMouseDown={handleFocus}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  disabled={loaderStatus || !sUpdated.status || incorrectType}
                />
              </Paper>
            </Grid>
            <Grid item xs style={{ maxWidth: 42, textAlign: "right" }}>
              <Paper className={classes.gridItem} style={{ display: "inline-block" }}>
                <Button
                  variant="outlined"
                  color="default"
                  onClick={handlePlus}
                  disabled={loaderStatus || !sUpdated.status || incorrectType}
                  className={`${classes.iconPlus} ${autoPlus ? "active" : ""}`}
                >
                  {/* <AddIcon /> */}
                  <img src={pluginData.pluginUrl.replace("src/features/", "") + "assets/icons/plus.svg"} width={32} height={32} />
                </Button>
              </Paper>
            </Grid>
          </Grid>
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
          <span style={{ color: "#2067F0", cursor: "pointer" }} onClick={handleRefresh}>
            refresh
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Quantity);
