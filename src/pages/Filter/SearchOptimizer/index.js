import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Table = ({ data }) => {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">Ação</th>
          <th scope="col">Environment</th>
          <th scope="col">Social</th>
          <th scope="col">Governance</th>
          {/* <th scope="col">ESG Score</th> */}
          <th scope="col">EBITDA</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          return (
            <tr>
              <td>{stock.ticker}</td>
              <td>{stock.E}</td>
              <td>{stock.S}</td>
              <td>{stock.G}</td>
              {/* <td>{stock.score}</td> */}
              <td>{stock.avg_ebitda_return}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const SearchOptimizer = () => {
  const [e, setE] = useState(30);
  const [s, setS] = useState(50);
  const [g, setG] = useState(25);
  const [amount, setAmount] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post("/optimize", {
          e,
          s,
          g,
          amount,
        })
      ).data;
      console.log(_data);
      setData(_data);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <h4>Otimizador de Busca</h4>
      <div className="row">
        <div className="col-2 form-group">
          <label>Valor mínimo componente E:</label>
          <input
            value={e}
            onChange={(e) => setE(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente S:</label>
          <input
            value={s}
            onChange={(e) => setS(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente G:</label>
          <input
            value={g}
            onChange={(e) => setG(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Número de Ações:</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-4" style={{ position: "relative" }}>
          <button
            style={{ position: "absolute", bottom: 0 }}
            className="btn btn-primary w-50"
            onClick={(e) => {
              loadData();
            }}
          >
            Otimizar Busca
          </button>
        </div>
      </div>
      {!loading && <Table data={data} />}
      {loading && <div className="p-4 text-center">Carregando...</div>}
    </div>
  );
};

export default SearchOptimizer;
