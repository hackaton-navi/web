import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import interpolate from "color-interpolate";
import axios from "axios";

const HeatMap = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const colors = ["#e67e22", "#ffffff", "#3498db"];
    const loadData = async () => {
      setLoading(true);
      try {
        let _data = (await axios.get("/stocks")).data;
        const table = createTable(_data);
        _data = loadColors(table, colors);
        setData(_data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadData();
  }, []);

  const cols = 12;
  const textColor = "black";

  const createTable = (data) => {
    const _data = [];
    let row = [];
    let iData = 0;
    for (iData = 0; iData < data.length; iData++) {
      row.push(data[iData]);
      if ((iData + 1) % cols === 0) {
        _data.push(row);
        row = [];
      }
    }
    return _data;
  };

  const loadColors = (data, colors) => {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;
    let colormap = interpolate(colors);
    data.forEach((row) => {
      row.forEach((col) => {
        if (col.score > max) max = col.score;
        if (col.score < min) min = col.score;
      });
    });

    data = data.map((row) => {
      return row.map((col) => {
        const normalize = (col.score - min) / (max - min);
        col.color = colormap(normalize);
        return col;
      });
    });

    return data;
  };

  const size = 100;

  return (
    <div>
      <ReactTooltip />
      {loading && <div className="p-4 text-center">Carregando...</div>}
      {!loading && (
        <table className="table table-stripped w-auto">
          {data.map((row) => {
            return (
              <tr style={{ height: size }}>
                {row.map((col) => {
                  return (
                    <td
                      style={{
                        border: "1px solid white",
                        backgroundColor: col.color,
                        // width: size,
                      }}
                      className="col-1"
                    >
                      <div
                        data-tip={`Environment: ${col.E.toFixed(
                          2
                        )} <br>Social: ${col.S.toFixed(
                          2
                        )}<br>Governance: ${col.G.toFixed(2)}`}
                        data-html={true}
                        style={{ color: textColor }}
                        className="text-center w-100 h-100 d-inline-flex justify-content-center align-items-center"
                      >
                        {col.ticker} ({col.score.toFixed(2)})
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default HeatMap;
