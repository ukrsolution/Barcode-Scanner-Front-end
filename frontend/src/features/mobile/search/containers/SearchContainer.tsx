import React, { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../../store/posts/actions";
import * as cartActions from "../../../cart/store/actions";
import * as searchActions from "../../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../../store/search/selectors";
import * as searchModels from "../../../../store/search/models";
import SearchField from "../components/SearchField";
import SearchResultsContainer from "./SearchResultsContainer";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import { Button, CircularProgress } from "@material-ui/core";
import { InventoryContainerStyle } from "../../inventory/containers/styles";
import { MobileCommandProps } from "../../scanning/containers/ScanningContainer";
import * as mobileCommandsActions from "../../../../store/mobile/commands/actions";
import { text } from "../../../../helpers/languages";
import * as settingsActions from "../../../../store/settings/actions";
import * as settingsSelectors from "../../../../store/settings/selectors";

export interface SendingParamsProps {
  delay: number;
  interval: any;
}

export interface SearchContainerProps {
  activeAction: string;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ activeAction }: SearchContainerProps) => {
  const dispatch = useDispatch();
  const classesInv = InventoryContainerStyle();

  const [searchString, setSearchString] = useState("");
  const [sendingParams, setSendingParams] = useState<SendingParamsProps>({ delay: 0, interval: null });
  const mobileSearch = useSelector(searchSelectors.getMobileSearch);
  // const updated = parseUpdated(useSelector(settingsSelectors.getUpdated));
  const postToManagement: any = useSelector(postsSelectors.getPostToManagement);
  const loaderStatus = useSelector(postsSelectors.getLoaderStatus);
  const reloadProcLoader = useSelector(settingsSelectors.getReloadProcLoader);

  const getMessage = useMemo(() => searchSelectors.makeGetMessage(activeAction), [activeAction]);
  const resultMessage: searchModels.ResultMessage = useSelector(getMessage) as any;

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchString(value);
      dispatch(postsActions.actions.updatePostsList({ list: [] }));

      clearTimeout(sendingParams.interval);

      if (value.length > 0) {
        setSendingParams({
          ...sendingParams,
          interval: setTimeout(() => {
            handleStartProcess(value);
          }, sendingParams.delay),
        });
      }
    },
    [dispatch, searchString, sendingParams]
  );

  const handleStartProcess = useCallback(
    (query = "", autoFill = false) => {
      let searchQuery: string = query || searchString;
      if (searchQuery) searchQuery = `${searchQuery}`.trim();

      setSearchString(searchQuery);

      if (!searchQuery) return;

      switch (activeAction) {
        case postsActions.buttonActions.FIND_POST:
          dispatch(postsActions.actions.searchToOpenPage({ query: searchQuery, autoFill }));
          break;
        case postsActions.buttonActions.MANAGEMENT_INVENTORY:
          dispatch(postsActions.actions.managementInventory({ query: searchQuery, autoFill }));
          break;
        case postsActions.buttonActions.MANAGEMENT_ORDER:
          dispatch(postsActions.actions.managementOrder({ query: searchQuery, autoFill }));
          break;
        case postsActions.buttonActions.CREATE_ORDER:
          dispatch(cartActions.actions.addItem({ query: searchQuery, autoFill: false, byId: false, setQty: null }));
          break;
      }
    },
    [dispatch, searchString, activeAction]
  );

  const handlePreviewPress = useCallback(
    (post: any, action: string) => {
      switch (action) {
        case postsActions.buttonActions.FIND_POST:
          // open post in a new tab
          window.open(post.postEditUrl, "_blank");
          break;
        case postsActions.buttonActions.MANAGEMENT_INVENTORY:
          dispatch(postsActions.actions.managementInventoryFromPreview({ postId: post.ID }));
          break;
        case postsActions.buttonActions.MANAGEMENT_ORDER:
          dispatch(postsActions.actions.managementOrderFromPreview({ postId: post.ID }));
          break;
        case postsActions.buttonActions.CREATE_ORDER:
          dispatch(cartActions.actions.addItem({ query: post.ID, autoFill: false, byId: true, setQty: null }));
          break;
      }
    },
    [dispatch, searchString, activeAction]
  );

  const handleInputType = useCallback(
    (type: string) => {
      dispatch(searchActions.actions.setInputType({ type }));
    },
    [dispatch]
  );

  const handleClose = () => {
    const data: MobileCommandProps = {
      message: "mobile.postMessage",
      method: mobileCommandsActions.commands.CMD_BOTTOM_DRAWER_CLOSE,
      options: {},
    };
    window.parent.postMessage(data, "*");
  };

  const handleCheckAgain = () => {
    dispatch(settingsActions.reloadProc());
  };

  useLayoutEffect(() => {
    dispatch(searchActions.actions.finished());
  }, [dispatch]);

  return (
    <div style={{ position: "relative" }}>
      <div style={mobileSearch ? {} : { height: 0, maxHeight: 0, overflow: "hidden" }}>
        <SearchField
          resultMessage={resultMessage}
          onChange={handleSearchChange}
          onSearch={handleStartProcess}
          onInputType={handleInputType}
          defaultValue={searchString}
          activeAction={activeAction}
        />
      </div>
      {!postToManagement.ID && resultMessage.type === searchActions.messageTypes.GENERAL && resultMessage.message ? (
        <div>
          {!loaderStatus ? (
            <>
              <div
                style={{ fontSize: 18, lineHeight: "21.09px", textAlign: "center", paddingBottom: resultMessage.message ? 24 : 0 }}
                dangerouslySetInnerHTML={{ __html: resultMessage.message.replaceAll(/&apos;/gi, `'`).replaceAll(/&quot;/gi, `"`) }}
              ></div>
              <div style={{ display: "flex", justifyContent: "space-around", whiteSpace: "nowrap" }}>
                {/* {resultMessage.message != "ECONNABORTED" ? (
                  <Button
                    onClick={() => handleCreateProduct(resultMessage.query)}
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={classesInv.panelButton}
                  >
                    Create
                  </Button>
                ) : null} */}
                {resultMessage.params?.checkAgain ? (
                  <div>
                    {reloadProcLoader ? (
                      <div>
                        <CircularProgress size={24} color="inherit" />
                      </div>
                    ) : (
                      <Button onClick={handleCheckAgain} variant="contained" disableElevation className={classesInv.panelButtonCancel}>
                        {text("err_check_again")}
                      </Button>
                    )}
                  </div>
                ) : (
                  <Button onClick={handleClose} variant="contained" disableElevation className={classesInv.panelButtonCancel}>
                    {text("err_close")}
                  </Button>
                )}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
      <SearchResultsContainer query={searchString} onPress={handlePreviewPress} previewPressAction={activeAction} resultMessage={resultMessage} />
    </div>
  );
};

export default memo(SearchContainer);
