import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as modalsActions from "../../../store/modals/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import { Selectors as modalsSelectors } from "../../../store/modals/selectors";
import { InfoModalStyle } from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import usePluginParams from "../../../hooks/usePluginParams";
import { text } from "../../../helpers/languages";

const InfoModalContainer = () => {
  const dispatch = useDispatch();
  const classes = InfoModalStyle();
  const pluginData = usePluginParams();

  const message: string = useSelector(modalsSelectors.getInfoMessage);
  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);

  const handleClose = () => {
    dispatch(modalsActions.actions.updateInfo({ message: "" }));
  };

  // disable modal for mobile
  if (["android", "ios"].includes(pluginData.platform)) return <></>;

  return (
    // @ts-ignore
    <Modal
      className={["android", "ios"].includes(pluginData.platform) ? classes.modalMobile : classes.modal}
      open={message.length > 0 && !loaderStatus}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 250 }}
      // disableBackdropClick={true}
      disableAutoFocus={true}
      disableEnforceFocus={true}
      disableRestoreFocus={true}
    >
      <Fade in={message.length > 0 && !loaderStatus}>
        <div className={classes.paper}>
          <div style={{ fontWeight: "bold", paddingBottom: 20 }}>Proc</div>
          <span className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </span>
          <div className={classes.body}>
            <div dangerouslySetInnerHTML={{ __html: message }}></div>
          </div>
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <Button variant="outlined" onClick={handleClose}>
              {text("close")}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default memo(InfoModalContainer);
