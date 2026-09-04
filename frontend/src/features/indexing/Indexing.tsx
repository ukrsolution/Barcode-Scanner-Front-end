import React, { memo } from "react";
import BgIndexingContainer from "./containers/BgIndexingContainer";
import IndexingContainer from "./containers/IndexingContainer";

interface IndexingContainerProps {
  type?: string;
}

const Indexing: React.FC<IndexingContainerProps> = ({ type }: IndexingContainerProps) => {
  return type === "background" ? <BgIndexingContainer /> : <IndexingContainer />;
};

export default memo(Indexing);
