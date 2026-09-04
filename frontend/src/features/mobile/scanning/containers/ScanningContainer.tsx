import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as mobileCommandsActions from "../../../../store/mobile/commands/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import Button from "../components/Button";

export interface MobileCommandProps {
  message: string;
  method: string;
  options: any;
}

const ScanningContainer: React.FC = () => {
  const [scanStatus, setScanStatus] = useState(false);

  const autoFill = useSelector(searchSelectors.getAutoFill);

  const handleScan = () => {
    const data: MobileCommandProps = {
      message: "mobile.postMessage",
      method: mobileCommandsActions.commands.CMD_SCANNING_START,
      options: { status: !scanStatus },
    };
    window.parent.postMessage(data, "*");
    setScanStatus(!scanStatus);
  };

  useEffect(() => {
    if (autoFill) setScanStatus(false);
  }, [autoFill]);

  return <Button onClick={handleScan} status={scanStatus}></Button>;
};

export default memo(ScanningContainer);
