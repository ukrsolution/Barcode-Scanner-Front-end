import { CircularProgress, TextField } from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as usersSelectors from "../../../store/users/selectors";
import { Selectors as selectors } from "../store/selectors";
import { getUpdated } from "../../../store/settings/selectors";
import * as searchActions from "../../../store/search/actions";
import * as usersActions from "../../../store/users/actions";
import { OrderUserStyle } from "./styles";
import { text } from "../../../helpers/languages";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import * as postsActions from "../../../store/posts/actions";

export interface OrderUserProps {
  user: any;
}

const OrderUser: React.FC<OrderUserProps> = ({ user }: OrderUserProps) => {
  const classes = OrderUserStyle();
  const dispatch = useDispatch();

  const sUpdated = parseUpdated(useSelector(getUpdated));
  const searchLoader = useSelector(searchSelectors.getLoaderStatus);
  const usersLoader = useSelector(usersSelectors.getLoaderStatus);
  const createdOrder = useSelector(selectors.getCreatedOrder);
  const cancelActiveField = useSelector(postsSelectors.getCancelActiveField);

  const [value, setValue] = useState<string>("");

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.CART_USER }));
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
    dispatch(usersActions.actions.usersFind({ query: event.target.value }));
  };

  useEffect(() => {
    if (user.ID) setValue(user.display_name || user.user_nicename);
    else if (user.isCreateNew) setValue("");
  }, [user]);

  useEffect(() => {
    if (createdOrder.id) {
      setValue("");
    }
  }, [createdOrder]);

  useEffect(() => {
    if (cancelActiveField === searchActions.focusTypes.CART_USER) {
      // auto cancel
      dispatch(postsActions.actions.cancelActiveField({ field: "" }));
      dispatch(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
    }
  }, [cancelActiveField]);

  return (
    <div className={classes.user}>
      <label style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        {/* <span>{text("user")}</span> */}
        <TextField
          className={classes.input}
          value={value}
          onChange={handleChange}
          onMouseDown={handleFocus}
          type="text"
          disabled={searchLoader || !sUpdated.status}
          placeholder={text("enter_username")}
        />
        {usersLoader ? (
          <span style={{ position: "absolute", width: 0, top: 17, left: 130 }}>
            <CircularProgress size={24} color="inherit" title="Loading..." style={{ position: "absolute", top: -9, left: 15 }} />
          </span>
        ) : null}
      </label>
    </div>
  );
};

export default memo(OrderUser);
