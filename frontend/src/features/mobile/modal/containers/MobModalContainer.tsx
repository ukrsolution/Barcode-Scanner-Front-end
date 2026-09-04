import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as mobileModalSelectors from "../store/selectors";
import * as mobileModalActions from "../store/actions";
import MobModal from "../components/MobModal";

export interface MobileCommandProps {
  message: string;
  method: string;
  options: any;
}

const MobModalContainer: React.FC = () => {
  const dispatch = useDispatch();

  const data: mobileModalActions.mobModalModalProps = useSelector(mobileModalSelectors.getMobModalSummary);

  const handleClose = useCallback(() => {
    dispatch(mobileModalActions.mobModalUpdate({ isOpen: false, type: "", title: "", description: "" }));
  }, []);

  useEffect(() => {
    // if (autoFill) setScanStatus(false);
  }, []);

  return <>{data.isOpen ? <MobModal onClose={handleClose} data={data}></MobModal> : null}</>;
};

export default memo(MobModalContainer);
