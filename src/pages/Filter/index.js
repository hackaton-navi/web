import styles from "./filter.module.css";
import BasePage from "../../components/BasePage";
import HeatMap from "./Heatmap";
import SearchOptimizer from "./SearchOptimizer";

const AccordionItem = ({ title, id, parent, children }) => {
  return (
    <div className="accordion-item bg-dark">
      <h2 className="accordion-header" id={`heading${id}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded="true"
          aria-controls={`collapse${id}`}
        >
          {title}
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
  return (
    <BasePage title="Filter Stocks">
      <div className={styles.container}>
        <div className="accordion accordion-flush" id="accordionExample">
          <AccordionItem
            title="Heatmap por Score ESG"
            id="heatmap"
            parent="accordionExample"
          >
            <HeatMap />
          </AccordionItem>
          <AccordionItem
            title="Otimizador de Busca"
            id="optimizer"
            parent="accordionExample"
          >
            <SearchOptimizer />
          </AccordionItem>
        </div>
      </div>
    </BasePage>
  );
};

export default Filter;
