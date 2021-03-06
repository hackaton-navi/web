import BasePage from "../../components/BasePage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import interpolate from "color-interpolate";
import Chart from "./Chart";
import * as React from "react";
import axios from "axios";

const ColoredNumber = ({ number, text, className }) => {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    const colors = ["#e74c3c", "#3498db", "#1abc9c"];
    let colormap = interpolate(colors);
    const min = 0;
    const max = 100;
    const normalize = (number - min) / (max - min);
    setColor(colormap(normalize));
  }, [number]);

  return (
    <div className={`text-center ${className}`}>
      <div style={{ fontSize: 40, color: color }}>{number?.toFixed(2)}</div>
      <div>{text}</div>
    </div>
  );
};

const Product = ({ match }) => {
  const [ticker, setTicker] = useState("");

  const [score, setScore] = useState(0);
  const [scoreE, setScoreE] = useState(0);
  const [scoreS, setScoreS] = useState(0);
  const [scoreG, setScoreG] = useState(0);

  const [loading, setLoading] = React.useState(false);

  const [companyName, setCompanyName] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [exchange, setExchange] = useState("");
  const [industry, setIndustry] = useState("");
  const [tradingStatus, setTradingStatus] = useState("");

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post("/esg-data", {
          ticker: match.params.ticker,
        })
      ).data[0];
      formatData(_data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    console.log(match.params.ticker);
    //setTicker(match.params.ticker);
    loadData();
  }, [loadData, match]);

  const formatData = (data) => {
    setCompanyName(data.company_name);
    setScore(data.score);
    setScoreE(data.E);
    setScoreS(data.S);
    setScoreG(data.G);
    setRegion(data.region);
    setCountry(data.country);
    setExchange(data.exchange);
    setIndustry(data.industry);
    setTradingStatus(data.trading_status);
  };

  const showStats = () => {
    if (!loading)
      return (
        <table className="table table-striped my-5">
          <tbody>
            <tr>
              <td>Regi??o</td>
              <td>{region}</td>
            </tr>
            <tr>
              <td>Pa??s</td>
              <td>{country}</td>
            </tr>
            <tr>
              <td>Bolsa</td>
              <td>{exchange}</td>
            </tr>
            <tr>
              <td>Setor</td>
              <td>{industry}</td>
            </tr>
            <tr>
              <td>Status de Negocia????o</td>
              <td>{tradingStatus}</td>
            </tr>
          </tbody>
        </table>
      );
  };

  return (
    <BasePage title="Product">
      <h3>
        <Link to="/filter" className="mr-2">
          <i className="fa fa-arrow-left text-white"></i>
        </Link>{" "}
        {companyName}
      </h3>
      <div className="row">
        <div className="col-4">
          <div className="row mt-5">
            <ColoredNumber
              className="col-3"
              number={score}
              text="ESG Score"
            ></ColoredNumber>
            <ColoredNumber
              className="col-3"
              number={scoreE}
              text="Environment Score"
            ></ColoredNumber>
            <ColoredNumber
              className="col-3"
              number={scoreS}
              text="Social Score"
            ></ColoredNumber>
            <ColoredNumber
              className="col-3"
              number={scoreG}
              text="Government Score"
              color="#f09"
            ></ColoredNumber>
          </div>
          {showStats()}
        </div>
        <div className="col-4">
          <div className="row">
            <Chart
              reportUrl="/historical-price"
              title="Pre??o Hist??rico"
              reverse={true}
              ticker={match.params.ticker}
            />
          </div>
          <div className="row">
            <Chart
              reportUrl="/esg-growth"
              title="Evolu????o ESG Score"
              reverse={true}
              ticker={match.params.ticker}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <Chart
              reportUrl="/ebitda-growth"
              title="EBITDA"
              reverse={true}
              ticker={match.params.ticker}
            />
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default Product;
