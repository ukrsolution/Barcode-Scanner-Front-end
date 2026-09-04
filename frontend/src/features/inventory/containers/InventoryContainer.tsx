import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switcher from "../components/Switcher";
import Header from "../components/Header";
import PostManagement from "../components/postManagement/PostManagement";
import Search from "../../search";
import { Selectors as postsSelectors } from "../../../store/posts/selectors";
import { RequestTypesProps } from "../../../store/search/actions";
import * as searchActions from "../../../store/search/actions";
import * as postsActions from "../../../store/posts/actions";
import { InventoryContainerStyle } from "./styles";
import SoundButton from "../components/SoundButton";
import * as actionsSounds from "../../sounds/store/actions";
import { Selectors as searchSelectors } from "../../../store/search/selectors";
import { getActiveModalTab } from "../../../store/settings/selectors";
import { text } from "../../../helpers/languages";
import Locations from "../components/locations/Locations";
import usePluginParams from "../../../hooks/usePluginParams";
import PPLocations from "../components/ppLocations/PPLocations";

const InventoryContainer: React.FC = () => {
  const dispatch = useDispatch();
  const classes = InventoryContainerStyle();
  const pluginData = usePluginParams();

  const postToManagement: any = useSelector(postsSelectors.getPostToManagement);
  const postAutoAction = useSelector(postsSelectors.getPostAutoAction);
  const inputType: string = useSelector(searchSelectors.getInputType);
  const activeTab: number = useSelector(getActiveModalTab);
  const openMobileFilter = useSelector(searchSelectors.getOpenMobileFilter);

  const [prevInputType, setPrevInputType] = useState(inputType);

  const emptyProduct: any = {
    product_manage_stock: true,
    post_title: "Product name",
    product_quantity: 0,
    product_regular_price: 0,
    product_sale_price: 0,
  };
  const requestTypesList: Array<RequestTypesProps> = [
    { value: searchActions.requestTypes.OPEN, label: text("open_product"), tooltip: text("find_item_and_open") },
    {
      value: searchActions.requestTypes.AUTO_DECREASING,
      label: text("stock_minus"),
      tooltip: text("stock_minus_info"),
    },
    {
      value: searchActions.requestTypes.AUTO_INCREASING,
      label: text("stock_plus"),
      tooltip: text("stock_plus_info"),
    },
  ];

  const [activeAction, setActiveAction] = useState<string>(requestTypesList.find((s: any) => s.value === postAutoAction)?.value ?? "");

  const handleActionType = useCallback(
    (value: string) => {
      setActiveAction(value);
      dispatch(postsActions.actions.managementInventoryAutoAction({ action: value }));
    },
    [dispatch, activeAction]
  );

  const handleTitleChange = useCallback(
    (productId: number, value: string) => {
      dispatch(postsActions.actions.managementInventoryUpdateTitle({ productId, value }));
    },
    [dispatch]
  );

  const handleSound = useCallback(
    (value: boolean) => {
      dispatch(actionsSounds.actions.setSoundStatus({ status: value }));
    },
    [dispatch, activeAction]
  );

  useEffect(() => {
    if (prevInputType !== inputType) {
      dispatch(postsActions.actions.updatePostManagement({ post: {} }));
      dispatch(postsActions.actions.updateOrderManagement({ order: {} }));
      setPrevInputType(inputType);
    }

    dispatch(searchActions.actions.autofill({ query: "" }));

    if (activeTab !== 0) {
      dispatch(searchActions.actions.updateMessage({
        place: postsActions.buttonActions.MANAGEMENT_INVENTORY,
        message: "",
        type: searchActions.messageTypes.GENERAL,
        query: "",
        params: {}
      }));
    }
  }, [dispatch, inputType]);

  return (
    <div className="barcode-scanner-modal" style={{ minWidth: 535 }}>
      {openMobileFilter ? <Search activeAction={postsActions.buttonActions.MANAGEMENT_INVENTORY} /> : null}
      {pluginData.mode !== "ZLzPzQWGSuIVmZmglpW8tg==" ? (
        <>
          <Search activeAction={postsActions.buttonActions.MANAGEMENT_INVENTORY} />
          <Header post={postToManagement.ID ? postToManagement : emptyProduct} onTitleChange={handleTitleChange} />
          <PostManagement post={postToManagement.ID ? postToManagement : emptyProduct} activeAction={activeAction} />
        </>
      ) : null}
    </div>
  );
};

export default memo(InventoryContainer);
