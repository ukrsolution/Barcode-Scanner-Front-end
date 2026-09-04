import React, { memo, useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import { LocationsStyle } from "./styles";
import { text } from "../../../../helpers/languages";
import usePluginParams, { GlobalLocation } from "../../../../hooks/usePluginParams";
import Location from "./Location";
import { useDispatch } from "react-redux";
import * as settingsActions from "../../../../store/settings/actions";

export interface LocationsProps {
  post: any;
}

const Locations: React.FC<LocationsProps> = ({ post }: LocationsProps) => {
  const classes = LocationsStyle();
  const pluginData = usePluginParams();
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState<boolean>(parseInt(pluginData.settings.modalShowLocations ?? "0") === 1);

  const handleShowLocations = useCallback((status: boolean) => {
    setIsShow(status);
    dispatch(settingsActions.updateSettings({ modalShowLocations: status ? 1 : 0 }));
  }, []);

  const locationsList = pluginData.locations.length ? pluginData.locations.filter((location: GlobalLocation) => location.name.trim().length) : [];

  if (!post.locations || !locationsList.length) return <></>;

  return (
    <div style={{ paddingTop: isShow ? 28 : 16, paddingBottom: 11 }}>
      {isShow ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          {locationsList.map((location: GlobalLocation, i) =>
            location.name.trim().length ? (
              <div key={i} style={{ position: "relative" }}>
                <Location post={post} location={location} index={i} />
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

export default memo(Locations);
