import React, { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import ActionsModalContainer from "./containers/modals/actions/ActionsModalContainer";
import MobileContainer from "./containers/mobile/MobileContainer";
import Settings from "./features/settings";
import WidgetInjector from "./components/WidgetInjector";
import * as searchActions from "./store/search/actions";
import * as settingsActions from "./store/settings/actions";
import * as mobileCommandsActions from "./store/mobile/commands/actions";
import InfoModalContainer from "./containers/modals/info/InfoModalContainer";
import Sounds from "./features/sounds";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./assets/index.scss";
import usePluginParams from "./hooks/usePluginParams";

const theme = createTheme({
  palette: {
    primary: { light: "#757ce8", main: "#1976D2", dark: "#002884", contrastText: "#fff" },
    secondary: { light: "#ff7961", main: "#f44336", dark: "#ba000d", contrastText: "#000" },
  },
});

function App() {
  const dispatch = useDispatch();
  let modalUrl = "";
  let modalAdminBarUrl = "";
  let modalFrontendUrl = "";
  let modalIndexingUrl = "";
  let modalSearchFilter = "";

  modalUrl = "admin.php?page=barcode-scanner";
  modalAdminBarUrl = "barcode-scanner-admin-bar";
  modalFrontendUrl = "barcode-scanner-frontend";
  modalIndexingUrl = "barcode-scanner-products-indexation";
  modalSearchFilter = "barcode-scanner-search-filter";

  const [modal, setModal] = React.useState(false);

  const handleOpen = useCallback((href = "") => {
    setModal(false);

    if (
      href === null ||
      href === modalUrl ||
      href.indexOf(modalAdminBarUrl) !== -1 ||
      href.indexOf(modalFrontendUrl) !== -1 ||
      href.indexOf(modalIndexingUrl) !== -1 ||
      href.indexOf(modalSearchFilter) !== -1
    ) {
      setModal(true);
      // trigger for auto focus after opening iframe
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: "" }));
      dispatch(searchActions.actions.autoFocus({ status: true, focusOn: "search" }));
      dispatch(settingsActions.appOpened());

      const pluginData = usePluginParams();

      // @ts-ignore
      const backgroundIndexing = window.backgroundIndexing;

      if (href === null) {
        // check background indexation
        if (pluginData.settings.general?.dbOwnSearch === "on" && pluginData.settings.indexing?.indexed && !backgroundIndexing) {
          dispatch(settingsActions.dbBgIndexing({ first: true }));
        }
      } else if (href.indexOf(modalIndexingUrl) !== -1) {
        // show indexing modal with actions
        dispatch(settingsActions.dbCreateColumnPrepare(true));
      } else if (href.indexOf(modalSearchFilter) !== -1) {
        // show modal search filter
        dispatch(searchActions.actions.openMobileFilter({ status: true }));
        // check background indexation
        if (pluginData.settings.general?.dbOwnSearch === "on" && pluginData.settings.indexing?.indexed && !backgroundIndexing) {
          dispatch(settingsActions.dbBgIndexing({ first: true }));
        }
      } else {
        // check background indexation
        if (pluginData.settings.general?.dbOwnSearch === "on" && pluginData.settings.indexing?.indexed && !backgroundIndexing) {
          dispatch(settingsActions.dbBgIndexing({ first: true }));
        }
      }
    }
  }, []);

  const receiveMessage = (event: any) => {
    try {
      const data = event.data ? (event.data.message ? event.data.message : typeof event.data === "object" ? event.data : JSON.parse(event.data)) : {};

      switch (data.message) {
        case "element-click":
          handleOpen(data.href);
          break;
        case "mobile.emitMessage": {
          const runData: mobileCommandsActions.RunProps = {
            method: data.data.method ?? "",
            options: data.data.options ?? {},
          };
          dispatch(mobileCommandsActions.run(runData));
          break;
        }
      }
    } catch (error) {
      return "";
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    dispatch(settingsActions.appStarted());

    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {/* @ts-ignore */}
      <WidgetInjector tag="div" container="#ukrsolution-barcode-scanner-modal">
        <ActionsModalContainer status={modal} />
      </WidgetInjector>

      <Settings />

      {/* @ts-ignore */}
      <WidgetInjector tag="div" container="#ukrsolution-barcode-scanner-mobile">
        <MobileContainer />
      </WidgetInjector>

      {/* <WidgetInjector tag="div" container="#ukrsolution-barcode-scanner-settings">
        <>{settings ? <div style={{ background: "red", width: 300, height: 300 }}>SETTINGS</div> : null}</>
      </WidgetInjector> */}

      <InfoModalContainer />
      <Sounds />
    </ThemeProvider>
  );
}

export default App;
