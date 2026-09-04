import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../../store/posts/actions";
// import * as searchActions from "../../../../store/search/actions";
import SearchResults from "../components/searchResults/SearchResults";
import { Selectors as postsSelectors } from "../../../../store/posts/selectors";
import * as searchModels from "../../../../store/search/models";
// import { ClickAwayListener } from "@material-ui/core";

export interface SearchResultsProps {
  // eslint-disable-next-line no-unused-vars
  onPress(post: any, action: string): void;
  query: string;
  previewPressAction: string;
  resultMessage: searchModels.ResultMessage;
}

const SearchResultsContainer: React.FC<SearchResultsProps> = ({ onPress, previewPressAction, resultMessage }: SearchResultsProps) => {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelectors.getPostsList);

  // const handleClickAway = () => {
  //   if (posts.length) {
  //     dispatch(postsActions.actions.updatePostsList({ list: [] }));
  //     dispatch(searchActions.updateLoaderStatus(true));
  //     dispatch(searchActions.updateLoaderStatus(false));
  //   }
  // };

  const handlePressItem = (post: any, action: string) => {
    onPress(post, action);
    dispatch(postsActions.actions.updatePostsList({ list: [] }));
  };

  return (
    <div>
      {posts.length > 1 ? (
        <SearchResults posts={posts} onPress={handlePressItem} previewPressAction={previewPressAction} resultMessage={resultMessage} />
      ) : null}
    </div>
  );
};

export default memo(SearchResultsContainer);
