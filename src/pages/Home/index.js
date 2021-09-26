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
          title="Valorização por faixa de Score"
          reverse={false}
        />
      </div>
      <div className="row">
        <Chart
          reportUrl="/ranges-ebitda"
          title="Crescimento de EBITDA médio por faixa de Score"
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
