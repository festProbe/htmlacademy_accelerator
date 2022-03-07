import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './app';
import { AppRoute } from '../../utils/const';
import { initialState } from '../../store/reducer';
import { QueryParamProvider } from 'use-query-params';
import { createAPI } from '../../api/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { ReducerState } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { guitarInCartMock } from '../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore({ ...initialState, guitarsInCart: [guitarInCartMock] });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('App test', () => {
  it('should render main when user navigate /', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render cart when user navigate /cart', () => {
    history.push(AppRoute.CART);
    render(fakeApp);

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });
});
