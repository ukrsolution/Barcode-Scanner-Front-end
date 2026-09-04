import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors } from "../../../store/search/selectors";
import * as settingsActions from "../../../store/settings/actions";
import Grid from "@material-ui/core/Grid";
import { SearchFieldStyle } from "./styles";
import usePluginParams from "../../../hooks/usePluginParams";
import { text } from "../../../helpers/languages";

export interface TimeLeftProps {
  status?: boolean;
}

let tl = -1;

setInterval(() => {
  const el: any = document.querySelector("#loading-time-left");
  const optimizeEl: any = document.querySelector("#loading-time-left-optimize");

  if (!el || tl < 0) return;

  el.innerHTML = tl--;

  if (tl < 5) optimizeEl.style.display = "inline-block";
}, 1000);

const TimeLeft: React.FC<TimeLeftProps> = ({ }: TimeLeftProps) => {
  const dispatch = useDispatch();
  const classes = SearchFieldStyle();
  const pluginData = usePluginParams();

  const [timeLeft, setTimeLeft] = useState<number>(tl);

  const loaderStatus = useSelector(Selectors.getLoaderStatus);

  const resetTimer = useCallback(() => {
    tl = -1;
    setTimeLeft(tl);
  }, []);

  const initTimer = useCallback(() => {
    tl = 27;
    setTimeLeft(tl);
  }, []);

  const handleOptimize = () => {
    dispatch(settingsActions.dbCreateColumnResult(false, { indexing: true }));
  };

  useEffect(() => {
    // reset time left
    resetTimer();

    if (loaderStatus) {
      // start counter
      setTimeout(() => {
        initTimer();
      }, 3000);
    }
  }, [loaderStatus, setTimeLeft]);

  if (!loaderStatus || timeLeft < 0) return <></>;

  return (
    <Grid item>
      <div className={classes.messageGENERAL}>
        {text("time_left")} <span id="loading-time-left">{timeLeft}</span>
        <span id="loading-time-left-optimize" style={{ paddingLeft: 20, display: "none", color: "#828282" }}>
          {pluginData.settings.general?.dbOwnSearch !== "on" ? (
            <>
              {text("takes_too_long")} -{" "}
              <span className={classes.optimize} onClick={handleOptimize}>
                {text("optimize")}
              </span>
            </>
          ) : null}
        </span>
      </div>
    </Grid>
  );
};

export default memo(TimeLeft);
