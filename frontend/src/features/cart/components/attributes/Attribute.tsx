import React, { memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { AttributeStyle } from "./styles";

export interface AttributesProps {
  label: string;
  values: Array<any>;
}

export interface AttributeProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (taxonomy: string, slug: string) => void;
  taxonomy: string;
  attributes: AttributesProps;
}

const Attribute: React.FC<AttributeProps> = ({ taxonomy, attributes, onChange }: AttributeProps) => {
  const classes = AttributeStyle();

  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    const val: string = event.target.value;

    setValue(val);
    onChange(taxonomy, val);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{attributes.label}</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} onChange={handleChange}>
          {attributes.values.map((attr: any, index: number) => {
            return (
              <MenuItem key={index} value={attr.slug}>
                {attr.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default memo(Attribute);
