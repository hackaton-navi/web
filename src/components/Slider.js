import * as React from "react";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}`;
}

const _Slider = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      valueLabelFormat={(value) => (
        <div style={{ color: "black" }}>{value}</div>
      )}
    />
  );
};

export default _Slider;
