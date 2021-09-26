import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import Select from "./pages/Select";
import Product from "./pages/Product";

export const PortfolioContext = createContext({});

function App() {
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

  const stockState = { stocks, addStock, removeStock };

  return (
    <div className="App">
      <PortfolioContext.Provider value={stockState}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/filter" component={Filter} />
            <Route exact path="/select" component={Select} />
            <Route exact path="/product/:ticker" component={Product} />
          </Switch>
        </BrowserRouter>
      </PortfolioContext.Provider>
    </div>
  );
}

export default App;
