import { useState } from "react";

import styles from "./filter.module.css";
import BasePage from "../../components/BasePage";
import HeatMap from "./Heatmap";
import Portfolio from "./Portfolio";
import SearchOptimizer from "./SearchOptimizer";

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
    setStocks([...stocks, stock]);
  };

  const removeStock = (ticker) => {
    setStocks(stocks.filter((stock) => stock.ticker !== ticker));
  };

  const stockManage = { addStock, removeStock };

  return (
    <BasePage title="Filter Stocks">
      <div className={styles.container}>
        <div className="accordion accordion-flush" id="accordionExample">
          <AccordionItem
            title="Portfolio Selecionado"
            id="portfolio"
            parent="accordionExample"
          >
            <Portfolio stocks={stocks} />
          </AccordionItem>
          <AccordionItem
            title="Heatmap por Score ESG"
            id="heatmap"
            parent="accordionExample"
          >
            <HeatMap stockManage={stockManage} />
          </AccordionItem>
          <AccordionItem
            title="Otimizador de Busca"
            id="optimizer"
            parent="accordionExample"
          >
            <SearchOptimizer stockManage={stockManage} />
          </AccordionItem>
        </div>
      </div>
    </BasePage>
  );
};

export default Filter;
