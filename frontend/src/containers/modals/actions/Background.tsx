import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Selectors as searchSelectors } from "../../../store/search/selectors";

const Background = () => {
  const filterStatus = useSelector(searchSelectors.getFilterStatus);
  // const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);

  return (
    <>
      {filterStatus /*|| openMobileFilter*/ ? (
        <div style={{ background: "#4c4c4c8a", width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 2 }}></div>
      ) : null}
    </>
  );
};

export default memo(Background);
