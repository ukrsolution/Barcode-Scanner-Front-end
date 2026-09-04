import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import * as usersSelectors from "../../../store/users/selectors";
import { getUpdated } from "../../../store/settings/selectors";
import * as searchActions from "../../../store/search/actions";
import * as usersActions from "../../../store/users/actions";
import { OrderUserCreateStyle } from "./styles";
import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { formatUserErrors } from "../../../helpers/data";
import { text } from "../../../helpers/languages";

export interface OrderUserCreateProps {
  onChange: (user: any) => void;
}

const OrderUserCreate: React.FC<OrderUserCreateProps> = ({ onChange }: OrderUserCreateProps) => {
  const classes = OrderUserCreateStyle();
  const dispatch = useDispatch();

  const sUpdated = parseUpdated(useSelector(getUpdated));
  const newUser = useSelector(usersSelectors.getNewUser);
  const loaderStatus = useSelector(usersSelectors.getLoaderStatus);
  const errors = useSelector(usersSelectors.getNewUserErrors);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.CART_USER }));
  };

  const handleUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleAdd = () => {
    dispatch(usersActions.actions.userCreate({ username, email }));
  };

  const handleClose = () => {
    onChange({});
  };

  useEffect(() => {
    if (newUser.ID) {
      onChange(newUser);
      dispatch(usersActions.actions.userCreateSuccess({ user: {}, errors: {} }));
    }
  }, [newUser]);

  return (
    <div className={classes.wrapper}>
      <span className={classes.close} onClick={handleClose}>
        <CloseIcon />
      </span>
      <h4>{text("order_create_user")}</h4>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={8} style={{ alignSelf: "start", paddingTop: 6 }}>
          <label>
            <span className={classes.fieldLabel}>Username:</span>
            <TextField
              className={classes.input}
              value={username}
              onChange={handleUsername}
              onMouseDown={handleFocus}
              type="text"
              disabled={loaderStatus || !sUpdated.status}
              placeholder={"Enter user name"}
            />
          </label>
          <br />
          <br />
          <label>
            <span className={classes.fieldLabel}>Email:</span>
            <TextField
              className={classes.input}
              value={email}
              onChange={handleEmail}
              onMouseDown={handleFocus}
              type="text"
              disabled={loaderStatus || !sUpdated.status}
              placeholder={"Enter user email"}
            />
          </label>
        </Grid>
        <Grid item xs={4} style={{ alignSelf: "start", paddingTop: 6 }}>
          {formatUserErrors(errors).map((error) => `${error}`)}
        </Grid>
      </Grid>

      <div style={{ textAlign: "center", paddingTop: 20 }}>
        <Button variant="contained" color="primary" disableElevation onClick={handleAdd}>
          {text("create_user")}
        </Button>
        {loaderStatus ? (
          <span style={{ position: "relative" }}>
            <CircularProgress size={24} color="inherit" title="Loading..." style={{ position: "absolute", top: -2, left: 15 }} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default memo(OrderUserCreate);
