import React, { memo, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import * as mobileCommandsActions from "../../store/mobile/commands/actions";
import { MobileContainerStyle } from "./styles";
import Inventory from "../../features/mobile/inventory";
import MobModal from "../../features/mobile/modal";
import "./styles.scss";

const MobileContainer = () => {
  const dispatch = useDispatch();
  const classes = MobileContainerStyle();

  useLayoutEffect(() => {
    dispatch(mobileCommandsActions.loaded());
  }, [dispatch]);

  return (
    <>
      <div className={classes.paper}>
        <div className={classes.features}>
          <Inventory />
        </div>
      </div>
      <MobModal />
    </>
  );
};

export default memo(MobileContainer);
