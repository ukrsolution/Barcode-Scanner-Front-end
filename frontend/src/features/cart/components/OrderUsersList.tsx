import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { parseUpdated } from "../../../helpers/date";
// import { getUpdated } from "../../../store/settings/selectors";
// import * as searchActions from "../../../store/search/actions";
import * as usersActions from "../../../store/users/actions";
import { OrderUsersListStyle } from "./styles";
import { getUsers } from "../../../store/users/selectors";

export interface OrderUsersListProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (user: any) => void;
  // statuses: any;
  // status: string;
}

const OrderUsersList: React.FC<OrderUsersListProps> = ({ onChange }: OrderUsersListProps) => {
  const classes = OrderUsersListStyle();
  const dispatch = useDispatch();

  // const sUpdated = parseUpdated(useSelector(getUpdated));
  const users = useSelector(getUsers);

  // const [value, setValue] = useState<string>("");

  // const handleFocus = () => {
  //   dispatch(searchActions.autoFocus(false, searchActions.focusTypes.CART_USER));
  // };

  const handleClick = (user: any) => {
    onChange(user);
    dispatch(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
  };

  const handleClickOutside = (event: any) => {
    if (!event.target.closest("#usbs_users_list")) dispatch(usersActions.actions.usersFindSuccess({ users: [], errors: [] }));
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside, false);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [dispatch]);

  if (!users.length) return <></>;

  return (
    <div className={classes.list} id="usbs_users_list">
      <ul className={classes.ul}>
        {users.map((user: any, index: number) => (
          <li
            key={index}
            onClick={() => {
              handleClick(user);
            }}
            className={classes.li}
          >
            {user.display_name || user.user_nicename}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(OrderUsersList);
