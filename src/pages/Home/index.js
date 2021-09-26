import BasePage from "../../components/BasePage";
import Chart from "./Chart";

const Home = () => {
  return (
    <BasePage title="Home">
      <div className="row">
        <Chart
          reportUrl="/ranges-ebitda"
          title="Crescimento de EBITDA médio por faixa de Score"
          reverse={true}
        />
        <Chart
          reportUrl="/ranges-stock-price"
          title="Retorno acumulado médio por faixa de Score"
          reverse={false}
        />
      </div>
      <hr />
      <div className="row">
        <Chart
          reportUrl="/ranges-pe-ratio"
          title="PE ratio médio por faixa de Score"
          reverse={true}
        />
        <Chart
          reportUrl="/ranges-ebitda"
          title="Crescimento de EBITDA médio por faixa de Score"
          reverse={true}
        />
      </div>
    </BasePage>
  );
};

export default Home;
