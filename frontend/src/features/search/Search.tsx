import React, { memo } from "react";
import SearchContainer from "./containers/SearchContainer";

export interface SearchProps {
  activeAction: string;
}

const Search = ({ activeAction }: SearchProps) => {
  return <SearchContainer activeAction={activeAction} />;
};

export default memo(Search);
