import React, { memo } from "react";
import { useSelector } from "react-redux";
import { text } from "../../../helpers/languages";
import usePluginParams from "../../../hooks/usePluginParams";
import * as settingsSelectors from "../../../store/settings/selectors";

const BgIndexingInfo: React.FC = () => {
  const pluginData = usePluginParams();

  const dbBgIndexing = useSelector(settingsSelectors.getDbBgIndexing);
  const dbBgIndexingTotal = useSelector(settingsSelectors.getDbBgIndexingTotal);

  const indexed = dbBgIndexing.total ? dbBgIndexingTotal - dbBgIndexing.total : 0;

  if (!dbBgIndexing.total && !dbBgIndexing.done) return <></>;

  return (
    <div style={{ paddingTop: 10 }}>
      {dbBgIndexing.done ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={pluginData.pluginUrl + "assets/icons/done.svg"} width={20} height={20} />
          <div>
            <div style={{ fontSize: "14px", lineHeight: "20px", color: "#4F4F4F", fontWeight: 500, paddingLeft: 5 }}>
              {dbBgIndexingTotal} {text("bg_indexed_successfully")}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={pluginData.pluginUrl + "assets/icons/spinner.svg"} width={44} height={44} />
          <div>
            <div style={{ fontSize: "14px", lineHeight: "20px", color: "#4F4F4F", fontWeight: 500 }}>
              {dbBgIndexingTotal} {text("bg_products_not_indexed_yet")} {text("bg_indexing_in_progress")} ({indexed} of {dbBgIndexingTotal})
            </div>
            <div style={{ fontSize: "13px", lineHeight: "16px", color: "#4F4F4F" }}>{text("bg_indexing_info")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(BgIndexingInfo);
