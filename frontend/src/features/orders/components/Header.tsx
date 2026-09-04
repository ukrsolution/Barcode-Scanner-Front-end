import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseUpdated } from "../../../helpers/date";
import * as settingsSelectors from "../../../store/settings/selectors";
import * as modalsActions from "../../../store/modals/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as settingsActions from "../../../store/settings/actions";
import * as postsActions from "../../../store/posts/actions";
import * as searchModels from "../../../store/search/models";
import usePluginParams from "../../../hooks/usePluginParams";
import { de } from "../../../helpers/data";
import { HeaderStyle } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Button from "@material-ui/core/Button";

export interface HeaderProps {
  post: any;
}

const Header: React.FC<HeaderProps> = ({ post }: HeaderProps) => {
  const classes = HeaderStyle();
  const dispatch = useDispatch();

  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const inputType: string = useSelector(searchSelectors.getInputType);

  const activeAction = postsActions.buttonActions.MANAGEMENT_ORDER;
  const getMessage = useMemo(() => searchSelectors.makeGetMessage(activeAction), [activeAction]);
  // const resultMessage: searchModels.ResultMessage = useSelector(getMessage);
  const resultMessage: any = useSelector(getMessage);

  const columnProgress = useSelector(settingsSelectors.getDbCreateColumnProgress);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [pluginData, setPluginData] = useState(usePluginParams());

  const billing = post?.data?.billing ?? {};
  const name = billing.first_name ? `${billing.first_name} ${billing.last_name}` : post?.user?.data?.display_name ?? "";

  const updated = parseUpdated(useSelector(settingsSelectors.getUpdated));

  const handleOPenUrl = () => {
    if (!updated.status) {
      let message = `${de("EVovD0UIkupYDASCNSgcNg==")}`;
      message += ` <a style="color:initial;" href="${pluginData.wpAdminUrl}${de(
        "+8XhKlUMO9mQCDQG5oBudmFVyS0TfsO9MI7oS4TWP6osFZkfbHeO7Meww5DAr1Sy"
      )}">${de("yifns+Y4QKNrqdG+ngbGxA==")}</a> `;
      message += de("kwKIAeGfdSljHbemr21nGJSIVpnBV8vSQEOF0Je0H/8=");
      dispatch(modalsActions.actions.updateInfo({ message }));
    }
  };

  const handleOptimize = () => {
    dispatch(settingsActions.dbCreateColumnResult(false, { indexing: true }));
  };

  useEffect(() => {
    setIsFirstLoad(true);
  }, [inputType]);

  useEffect(() => {
    setPluginData(usePluginParams());
  }, [columnProgress]);

  return (
    <div className={classes.root} style={!post.ID ? { padding: "35px 0 94px", height: 144 } : {}}>
      {loaderStatus ? (
        // show loading
        <>
          <div>
            <SearchIcon className={classes.icon} />
          </div>
          <div>
            <span className={classes.resultText}>Looking for item...</span>
          </div>
        </>
      ) : post.ID ? (
        // show item details
        <a
          href={updated.status ? post.postEditUrl : "#"}
          target={updated.status ? "_blank" : ""}
          rel="noreferrer"
          className={classes.name}
          onClick={handleOPenUrl}
        >
          #{post.ID} {name}
          <br />
          <span className={classes.date}>{post.date_format}</span>
        </a>
      ) : resultMessage.message === "ECONNABORTED" ? (
        // ECONNABORTED - timeout error
        <>
          <div style={{ paddingBottom: 5 }}>
            <ErrorOutlineIcon style={{ color: "#EB5757", width: 48, height: 48 }} fontSize="large" />
          </div>
          <div>
            <span className={classes.resultText}>
              Search takes too long.
              <br />
              {pluginData.settings.general?.dbOwnSearch === "on" ? "Check internet connection." : "Try to optimize search."}
            </span>
            {pluginData.settings.general?.dbOwnSearch !== "on" ? (
              <div style={{ padding: "10px 0 0 20px" }}>
                <Button variant="contained" color="primary" disableElevation onClick={handleOptimize}>
                  OPTIMIZE SEARCH
                </Button>
              </div>
            ) : null}
          </div>
        </>
      ) : isFirstLoad ? (
        // show instructions for scanning
        <>
          <div>
            {inputType === searchActions.inputTypes.SCAN ? (
              <img src={pluginData.pluginUrl + "assets/icons/scanner-icon.png"} width={80} height={80} />
            ) : (
              <img src={pluginData.pluginUrl + "assets/icons/keyboard-icon.png"} width={64} height={64} />
            )}
          </div>
          <div>
            {inputType === searchActions.inputTypes.SCAN ? (
              <span className={classes.resultText}>Scan barcode</span>
            ) : (
              <span className={classes.resultText}>Type ID</span>
            )}
          </div>
        </>
      ) : (
        // show not found
        <>
          <div>
            {inputType === searchActions.inputTypes.SCAN ? (
              <img src={pluginData.pluginUrl + "assets/icons/scanner-icon.png"} width={80} height={80} />
            ) : (
              <img src={pluginData.pluginUrl + "assets/icons/keyboard-icon.png"} width={64} height={64} />
            )}
          </div>
          <div>
            <span className={classes.resultText}>Not found</span>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Header);
