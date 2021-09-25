import { useState, useEffect } from "react";
import interpolate from "color-interpolate";

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

const Portfolio = ({ stocks, stockManage }) => {
  const [avgScore, setAvgScore] = useState(0);
  const [avgScoreE, setAvgScoreE] = useState(0);
  const [avgScoreS, setAvgScoreS] = useState(0);
  const [avgScoreG, setAvgScoreG] = useState(0);

  useEffect(() => {
    const getAvgForProperty = (property) => {
      let total = 0;
      let count = 0;

      stocks.forEach((stock) => {
        total += stock[property];
        count++;
      });

      return count > 0 ? total / count : 0;
    };

    setAvgScore(getAvgForProperty("score"));
    setAvgScoreE(getAvgForProperty("E"));
    setAvgScoreS(getAvgForProperty("S"));
    setAvgScoreG(getAvgForProperty("G"));
  }, [stocks]);

  return (
    <div>
      <div className="row mb-5">
        <ColoredNumber
          className="col-3"
          number={avgScore}
          text="ESG score médio"
        ></ColoredNumber>
        <ColoredNumber
          className="col-3"
          number={avgScoreE}
          text="Environment score médio"
        ></ColoredNumber>
        <ColoredNumber
          className="col-3"
          number={avgScoreS}
          text="Social score médio"
        ></ColoredNumber>
        <ColoredNumber
          className="col-3"
          number={avgScoreG}
          text="Government score médio"
          color="#f09"
        ></ColoredNumber>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Ação</th>
            <th scope="col">Environment</th>
            <th scope="col">Social</th>
            <th scope="col">Governance</th>
            <th scope="col">ESG Score</th>
            <th scope="col">Remover</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr>
                <td>{stock.ticker}</td>
                <td>{stock.E.toFixed(2)}</td>
                <td>{stock.S.toFixed(2)}</td>
                <td>{stock.G.toFixed(2)}</td>
                <td>{stock.score.toFixed(2)}</td>
                <td>
                  <button
                    onClick={(e) => stockManage.removeStock(stock.ticker)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-times text-white"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
