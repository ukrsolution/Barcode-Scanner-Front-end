import React, { memo } from "react";
import usePluginParams, { CustomSearchFilter } from "../../../../hooks/usePluginParams";
import Dropdown from "./Dropdown";

const CustomSearchFilters: React.FC = () => {
  const pluginData = usePluginParams();

  if (!pluginData.customSearchFilters || pluginData.customSearchFilters.length === 0) return <></>;

  return (
    <>
      {pluginData.customSearchFilters.map((filter: CustomSearchFilter, index: number) => (
        <Dropdown key={index} filter={filter} />
      ))}
    </>
  );
};

export default memo(CustomSearchFilters);
