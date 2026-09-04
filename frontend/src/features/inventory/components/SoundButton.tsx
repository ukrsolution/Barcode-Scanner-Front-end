import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Selectors as selectorsSearch } from "../../../store/search/selectors";
import { Selectors as selectorsSounds } from "../../../features/sounds/store/selectors";
import SoundOff from "../../../components/icons/SoundOff";
import SoundOn from "../../../components/icons/SoundOn";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { SoundButtonStyle } from "./styles";
import { text } from "../../../helpers/languages";

export interface SoundButtonProps {
  // eslint-disable-next-line no-unused-vars
  onChange(value: boolean): void;
}

const SoundButton: React.FC<SoundButtonProps> = ({ onChange }: SoundButtonProps) => {
  const classes = SoundButtonStyle();

  const loaderStatus = useSelector(selectorsSearch.getLoaderStatus);
  const soundStatus = useSelector(selectorsSounds.getSoundStatus);

  const handleChange = useCallback(
    (e) => {
      if (loaderStatus) return;

      onChange(e.target.value ? true : false);
    },
    [onChange, loaderStatus]
  );

  return (
    <Tooltip title={<span style={{ fontSize: "12px" }}>{text("toggle_mute")}</span>} arrow>
      <Button
        onClick={() => {
          handleChange({ target: { value: !soundStatus } });
        }}
        className={classes.button}
      >
        {soundStatus ? <SoundOn /> : <SoundOff />}
      </Button>
    </Tooltip>
  );
};

export default memo(SoundButton);
