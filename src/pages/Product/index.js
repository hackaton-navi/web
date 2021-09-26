import BasePage from "../../components/BasePage";
import { useState, useEffect } from "react";
import interpolate from "color-interpolate";
import Chart from "./Chart";
import * as React from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

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

/*function getTickerfromURL() {
  let query = URLSearchParams(useLocation().search);
  return query.get("ticker");
}*/

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Product = ({match}) => {
  let query = useQuery();
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
    if(!loading)
      return (
        <div className="row">
          <p>Region: {region}</p>
          <p>Country: {country}</p>
          <p>Exchange: {exchange}</p>
          <p>Industry: {industry}</p>
          <p>Trading Status: {tradingStatus}</p>
        </div>
      );
  }

  return (
    <BasePage title="Product">
      <h3>{companyName}</h3>
      <div className="row">
      <div className="col-4">
        <div className="row">
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
        <div className="row">
          <Chart
            reportUrl="/esg-data"
            title="Evolução ESG Score"
            reverse={true}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <Chart
            reportUrl="/historical-price"
            title="Retorno"
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
