import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from "../../../store/posts/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import SearchResults from "../components/searchResults/SearchResults";
import { Selectors } from "../../../store/posts/selectors";
import { ClickAwayListener } from "@material-ui/core";

export interface SearchResultsProps {
  // eslint-disable-next-line no-unused-vars
  onPress(post: any, action: string): void;
  query: string;
  previewPressAction: string;
}

const SearchResultsContainer: React.FC<SearchResultsProps> = ({ query, onPress, previewPressAction }: SearchResultsProps) => {
  const dispatch = useDispatch();

  const posts = useSelector(Selectors.getPostsList);
  const inputType: string = useSelector(searchSelectors.getInputType);

  const handleClickAway = () => {
    if (posts.length) {
      dispatch(postsActions.actions.updatePostsList({ list: [] }));
      dispatch(searchActions.actions.updateLoaderStatus({ status: true, postId: 0 }));
      dispatch(searchActions.actions.updateLoaderStatus({ status: false, postId: 0 }));
    }
  };

  useEffect(() => { }, [posts]);

  query = "test";

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        {(query.length || inputType === searchActions.inputTypes.ENTER) > 0 && posts.length ? (
          <SearchResults posts={posts} onPress={onPress} previewPressAction={previewPressAction} />
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default memo(SearchResultsContainer);
