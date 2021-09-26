import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import Select from "./pages/Select";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/filter" component={Filter} />
          <Route exact path="/select" component={Select} />
          <Route exact path="/product/:ticker" component={Product} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
