import { useState } from "react";

import styles from "./filter.module.css";
import BasePage from "../../components/BasePage";
import HeatMap from "./Heatmap";
import Portfolio from "./Portfolio";
import SearchOptimizer from "./SearchOptimizer";
import Renderer from "./PortfolioAnalytics/Renderer";

const AccordionItem = ({ title, id, parent, children }) => {
  return (
    <div className="accordion-item bg-dark">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button
          className="accordion-button bg-dark text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded="true"
          aria-controls={`collapse${id}`}
        >
          <h4>{title}</h4>
        </button>
      </h2>
      <div
        id={`collapse${id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${id}`}
        data-bs-parent={`#${parent}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

const Filter = () => {
  const [stocks, setStocks] = useState([]);

  const addStock = (stock) => {
    if (stocks.filter((_stock) => _stock.ticker === stock.ticker)?.length > 0) {
      alert("Ação já está no portfólio.");
      return;
    }

    alert("Ação adicionada!");
    setStocks([...stocks, stock]);
  };

  const removeStock = (ticker) => {
    setStocks(stocks.filter((stock) => stock.ticker !== ticker));
  };

  const stockManage = { addStock, removeStock };

  return (
    <BasePage title="Filter Stocks">
      <div className={styles.container}>
        <div className="accordion accordion-flush" id="accordionFilter">
          <AccordionItem
            title={`Portfolio Selecionado (${stocks.length})`}
            id="portfolio"
            parent="accordionFilter"
          >
            <Portfolio stocks={stocks} stockManage={stockManage} />
          </AccordionItem>
          <AccordionItem
            title="Heatmap por Score ESG"
            id="heatmap"
            parent="accordionFilter"
          >
            <HeatMap stockManage={stockManage} />
          </AccordionItem>
          <AccordionItem
            title="Otimizador de Busca"
            id="optimizer"
            parent="accordionFilter"
          >
            <SearchOptimizer stockManage={stockManage} />
          </AccordionItem>
          <AccordionItem
            title="Portfólio Analytics"
            id="portfolio-analytics"
            parent="accordionFilter"
          >
            <div className="row">
              <Renderer
                stocks={stocks}
                reportURL="/cumulative-return"
                title="Retornos Acumulativos do Portfólio"
              />
              <Renderer
                stocks={stocks}
                reportURL="/sharpe-ratio"
                title="Sharpe Ratio dos Ativos do Portfólio"
              />
            </div>
            <div className="row">
              <Renderer
                stocks={stocks}
                reportURL="/scatter-chart"
                title="Scatter Chart"
              />
              <Renderer
                stocks={stocks}
                reportURL="/max-sharpe-chart"
                title="Sharpe Ratio máximo"
              />
            </div>
          </AccordionItem>
        </div>
      </div>
    </BasePage>
  );
};

export default Filter;
