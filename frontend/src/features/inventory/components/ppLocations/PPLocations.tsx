import React, { memo, useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import { LocationsStyle } from "./styles";
import { text } from "../../../../helpers/languages";
import usePluginParams, { PPLocationProps } from "../../../../hooks/usePluginParams";
import { useDispatch } from "react-redux";
import * as settingsActions from "../../../../store/settings/actions";
import PPLocation from "./PPLocation";

export interface PPLocationsProps {
  post: any;
}

const PPLocations: React.FC<PPLocationsProps> = ({ post }: PPLocationsProps) => {
  const classes = LocationsStyle();
  const pluginData = usePluginParams();
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState<boolean>(pluginData.settings.enableWcPickingpal ?? "on" === "on");

  const handleShowLocations = useCallback((status: boolean) => {
    setIsShow(status);
    dispatch(settingsActions.updateSettings({ modalShowLocations: status ? 1 : 0 }));
  }, []);

  const locationsList = pluginData.pp_locations.length ? pluginData.pp_locations.filter((location: PPLocationProps) => location.enabled === "on") : [];

  if (!post.ppLocations || !locationsList.length) return <></>;

  return (
    <div style={{ paddingTop: isShow ? 28 : 16, paddingBottom: 11 }}>
      {isShow ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          {locationsList.map((location: PPLocationProps, i) =>
            location.enabled === "on" ? (
              <div key={i} style={{ position: "relative" }}>
                <PPLocation post={post} location={location} index={i} />
              </div>
            ) : null
          )}
          <div>
            <label
              className={classes.hide}
              onClick={() => {
                handleShowLocations(false);
              }}
            >
              {text("hide")}
            </label>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingLeft: 20 }}>
          <Button
            onClick={() => {
              handleShowLocations(true);
            }}
            className={classes.button}
          >
            {text("show_locations")}
          </Button>
        </div>
      )}
      {isShow ? <div className={classes.separator}></div> : null}
    </div>
  );
};

export default memo(PPLocations);
