import Plot from "../../../components/Plotly/Plot";
import Slider from "../../../components/Slider";
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
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState([]);

  const layout = {
    title: "",
    xAxis: { title: "" },
    yAxis: { title: "" },
    zAxis: { title: "" },
  };

  const formatData = (data) => {
    const x = [];
    const y = [];

    data.forEach((item) => {
      x.push(item.DATE);

      if(item[ticker] != null) {
        y.push(item[ticker]);
      } else {
        y.push(item[ticker + ".SA"]);
      }

    });

    if (reverse) {
      x.reverse();
      y.reverse();
    }

    return [{
      x,
      y,
      type: "scatter",
      mode: "lines+markers",
    }];

  };

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post(reportUrl, {
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
