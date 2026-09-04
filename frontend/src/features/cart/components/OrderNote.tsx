import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import { getUpdated } from "../../../store/settings/selectors";
import { Selectors as selectors } from "../store/selectors";
import * as searchActions from "../../../store/search/actions";
import { OrderNoteStyle } from "./styles";
import { text } from "../../../helpers/languages";

export interface OrderNoteProps {
  onChange: (value: string) => void;
}

const OrderNote: React.FC<OrderNoteProps> = ({ onChange }: OrderNoteProps) => {
  const dispatch = useDispatch();
  const classes = OrderNoteStyle();

  const sUpdated = parseUpdated(useSelector(getUpdated));
  const createdOrder = useSelector(selectors.getCreatedOrder);

  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    const note: string = event.target.value || "";

    if (!sUpdated.status) return;

    setValue(note);
    onChange(note);
  };

  const handleFocus = () => {
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.CART_NOTE }));
  };

  useEffect(() => {
    if (createdOrder.id) {
      setValue("");
      onChange("");
    }
  }, [createdOrder]);

  return (
    <textarea
      className={classes.textarea}
      placeholder={text("customer_note")}
      rows={2}
      value={value}
      disabled={!sUpdated.status}
      onChange={handleChange}
      onMouseDown={handleFocus}
    ></textarea>
  );
};

export default memo(OrderNote);
