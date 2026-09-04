import React, { memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ButtonStyle } from "./styles";

export interface ButtonProps {
  onClick(): void;
}

const Button: React.FC<ButtonProps> = ({ onClick }: ButtonProps) => {
  const classes = ButtonStyle();

  const handleDrawer = (e: any) => {
    e.preventDefault();
    onClick();
  };

  return (
    <IconButton className={classes.button} component="span" onClick={handleDrawer}>
      <MenuIcon />
    </IconButton>
  );
};

export default memo(Button);
