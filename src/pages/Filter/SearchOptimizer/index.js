import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

const Table = ({ data, stockManage }) => {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">Ação</th>
          <th scope="col">Environment</th>
          <th scope="col">Social</th>
          <th scope="col">Governance</th>
          <th scope="col">ESG Score</th>
          {/* <th scope="col">ESG Score</th> */}
          <th scope="col">Crescimento médio EBITDA (últimos 3 anos)</th>
          <th scope="col">Adicionar ao portfólio</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          return (
            <tr>
              <td>{stock.ticker}</td>
              <td>{stock.E.toFixed(2)}</td>
              <td>{stock.S.toFixed(2)}</td>
              <td>{stock.G.toFixed(2)}</td>
              <td>{stock.score?.toFixed(2)}</td>
              {/* <td>{stock.score}</td> */}
              <td>{(stock.avg_ebitda_return * 100).toFixed(2)}%</td>
              <td>
                <button
                  onClick={(e) => stockManage.addStock(stock)}
                  className="btn-success btn"
                >
                  <i className="fa fa-plus"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const SearchOptimizer = ({ stockManage }) => {
  const _e = useRef(30);
  const _s = useRef(50);
  const _g = useRef(25);
  const _amount = useRef(5);
  const [e, setE] = useState(_e.current);
  const [s, setS] = useState(_s.current);
  const [g, setG] = useState(_g.current);
  const [amount, setAmount] = useState(_amount.current);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const _data = (
        await axios.post("/optimize", {
          e: _e.current,
          s: _s.current,
          g: _g.current,
          amount: _amount.current,
        })
      ).data;
      setData(_data);
      setLoading(false);
    } catch (err) {
      setData([]);
      setLoading(false);
      console.log(err);
    }
  }, []);

  const loadMoreData = () => {
    _e.current = e;
    _g.current = g;
    _s.current = s;
    _amount.current = amount;
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-2 form-group">
          <label>Valor mínimo componente E:</label>
          <input
            value={e}
            onChange={(event) => setE(event.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente S:</label>
          <input
            value={s}
            onChange={(event) => setS(event.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente G:</label>
          <input
            value={g}
            onChange={(event) => setG(event.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 form-group">
          <label>Número de Ações:</label>
          <input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="col-4" style={{ position: "relative" }}>
          <button
            style={{ position: "absolute", bottom: 0 }}
            className="btn btn-primary w-50"
            onClick={loadMoreData}
          >
            Otimizar Busca
          </button>
        </div>
      </div>
      {!loading && <Table stockManage={stockManage} data={data} />}
      {loading && <div className="p-4 text-center">Carregando...</div>}
    </div>
  );
};

export default SearchOptimizer;
