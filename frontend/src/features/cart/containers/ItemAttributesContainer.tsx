import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../store/actions";
import * as searchActions from "../../../store/search/actions";
import { Selectors as cartSelectors } from "../store/selectors";
import Attribute from "../components/attributes/Attribute";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { ItemAttributesContainerStyle } from "./styles";
import { text } from "../../../helpers/languages";

const ItemAttributesContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = ItemAttributesContainerStyle();

  const item: any = useSelector(cartSelectors.getItemAttributes);
  const attributes = item.requiredAttributes || {};

  const [attrValues, setAttrValues] = useState({});

  const handleCancel = () => {
    dispatch(cartActions.actions.updateItemAttributes({ item: {} }));
    dispatch(searchActions.actions.autoFocus({ status: true, focusOn: searchActions.focusTypes.SEARCH }));
  };

  const handleApplyAttributes = () => {
    const newAttrs: any = {
      ...item.attributes,
      ...attrValues,
    };
    let list: any = {};

    for (const key in newAttrs) {
      if (Object.prototype.hasOwnProperty.call(newAttrs, key)) {
        const listItem: any = newAttrs[key];
        list[`attribute_${key}`] = listItem;
      }
    }

    dispatch(cartActions.actions.updateAttributes({ item: item, attributes: list }));
  };

  const handleChangeAttribute = (taxonomy: string, slug: string) => {
    setAttrValues({
      ...attrValues,
      [taxonomy]: slug,
    });
  };

  useEffect(() => {
    if (item.ID) {
      setAttrValues({});
      dispatch(searchActions.actions.autoFocus({ status: false, focusOn: searchActions.focusTypes.CART_ITEM_ATTRIBUTES }));
    }
  }, [dispatch, item]);

  if (!item.ID) return <></>;

  return (
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: "100%" }}>
        <Grid item xs={9}>
          <div className={classes.productName}>{item.post_title}</div>
          <div className={classes.label}>{text("fill_attributes")}</div>
        </Grid>
        <Grid item xs={9}>
          {Object.keys(attributes).map((key) => {
            return <Attribute key={key} taxonomy={key} attributes={attributes[key]} onChange={handleChangeAttribute} />;
          })}
        </Grid>
        <Grid item xs={6} className={classes.actions}>
          <Button variant="contained" color="default" disableElevation onClick={handleCancel}>
            {text("cancel_attributes")}
          </Button>
          <Button variant="contained" color="primary" disableElevation onClick={handleApplyAttributes}>
            {text("apply_attributes")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(ItemAttributesContainer);
