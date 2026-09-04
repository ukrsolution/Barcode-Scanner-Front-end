import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Selectors } from "../../../../store/search/selectors";
import { HeaderStyle } from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import ImageIcon from "@material-ui/icons/Image";

export interface HeaderProps {
  post: any;
  onDescription: () => void;
}

const Header: React.FC<HeaderProps> = ({ post, onDescription }: HeaderProps) => {
  const classes = HeaderStyle();

  const loaderStatus = useSelector(Selectors.getLoaderStatus);

  return (
    <div className={classes.root} style={{ minHeight: post.ID ? 108 : 144, paddingBottom: post.ID ? 0 : 46 }}>
      {loaderStatus ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <div>
            <SearchIcon className={classes.icon} />
          </div>
          <div>
            <span className={classes.name}>Looking for item...</span>
          </div>
        </div>
      ) : post.ID ? (
        <>
          <div>
            {post.product_thumbnail_url ? (
              <img src={post.product_thumbnail_url} className={classes.image} />
            ) : (
              <ImageIcon className={classes.icon} style={{ opacity: 0.4 }} />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div className={classes.title}>
              {post.post_type === "product_variation" ? `#${post.variation_id} ${post.post_title} (variation)` : `#${post.ID} ${post.post_title}`}
            </div>
            <div>
              <div className={classes.type}>{post.product_type}</div>
              <div className={classes.description} onClick={onDescription}>
                Description
              </div>
            </div>
            {/* <div className={classes.description} dangerouslySetInnerHTML={{ __html: urlDecode(post.product_desc) }}></div> */}
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <div>
            <SearchIcon className={classes.icon} />
          </div>
          <div>
            <span className={classes.name}>Not found</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Header);
