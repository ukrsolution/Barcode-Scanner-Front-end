import React, { memo } from "react";
import * as postsActions from "../../../store/posts/actions";
import Search from "../../search";

const FinderContainer: React.FC = () => {
  return (
    <div className="barcode-scanner-modal" style={{ minWidth: 535, marginBottom: 20 }}>
      <Search activeAction={postsActions.buttonActions.FIND_POST} />
    </div>
  );
};

export default memo(FinderContainer);
