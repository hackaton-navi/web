import Plot from "../../../components/Plotly/Plot";
import * as React from "react";
import axios from "axios";
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const ScatterChart = ({ reportUrl, title, reverse }) => {
  const _metric = React.useRef("score");

  const [loading, setLoading] = React.useState(false);

  const [metric, setMetric] = React.useState(_metric.current);

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
    const text = [];

    data.forEach((row) => {
      x.push(row["delta_alpha"]);
      y.push(row["delta_metric"]);
      text.push(`${row["ticker"]} - ${row["assessment_year"]}`);
    });

    return [
      {
        x,
        y,
        mode: "markers",
        type: "scatter",
        text,
        marker: { size: 12 },
      },
    ];
  };

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post(reportUrl, {
          metric: _metric.current,
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
    _metric.current = metric;
    loadData();
  };

  return (
    <div className="col-6 mb-4">
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
        <div className="col-6">
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ color: "white" }}>
              Métrica
            </FormLabel>
            <RadioGroup
              row
              aria-label="metric"
              defaultValue="score"
              name="radio-buttons-group"
              value={metric}
              onChange={(event) => setMetric(event.target.value)}
            >
              <FormControlLabel
                value="score"
                control={<Radio />}
                label="ESG Score"
              />
              <FormControlLabel
                value="E"
                control={<Radio />}
                label="Environment"
              />
              <FormControlLabel value="S" control={<Radio />} label="Social" />
              <FormControlLabel
                value="G"
                control={<Radio />}
                label="Government"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-3" style={{ position: "relative" }}>
          <button
            style={{ position: "absolute", bottom: 0 }}
            className="btn btn-primary w-50"
            onClick={loadMoreData}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScatterChart;
