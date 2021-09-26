import BasePage from "../../components/BasePage";
import { useState, useEffect } from "react";
import interpolate from "color-interpolate";
import Chart from "../../components/Chart";
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

const Product = ({}) => {
  const [ticker, setTicker] = useState("PETR4");

  const [score, setScore] = useState(0);
  const [scoreE, setScoreE] = useState(0);
  const [scoreS, setScoreS] = useState(0);
  const [scoreG, setScoreG] = useState(0);

  const [loading, setLoading] = React.useState(false);

  const [companyName, setCompanyName] = useState("Petrobrás");
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
          ticker: ticker,
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
    loadData();
  }, [loadData]);

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
            reportUrl="/ranges-ebitda"
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
            ticker={ticker}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <Chart
            reportUrl="/ebitda-growth"
            title="EBITDA"
            reverse={false}
            ticker={ticker}
          />
        </div>
      </div>
      </div>
    </BasePage>
  );
};

export default Product;
