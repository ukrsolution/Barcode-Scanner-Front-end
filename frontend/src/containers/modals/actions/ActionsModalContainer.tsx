import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import * as settingsActions from "../../../store/settings/actions";
import Inventory from "../../../features/inventory";
import Finder from "../../../features/finder";
import Cart from "../../../features/cart";
// import Orders from "../../../features/orders";
import OrdersV2 from "../../../features/ordersV2";
import * as searchActions from "../../../store/search/actions";
import * as modalsActions from "../../../store/modals/actions";
import * as settingsSelectors from "../../../store/settings/selectors";
import { ActionsModalStyle } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import usePluginParams from "../../../hooks/usePluginParams";
import { de } from "../../../helpers/data";
import { parseUpdated } from "../../../helpers/date";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import { useState } from "react";
import * as postsActions from "../../../store/posts/actions";
import Indexing from "../../../features/indexing";
import Background from "./Background";
import { text } from "../../../helpers/languages";
import config from "../../../helpers/config";
import { Selectors as searchSelectors } from "../../../store/search/selectors";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export interface ActionsModalContainerProps {
  status: boolean;
}

const ActionsModalContainer = ({ status }: ActionsModalContainerProps) => {
  const dispatch = useDispatch();
  const classes = ActionsModalStyle();
  const pluginData = usePluginParams();

  const activeTab: number = useSelector(settingsSelectors.getActiveModalTab);
  const updated = parseUpdated(useSelector(settingsSelectors.getUpdated));
  const postAutoAction = useSelector(postsSelectors.getPostAutoAction);
  const indexingStatus = useSelector(settingsSelectors.getDbCreateColumnLoading);
  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);
  const focusOn = useSelector(searchSelectors.getFocusOn);

  const [borderColor, setBorderColor] = useState("#676767");

  const availableTabs: Array<number> = [];
  if (pluginData.tabsPermissions.inventory) availableTabs.push(0);
  if (pluginData.tabsPermissions.orders) availableTabs.push(1);
  if (pluginData.tabsPermissions.cart) availableTabs.push(2);

  const handleClose = (event: any, reason: any = "") => {
    if (reason === "backdropClick" && indexingStatus) return;

    if (reason === "escapeKeyDown") {
      if (indexingStatus) return;

      // check input focus
      if (!focusOn || focusOn !== "search") {
        dispatch(postsActions.actions.cancelActiveField({ field: focusOn }));
        return;
      }
    }

    dispatch(settingsActions.appClose());
  };

  const handleTab = (event: any, value: number) => {
    if (activeTab !== value) {
      dispatch(settingsActions.setActiveModalTab(value));

      // clear previous search result
      dispatch(postsActions.actions.updatePostsList({ list: [] }));

      const pluginData = usePluginParams();
      const s = pluginData.settings[de("gSUwbMT+OnvjoZ861LY+yg==")] ?? {};
      dispatch(settingsActions.checkProc(s[config.key] ?? ""));
    }
  };

  const startChecker = () => {
    
  };

  useEffect(() => {
    startChecker();

    if (availableTabs.length && !availableTabs.includes(activeTab)) {
      // set first active tab from available list
      dispatch(settingsActions.setActiveModalTab(availableTabs[0]));
    }
  }, [updated, activeTab]);

  useEffect(() => {
    // first load
    dispatch(postsActions.actions.managementInventoryAutoAction({ action: postAutoAction }));
  }, [dispatch]);

  return (
    // @ts-ignore
    <Modal
      className={classes.modal}
      open={status}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 250 }}
      // disableBackdropClick={indexingStatus}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      disableRestoreFocus={true}
    >
      <Fade in={status}>
        <div
          className={classes.paper}
          style={
            openMobileFilter
              ? { border: "none", background: "transparent", boxShadow: "none", minHeight: pluginData.mode === "ZLzPzQWGSuIVmZmglpW8tg==" ? 40 : 463 }
              : { border: `4px solid ${borderColor}`, minHeight: pluginData.mode === "ZLzPzQWGSuIVmZmglpW8tg==" ? 40 : 463 }
          }
        >
          {!openMobileFilter ? (
            <div className={classes.close} onClick={handleClose}>
              <CloseIcon />
            </div>
          ) : null}
          {pluginData.mode === "ZLzPzQWGSuIVmZmglpW8tg==" ? (
            <div className={classes.features} style={{ minHeight: 0, minWidth: 590 }}>
              {openMobileFilter ? <Inventory /> : null}
            </div>
          ) : (
            <div className={classes.features} style={{ minHeight: 370, minWidth: 590 }}>
              <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTab}>
                {pluginData.tabsPermissions.inventory ? <Tab label={text("inventory")} value={0} /> : null}
                {pluginData.tabsPermissions.orders ? <Tab label={text("orders")} value={1} /> : null}
                {pluginData.tabsPermissions.cart ? <Tab label={text("create_order")} value={2} /> : null}
              </Tabs>
              {pluginData.tabsPermissions.inventory ? (
                <TabPanel value={activeTab} index={0}>
                  <Inventory />
                </TabPanel>
              ) : null}
              {pluginData.tabsPermissions.orders ? (
                <TabPanel value={activeTab} index={1}>
                  {/* <Orders /> */}
                  <OrdersV2 />
                </TabPanel>
              ) : null}
              {pluginData.tabsPermissions.cart ? (
                <TabPanel value={activeTab} index={2}>
                  <Cart />
                </TabPanel>
              ) : null}
              <TabPanel value={activeTab} index={3}>
                <Finder />
              </TabPanel>

              {availableTabs.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 400 }}>
                  {text(`dont_have_actions_permissions`)}
                </div>
              ) : null}
            </div>
          )}
          <Indexing />
          <Background />
          {!openMobileFilter ? <Indexing type="background" /> : null}
        </div>
      </Fade>
    </Modal>
  );
};

export default memo(ActionsModalContainer);
