import React, { memo, useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as searchActions from "../../../store/search/actions";
import * as postsActions from "../../../store/posts/actions";
import { parseUpdated } from "../../../helpers/date";
import * as settingsSelectors from "../../../store/settings/selectors";
import usePluginParams from "../../../hooks/usePluginParams";
import * as searchModels from "../../../store/search/models";
import * as settingsActions from "../../../store/settings/actions";
import { getLanguageFlagUrl, messageData } from "../../../helpers/data";
import SearchIcon from "@material-ui/icons/Search";
import ImageIcon from "@material-ui/icons/Image";
import { Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import { HeaderStyle } from "./styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Button from "@material-ui/core/Button";
import { text } from "../../../helpers/languages";
import { copyTextToClipboard } from "../../../helpers/window";

export interface HeaderProps {
  post: any;
  // eslint-disable-next-line no-unused-vars
  onTitleChange: (productId: number, value: any) => void;
}

const Header: React.FC<HeaderProps> = ({ post, onTitleChange }: HeaderProps) => {
  const classes = HeaderStyle();
  const dispatch = useDispatch();

  const loaderStatus = useSelector(searchSelectors.getLoaderStatus);
  const updated = parseUpdated(useSelector(settingsSelectors.getUpdated));
  const inputType: string = useSelector(searchSelectors.getInputType);
  const focusOn = useSelector(searchSelectors.getFocusOn);

  const activeAction = postsActions.buttonActions.MANAGEMENT_INVENTORY;
  const getMessage = useMemo(() => searchSelectors.makeGetMessage(activeAction), [activeAction]);
  const resultMessage: searchModels.ResultMessage = useSelector(getMessage) as any;

  const columnProgress = useSelector(settingsSelectors.getDbCreateColumnProgress);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [title, setTitle] = useState<string>(post.post_title);
  const [creating, setCreating] = useState(false);

  const [pluginData, setPluginData] = useState(usePluginParams());
  const [copyAnim, setCopyAnim] = useState(false);

  const handleTitleFocus = () => {
    // dispatch(searchActions.autoFocus(true, "search"));
    dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.PROD_TITLE }));
  };

  const handleApply = () => {
    const el: HTMLElement | null = document.querySelector("#bs-product-title-editor[contenteditable]");
    if (el) onTitleChange(post.ID, el.innerText);
  };

  const handleChangeTitle = (event: any) => {
    setTitle(event.target.value);
  };

  const handleWpMedia = () => {
    window.parent.postMessage({ message: "iframe.wpMedia", postId: post.ID }, "*");
  };

  const handleUploadImage = (postId: number, attachmentId: number) => {
    dispatch(postsActions.actions.managementInventorySetImage({ postId, attachmentId }));
  };

  const handleCancel = () => {
    setTitle(post.post_title);

    const el: HTMLElement | null = document.querySelector("#bs-product-title-editor[contenteditable]");
    if (el) el.textContent = post.post_title;

    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const receiveMessage = useCallback(
    (event: any) => {
      const data = messageData(event.data, true);

      switch (data.message) {
        case "wp-media-attachment":
          if (data.postId && data.attachment && data.attachment.id) handleUploadImage(data.postId, data.attachment.id);
          break;
      }
    },
    [post]
  );

  const handleCopy = useCallback(() => {
    copyTextToClipboard(post.ID);
    // animation
    setCopyAnim(true);
    setTimeout(() => {
      setCopyAnim(false);
    }, 200);
  }, [post]);

  const handleCreateProduct = (query: string | undefined) => {
    if (!updated.status || !query) return;

    setCreating(true);
    dispatch(postsActions.actions.managementInventoryCreateNew({ query }));
  };

  const handleOptimize = () => {
    dispatch(settingsActions.dbCreateColumnResult(false, { indexing: true }));
  };

  useEffect(() => {
    if (title !== post.post_title) setTitle(post.post_title);
    setCreating(false);
  }, [post]);

  useEffect(() => {
    if (isFirstLoad && loaderStatus) setIsFirstLoad(false);
  }, [loaderStatus]);

  useEffect(() => {
    setIsFirstLoad(true);
  }, [inputType]);

  useEffect(() => {
    setPluginData(usePluginParams());
  }, [columnProgress]);

  useLayoutEffect(() => {
    window.addEventListener("message", receiveMessage, false);

    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, []);

  return (
    <div
      className={classes.root}
      style={{
        height: post.ID ? 100 : 144,
        paddingBottom: post.ID ? 0 : 52,
        paddingTop: post.ID ? 0 : 35,
        justifyContent: "center", //!post.ID || loaderStatus ? "center" : "start",
      }}
    >
      {loaderStatus ? (
        // show loading
        <>
          <div>
            <SearchIcon className={classes.icon} />
          </div>
          <div>
            <span className={classes.resultText}>{text("looking_for_item")}</span>
          </div>
        </>
      ) : post.ID ? (
        // show item details
        <>
          <div>
            {post.product_thumbnail_url ? (
              <a href={updated.status ? post.postEditUrl : "#"} target={updated.status ? "_blank" : ""} rel="noreferrer">
                <img src={post.product_thumbnail_url} className={classes.image} />
              </a>
            ) : (
              <ImageIcon className={classes.icon} style={{ opacity: 0.4, cursor: "pointer" }} onClick={handleWpMedia} />
            )}
          </div>
          <div style={{ position: "relative" }}>
            <div className={classes.name}>
              {post.post_type === "product_variation" ? (
                <>
                  <span className={classes.idWrapper}>
                    <span className={`${classes.copy} ${copyAnim ? classes.copyAnim : ""}`} onClick={handleCopy}>
                      <img src={pluginData.pluginUrl + "assets/icons/copy.svg"} width={20} height={20} />
                    </span>
                    <a href={updated.status ? post.postEditUrl : "#"} target={updated.status ? "_blank" : ""} rel="noreferrer" className={classes.id}>
                      #{post.variation_id}
                    </a>{" "}
                  </span>
                  <span
                    className={classes.prodTitle}
                    style={{ position: "relative", zIndex: focusOn === searchActions.focusTypes.PROD_TITLE ? 100 : "auto" }}
                  >
                    {title}
                  </span>{" "}
                  ({text("variation")})
                </>
              ) : (
                <>
                  <span className={classes.idWrapper}>
                    <span className={`${classes.copy} ${copyAnim ? classes.copyAnim : ""}`} onClick={handleCopy}>
                      <img src={pluginData.pluginUrl + "assets/icons/copy.svg"} width={20} height={20} />
                    </span>
                    <a href={updated.status ? post.postEditUrl : "#"} target={updated.status ? "_blank" : ""} rel="noreferrer" className={classes.id}>
                      #{post.ID}
                    </a>{" "}
                  </span>
                  <span
                    id="bs-product-title-editor"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onMouseDown={handleTitleFocus}
                    className={classes.prodTitle}
                    style={{ position: "relative", zIndex: focusOn === searchActions.focusTypes.PROD_TITLE ? 100 : "auto", userSelect: "auto" }}
                  >
                    {title}
                  </span>
                </>
              )}

              {post.translation && post.translation.language_code ? (
                <img
                  src={getLanguageFlagUrl(post.translation.language_code)}
                  width={18}
                  height={12}
                  style={{ position: "relative", top: 0, marginLeft: 10 }}
                />
              ) : null}
            </div>

            {focusOn === searchActions.focusTypes.PROD_TITLE ? (
              <Grid
                container
                onChange={handleChangeTitle}
                className={classes.inputActions}
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{ position: "absolute", zIndex: 100, bottom: -40, left: "50%", marginLeft: -20, width: 90 }}
              >
                <Grid item xs>
                  <IconButton onClick={handleApply} disabled={loaderStatus || !updated.status} className={classes.inputIconButtonOk}>
                    <DoneIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <IconButton onClick={handleCancel} disabled={loaderStatus} className={classes.inputIconButton}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ) : null}
          </div>
        </>
      ) : resultMessage.message === "ECONNABORTED" ? (
        // ECONNABORTED - timeout error
        <>
          <div style={{ paddingBottom: 5 }}>
            <ErrorOutlineIcon style={{ color: "#EB5757", width: 48, height: 48 }} fontSize="large" />
          </div>
          <div>
            <span className={classes.resultText}>
              {text("search_too_long")}
              <br />
              {pluginData.settings.general?.dbOwnSearch === "on" ? "Check internet connection." : "Try to optimize search."}
            </span>
            {pluginData.settings.general?.dbOwnSearch !== "on" ? (
              <div style={{ padding: "10px 0 0 20px" }}>
                <Button variant="contained" color="primary" disableElevation onClick={handleOptimize}>
                  {text("optimize_search")}
                </Button>
              </div>
            ) : null}
          </div>
        </>
      ) : isFirstLoad || !resultMessage.query ? (
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
              <span className={classes.resultText}>{text("scan_barcode")}</span>
            ) : (
              <span className={classes.resultText}>{text("type_fields")}</span>
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
            <span className={classes.resultText}>{text("not_found")}</span>
          </div>
          <div style={{ position: "relative" }}>
            {creating ? (
              <div style={{ position: "absolute", bottom: -85, left: -86 }}>
                <CircularProgress size={24} color="inherit" />
              </div>
            ) : (
              <a href="#" onClick={() => handleCreateProduct(resultMessage.query)} className={classes.createBtn}>
                {text("create")}
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Header);
