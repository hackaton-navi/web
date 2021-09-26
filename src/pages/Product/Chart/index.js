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

  const formatESGPlot = (data) => {
    const colors = ["#f09", "#f90", "#09f", "#90f"];
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
        name: row["metric"],
      };
    });
  };

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post(reportUrl, {
          ticker: ticker,
        })
      ).data;

      if(reportUrl == "/esg-growth") {
        setData(formatESGPlot(_data));
      } else {
        setData(formatData(_data));
      }

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
