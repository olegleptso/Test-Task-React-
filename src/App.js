import './App.css';
import { Route, Switch, Redirect } from "react-router";
import ProductListPage from "./ProductListPage/ProductListPage";
import ProductPage from "./ProductPage/ProductPage";

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/products" component={ProductListPage}/>
          <Route exact path="/products/:productId" component={ProductPage}/> 
          <Redirect to="/products" />
        </Switch>
    </div>
  );
}

export default App;
