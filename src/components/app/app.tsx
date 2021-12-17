import Main from '../main/main';
import { Route, Switch } from 'react-router-dom';
import Cart from '../cart/cart';
import Product from '../product/product';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/product" exact>
        <Product />
      </Route>
    </Switch>
  );
}

export default App;
