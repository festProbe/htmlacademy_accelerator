import Main from '../main/main';
import { Route, Switch } from 'react-router-dom';
import Cart from '../cart/cart';
import Product from '../product/product';
import { AppRoute } from '../../utils/const';
import NotFound from '../common/not-found/not-found';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.MAIN} exact>
        <Main />
      </Route>
      <Route path={`${AppRoute.PAGE}:page`} exact>
        <Main />
      </Route>
      <Route path={AppRoute.CART} exact>
        <Cart />
      </Route>
      <Route path={`${AppRoute.PRODUCT}/:id`} exact>
        <Product />
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
}

export default App;
