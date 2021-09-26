import Plot from "./Plotly/Plot";
import Slider from "./Slider";
import * as React from "react";
import axios from "axios";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const Chart = ({ reportUrl, title, reverse, ticker }) => {
  const _value0 = React.useRef(0);
  const _value1 = React.useRef(30);
  const _value2 = React.useRef(60);
  const _value3 = React.useRef(100);
  const _metric = React.useRef("score");
  const [loading, setLoading] = React.useState(false);

  const [value0, setValue0] = React.useState(_value0.current);
  const [value1, setValue1] = React.useState(_value1.current);
  const [value2, setValue2] = React.useState(_value2.current);
  const [value3, setValue3] = React.useState(_value3.current);
  const [metric, setMetric] = React.useState(_metric.current);

  const [data, setData] = React.useState([]);

  const layout = {
    title: "",
    xAxis: { title: "" },
    yAxis: { title: "" },
    zAxis: { title: "" },
  };

  const formatData = (data) => {
    const colors = ["#f09", "#f90", "#09f"];
    return data.map((row, index) => {
      const x = [];
      const y = [];

      Object.keys(row).forEach((key) => {
        const exclusion = ["E", "S", "G", "score", "portfolio"];
        if (exclusion.indexOf(key) < 0) {
          x.push(key);
          y.push(row[key]);
        }
      });

      if (reverse) {
        x.reverse();
        y.reverse();
      }

      return {
        x,
        y,
        type: "scatter",
        mode: "lines+markers",
        marker: { color: colors[index % colors.length] },
        name: row["portfolio"],
      };
    });
  };

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post(reportUrl, {
          value0: _value0.current,
          value1: _value1.current,
          value2: _value2.current,
          value3: _value3.current,
          metric: _metric.current,
          ticker: ticker,
        })
      ).data;
      setData(formatData(_data));
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const loadMoreData = () => {
    _value0.current = value0;
    _value1.current = value1;
    _value2.current = value2;
    _value3.current = value3;
    _metric.current = metric;
    loadData();
  };

  const setRange0 = ([_value0, _value1]) => {
    setValue0(_value0);
    setValue1(_value1);
  };

  const setRange1 = ([_value1, _value2]) => {
    setValue1(_value1);
    setValue2(_value2);
  };

  const setRange2 = ([_value2, _value3]) => {
    setValue2(_value2);
    setValue3(_value3);
  };

  return (
    <div className="mb-4">
      <h3>{title}</h3>

      {!loading && (
        <Plot style={{ width: "100%" }} data={data} layout={layout} />
      )}
      {loading && (
        <div
          style={{
            minHeight: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="p-4 text-center"
        >
          Carregando...
        </div>
      )}
      <div className="row">
      </div>
    </div>
  );
};

export default Chart;
