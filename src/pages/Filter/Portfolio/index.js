const Portfolio = ({ stocks }) => {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">Ação</th>
          <th scope="col">Environment</th>
          <th scope="col">Social</th>
          <th scope="col">Governance</th>
          <th scope="col">Remover</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          return (
            <tr>
              <td>{stock.ticker}</td>
              <td>{stock.E}</td>
              <td>{stock.S}</td>
              <td>{stock.G}</td>
              <td>
                <i className="fa fa-times text-danger"></i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Portfolio;
