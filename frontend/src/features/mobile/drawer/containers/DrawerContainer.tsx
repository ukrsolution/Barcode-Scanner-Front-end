import React, { memo } from "react";
import * as mobileCommandsActions from "../../../../store/mobile/commands/actions";
import Button from "../components/Button";

export interface MobileCommandProps {
  message: string;
  method: string;
  options: any;
}

const DrawerContainer: React.FC = () => {
  const handleDrawer = () => {
    const data: MobileCommandProps = {
      message: "mobile.postMessage",
      method: mobileCommandsActions.commands.CMD_DRAWER_TOGGLE,
      options: {},
    };
    window.parent.postMessage(data, "*");
  };

  return <Button onClick={handleDrawer}></Button>;
};

export default memo(DrawerContainer);
