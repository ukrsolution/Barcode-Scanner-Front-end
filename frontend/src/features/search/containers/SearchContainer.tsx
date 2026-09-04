import React, { memo, useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts/actions";
import * as cartActions from "../../cart/store/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import * as searchModels from "../../../store/search/models";
import SearchField from "../components/SearchField";
import SearchResultsContainer from "./SearchResultsContainer";

export interface SendingParamsProps {
  delay: number;
  interval: any;
}

export interface SearchContainerProps {
  activeAction: string;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ activeAction }: SearchContainerProps) => {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [sendingParams, setSendingParams] = useState<SendingParamsProps>({
    delay: 0,
    interval: null,
  });

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
      const searchQuery: string = query || searchString;

      if (!searchQuery.trim()) return;

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
          dispatch(cartActions.actions.addItem({ query: searchQuery, autoFill, byId: false, setQty: null }));
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

  useLayoutEffect(() => {
    dispatch(searchActions.actions.finished());
  }, [dispatch]);

  return (
    <div style={{ position: "relative" }}>
      <SearchField
        resultMessage={resultMessage}
        onChange={handleSearchChange}
        onSearch={handleStartProcess}
        onInputType={handleInputType}
        defaultValue={searchString}
        activeAction={activeAction}
      />
      <SearchResultsContainer query={searchString} onPress={handlePreviewPress} previewPressAction={activeAction} />
    </div>
  );
};

export default memo(SearchContainer);
