import styles from "./filter.module.css";
import BasePage from "../../components/BasePage";
import HeatMap from "./Heatmap";
import SearchOptimizer from "./SearchOptimizer";

const Filter = () => {
  return (
    <BasePage title="Filter Stocks">
      <div className={styles.container}>
        <HeatMap />
        <SearchOptimizer />
      </div>
    </BasePage>
  );
};

export default Filter;
