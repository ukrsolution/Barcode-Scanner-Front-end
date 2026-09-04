import React, { memo, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../helpers/config";
import { de, en, makeid, messageData, parseJson } from "../../../helpers/data";
import usePluginParams from "../../../hooks/usePluginParams";
import * as settingsActions from "../../../store/settings/actions";
import * as settingsSelectors from "../../../store/settings/selectors";
import * as usersActions from "../../../store/users/actions";
import * as usersSelectors from "../../../store/users/selectors";
import { getAppUsers } from "../helpers";

const SettingsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const appUsersLoaderStatus = useSelector(usersSelectors.getAppUsersLoaderStatus);
  const updated = useSelector(settingsSelectors.getUpdated);

  const receiveMessage = (event: any) => {
    const pluginData = usePluginParams();
    const data = messageData(event.data, true);

    switch (data.message) {
      case "settings":
        break;
      case "settings-check":
        dispatch(settingsActions.checkProc(data.data[config.key], "settings-check"));
        break;
      case "remove-app-user": {
        const json = pluginData.userSessions ? de(pluginData.userSessions) : "";
        let users = json ? JSON.parse(json) : [];
        users = users.filter((u: any) => parseInt(u.id) !== parseInt(data.id));
        dispatch(usersActions.actions.appUpdateUsers({ data: en(JSON.stringify(users)) }));
        break;
      }
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("message", receiveMessage, false);

    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  useEffect(() => {
    getAppUsers();
    window.parent.postMessage({ message: "iframe.appUsersLoader", loader: appUsersLoaderStatus }, "*");
  }, [appUsersLoaderStatus]);

  return <></>;
};

export default memo(SettingsContainer);
