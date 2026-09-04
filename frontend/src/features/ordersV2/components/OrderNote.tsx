import React, { memo } from "react";
import { text } from "../../../helpers/languages";
import { OrderNoteStyle } from "./styles";

interface OrderNoteProps {
  order: any;
}

const OrderNote: React.FC<OrderNoteProps> = ({ order }: OrderNoteProps) => {
  const classes = OrderNoteStyle();

  const customerNote = order?.data?.customer_note ?? "";

  return <textarea value={customerNote} className={classes.textarea} placeholder={text("customer_note")} rows={3} disabled={true}></textarea>;
};

export default memo(OrderNote);
