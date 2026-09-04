import React, { memo } from "react";
import { mobModalModalProps } from "../store/actions";
import { urlDecode } from "../../../../helpers/data";
import { MobModalStyle } from "./styles";
import Modal from "@material-ui/core/Modal";

export interface ButtonProps {
  onClose(): void;
  data: mobModalModalProps;
}

function getModalStyle() {
  const top = 10;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
  };
}

const Button: React.FC<ButtonProps> = ({ onClose, data }: ButtonProps) => {
  const classes = MobModalStyle();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    // @ts-ignore
    <Modal open={true} onClose={onClose} disableEnforceFocus disableAutoFocus>
      <div style={modalStyle} className={classes.root}>
        <div className={classes.close} onClick={onClose}>
          &#x2715;
        </div>
        <h2 className={classes.title}>{data.title}</h2>
        <div className={classes.body} dangerouslySetInnerHTML={{ __html: urlDecode(data.description) }}></div>
      </div>
    </Modal>
  );
};

export default memo(Button);
