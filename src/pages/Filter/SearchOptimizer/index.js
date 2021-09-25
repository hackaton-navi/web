const Table = () => {
  const getData = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        stock: `Stock${i}`,
        score: i,
        e: i,
        s: i,
        g: i,
        ebitda: i * 1000,
      });
    }
    return data;
  };

  const data = getData();

  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">Ação</th>
          <th scope="col">Environment</th>
          <th scope="col">Social</th>
          <th scope="col">Governance</th>
          <th scope="col">ESG Score</th>
          <th scope="col">EBITDA</th>
        </tr>
      </thead>
      <tbody>
        {data.map((stock) => {
          return (
            <tr>
              <td>{stock.stock}</td>
              <td>{stock.e}</td>
              <td>{stock.s}</td>
              <td>{stock.g}</td>
              <td>{stock.score}</td>
              <td>{stock.ebitda}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const SearchOptimizer = () => {
  return (
    <div>
      <h4>Otimizador de Busca</h4>
      <div className="row">
        <div className="col-2 form-group">
          <label>Valor mínimo componente E:</label>
          <input type="number" className="form-control"></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente S:</label>
          <input type="number" className="form-control"></input>
        </div>
        <div className="col-2 form-group">
          <label>Valor mínimo componente G:</label>
          <input type="number" className="form-control"></input>
        </div>
        <div className="col-2 form-group">
          <label>Número de Ações:</label>
          <input type="number" className="form-control"></input>
        </div>
        <div className="col-4" style={{ position: "relative" }}>
          <button
            style={{ position: "absolute", bottom: 0 }}
            className="btn btn-primary w-50"
          >
            Otimizar Busca
          </button>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default SearchOptimizer;
