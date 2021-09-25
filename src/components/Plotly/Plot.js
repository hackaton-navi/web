import Plot from "react-plotly.js";
import colorLayout from "./layout";

const _Plot = ({ layout, ...rest }) => {
  function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  }
  return <Plot layout={{ ...mergeDeep(colorLayout, layout) }} {...rest}></Plot>;
};

export default _Plot;
