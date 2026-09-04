import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePluginParams from "../../../hooks/usePluginParams";
import * as actionsSounds from "../store/actions";
import { Selectors as selectorsSounds } from "../store/selectors";

const SoundsController: React.FC = () => {
  const dispatch = useDispatch();
  const data = usePluginParams();

  const activeTone: string = useSelector(selectorsSounds.getTone);
  const soundStatus = useSelector(selectorsSounds.getSoundStatus);

  useEffect(() => {
    if (activeTone) {
      // get html element
      const file: HTMLMediaElement = document.getElementById(activeTone) as HTMLMediaElement;
      // play tone
      if (file && soundStatus) {
        file.volume = 0.5;
        file.play();
      }
      // reset active tone
      dispatch(actionsSounds.actions.soundPlay({ tone: "" }));
    }
  }, [dispatch, activeTone]);

  return (
    <>
      <audio id="bs-sound-fail" src={data.sounds.fail}></audio>
      <audio id="bs-sound-increase" src={data.sounds.increase}></audio>
      <audio id="bs-sound-decrease" src={data.sounds.decrease}></audio>
    </>
  );
};

export default memo(SoundsController);
