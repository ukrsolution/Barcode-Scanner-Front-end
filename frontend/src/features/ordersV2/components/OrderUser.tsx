import { CircularProgress, TextField } from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import { /*useDispatch,*/ useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as usersSelectors from "../../../store/users/selectors";
import { getUpdated } from "../../../store/settings/selectors";
// import * as searchActions from "../../../store/search/actions";
// import * as usersActions from "../../../store/users/actions";
import { OrderUserStyle } from "./styles";
import { text } from "../../../helpers/languages";

export interface OrderUserProps {
  user: any;
}

const OrderUser: React.FC<OrderUserProps> = ({ user }: OrderUserProps) => {
  const classes = OrderUserStyle();
  // const dispatch = useDispatch();

  const sUpdated = parseUpdated(useSelector(getUpdated));
  const searchLoader = useSelector(searchSelectors.getLoaderStatus);
  const usersLoader = useSelector(usersSelectors.getLoaderStatus);

  const [value, setValue] = useState<string>("");

  // const handleFocus = () => {
  //   dispatch(searchActions.autoFocus(false, searchActions.focusTypes.CART_USER));
  // };

  // const handleChange = (event: any) => {
  //   setValue(event.target.value);
  //   dispatch(usersActions.usersFind(event.target.value));
  // };

  useEffect(() => {
    if (user.ID) setValue(user.display_name || user.user_nicename);
    else if (user.isCreateNew) setValue("");
    else if (!user.ID) setValue("");
  }, [user]);

  return (
    <div className={classes.user}>
      <label style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <span>{text("user")}</span>
        <TextField
          className={classes.input}
          value={value}
          // onChange={handleChange}
          // onMouseDown={handleFocus}
          type="text"
          disabled={searchLoader || !sUpdated.status || true}
          placeholder={text("enter_username")}
        />
        {usersLoader ? (
          <span style={{ position: "absolute", width: 0, top: 51, left: 130 }}>
            <CircularProgress size={24} color="inherit" title="Loading..." style={{ position: "absolute", top: -9, left: 15 }} />
          </span>
        ) : null}
      </label>
    </div>
  );
};

export default memo(OrderUser);
