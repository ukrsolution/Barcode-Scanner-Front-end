import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import CameraIcon from "@material-ui/icons/Camera";
import { ButtonStyle } from "./styles";

export interface ButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick(): void;
  status: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, status }: ButtonProps) => {
  const classes = ButtonStyle();

  const handleScan = (e: any) => {
    e.preventDefault();
    onClick();
  };

  return (
    <IconButton className={status ? classes.buttonActive : classes.button} component="span" onClick={handleScan}>
      <CameraIcon />
    </IconButton>
  );
};

export default memo(Button);
