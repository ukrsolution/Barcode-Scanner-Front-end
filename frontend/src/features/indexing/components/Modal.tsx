import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calcIndexingPercent } from "../../../helpers/data";
import * as settingsSelectors from "../../../store/settings/selectors";
// import * as postsActions from "../../../store/posts/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons//CheckCircleOutlineOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import * as settingsActions from "../../../store/settings/actions";
import { translations } from "../../../helpers/translations";
import config from "../../../helpers/config";
import { text } from "../../../helpers/languages";
import usePluginParams from "../../../hooks/usePluginParams";
import { Selectors as searchSelectors } from "../../../store/search/selectors";

const useStyles = makeStyles(() => ({
  root: {
    padding: "3px 5px 3px 7px",
    position: "relative",
  },
  link: {
    cursor: "pointer",
    color: "#828282",
    fontSize: "12px",
    lineHeight: "16px",
  },
  messageBox: {
    padding: 50,
    boxSizing: "border-box",
  },
  message: {
    background: "white",
    padding: "30px 40px",
    position: "relative",
    borderRadius: 4,
  },
}));

const Modal: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pluginData = usePluginParams();

  const indexingStatus = useSelector(settingsSelectors.getDbCreateColumnLoading);
  const columnProgress = useSelector(settingsSelectors.getDbCreateColumnProgress);
  const indexationPrepare = useSelector(settingsSelectors.getDbIndexationPrepare);
  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);

  const handleProgressOk = useCallback(() => {
    // hide progress message
    dispatch(settingsActions.dbCreateColumnResult(false, {}));
  }, [dispatch]);

  const handleProgressOkMobile = useCallback(() => {
    // hide progress message
    dispatch(settingsActions.dbCreateColumnResult(false, {}));
    dispatch(settingsActions.appClose());
  }, [dispatch]);

  const handleProgressErrorOk = useCallback(() => {
    // hide error message
    dispatch(settingsActions.dbCreateColumnResult(false, { indexing: true, afterError: true }));
  }, [dispatch]);

  const handleProgressErrorOkMobile = useCallback(() => {
    // hide error message
    dispatch(settingsActions.dbCreateColumnResult(false, { indexing: true, afterError: true }));
    dispatch(settingsActions.appClose());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    // hide progress message
    dispatch(settingsActions.dbCreateColumnResult(false, {}));
    dispatch(settingsActions.dbCreateColumnPrepare(false));
  }, [dispatch]);

  const handleStart = useCallback(() => {
    dispatch(settingsActions.dbCreateColumn([{ field: "", type: "indexing" }], { ...config.indexingRequestOptions }));
    dispatch(settingsActions.dbCreateColumnPrepare(false));
  }, [dispatch]);

  const handleStartFast = useCallback(() => {
    handleCancel();
    dispatch(settingsActions.dbBgIndexing({ first: true, action: "modal" }));
  }, [dispatch]);

  if (!columnProgress.indexing && !indexationPrepare) return <></>;
  if (openMobileFilter) return <></>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#4c4c4c8a",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
      }}
    >
      <div>
        {calcIndexingPercent(columnProgress) === 100 ? (
          <div className={classes.messageBox}>
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("success")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <CheckCircleOutlineOutlinedIcon style={{ color: "#219652" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {translations.indexingMsg_1}
                  <br />
                  {translations.indexingMsg_2}
                </div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                {pluginData.mode !== "ZLzPzQWGSuIVmZmglpW8tg==" ? (
                  <Button variant="outlined" disableElevation size="small" onClick={handleProgressOk}>
                    {translations.btnOk}
                  </Button>
                ) : (
                  <Button variant="outlined" disableElevation size="small" onClick={handleProgressOkMobile}>
                    {translations.btnOk}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : columnProgress.error ? (
          <div className={classes.messageBox}>
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("we_are_sorry")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <ErrorOutlineIcon style={{ color: "#EB5757" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {columnProgress.error === "ECONNABORTED" ? (
                    <>
                      {translations.indexingMsg_3}
                      <br />
                      {translations.indexingMsg_4}
                    </>
                  ) : (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: columnProgress.error }}></div>
                      {translations.indexingMsg_5}
                    </>
                  )}
                </div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                {pluginData.mode !== "ZLzPzQWGSuIVmZmglpW8tg==" ? (
                  <Button variant="outlined" disableElevation size="small" onClick={handleProgressErrorOk}>
                    {translations.btnOk}
                  </Button>
                ) : (
                  <Button variant="outlined" disableElevation size="small" onClick={handleProgressErrorOkMobile}>
                    {translations.btnOk}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : indexationPrepare ? (
          <div className={classes.messageBox}>
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("indexation_prepare")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <div style={{ paddingRight: 10 }}>
                  <ErrorOutlineIcon style={{ color: "#EB5757" }} fontSize="large" />
                </div> */}
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>{text("indexation_prepare_info")}</div>
              </div>
              <div style={{ padding: "10px 0" }}></div>
              <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" disableElevation size="small" onClick={handleStart}>
                  {text("full_indexation")}
                </Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="primary" disableElevation size="small" onClick={handleStartFast}>
                  {text("fast_indexation")}
                </Button>
                {pluginData.mode !== "ZLzPzQWGSuIVmZmglpW8tg==" ? (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="outlined" disableElevation size="small" onClick={handleCancel}>
                      {text("CANCEL")}
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.messageBox}>
            <div className={classes.message}>
              <div style={{ fontWeight: 500, paddingBottom: 16, textAlign: "center", fontSize: "18px" }}>{text("increase_search_speed")}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: 10 }}>
                  <InfoOutlinedIcon style={{ color: "#56CCF2" }} fontSize="large" />
                </div>
                <div style={{ fontSize: "16px", lineHeight: "24px" }}>
                  {translations.indexingMsg_6}
                  <br />
                  {translations.indexingMsg_7}
                </div>
              </div>
              {indexingStatus ? (
                <>
                  <div style={{ padding: "10px 0" }}>
                    <LinearProgress variant="determinate" value={calcIndexingPercent(columnProgress)} />
                  </div>
                  <div style={{ textAlign: "center", fontSize: "16px" }}>
                    {columnProgress.total ? (
                      <span>
                        {columnProgress.offset && columnProgress.limit
                          ? columnProgress.offset <= columnProgress.total
                            ? columnProgress.offset
                            : columnProgress.total
                          : 0}{" "}
                        {translations.indexingMsg_8.replace("%d", columnProgress.total)}
                      </span>
                    ) : (
                      <span> </span>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ padding: "10px 0" }}></div>
              )}
              {!indexingStatus && !columnProgress.total ? (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="outlined" disableElevation size="small" onClick={handleCancel}>
                    {text("CANCEL")}
                  </Button>
                  <Button variant="contained" color="primary" disableElevation size="small" onClick={handleStart}>
                    {text("START")}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);
