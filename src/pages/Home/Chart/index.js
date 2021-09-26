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

const Chart = ({ reportUrl, title, reverse }) => {
  const _value0 = React.useRef(0);
  const _value1 = React.useRef(30);
  const _value2 = React.useRef(60);
  const _value3 = React.useRef(100);
  const _metric = React.useRef("score");
  const _sector = React.useRef("Todos");
  const _mc_cohort1 = React.useRef(0);
  const _mc_cohort2 = React.useRef(100);

  const [loading, setLoading] = React.useState(false);

  const [value0, setValue0] = React.useState(_value0.current);
  const [value1, setValue1] = React.useState(_value1.current);
  const [value2, setValue2] = React.useState(_value2.current);
  const [value3, setValue3] = React.useState(_value3.current);
  const [metric, setMetric] = React.useState(_metric.current);
  const [sector, setSector] = React.useState(_sector.current);
  const [mc_cohort1, setMcCohort1] = React.useState(_mc_cohort1.current);
  const [mc_cohort2, setMcCohort2] = React.useState(_mc_cohort2.current);

  const [sectors, setSectors] = React.useState([]);

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
          sector: _sector.current,
          mc_cohort1: _mc_cohort1.current,
          mc_cohort2: _mc_cohort2.current,
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
    const loadSectors = async () => {
      try {
        const data = (await axios.get("/sectors")).data;
        setSectors(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadSectors();
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
    _sector.current = sector;
    _mc_cohort1.current = mc_cohort1;
    _mc_cohort2.current = mc_cohort2;
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

  const setMcCohorts = ([_value1, _value2]) => {
    setMcCohort1(_value1);
    setMcCohort2(_value2);
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
        <div className="col-2 form-group">
          <label>Setor: </label>
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="form-control"
          >
            <option>Todos</option>
            {sectors.map((sector) => (
              <option value={sector.industry}>
                {sector.industry} ({sector.amount})
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <p>Cortes de Market Cap</p>
          <Slider value={[mc_cohort1, mc_cohort2]} setValue={setMcCohorts} />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <p>Menores Scores</p>
          <Slider value={[value1, value0]} setValue={setRange0} />
        </div>
        <div className="col-3">
          <p>Médios Scores</p>
          <Slider value={[value2, value1]} setValue={setRange1} />
        </div>
        <div className="col-3">
          <p>Maiores Scores</p>
          <Slider value={[value3, value2]} setValue={setRange2} />
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

export default Chart;
