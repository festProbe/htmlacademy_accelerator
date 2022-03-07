import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../api/api';
import { ReducerState } from '../../types/state';
import { initialState } from '../../store/reducer';
import Cart from './cart';
import { guitarInCartMock } from '../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);

const history = createMemoryHistory();


describe('Component: Cart', () => {
  it('should render correctly when cart is empty', () => {
    const store = mockStore(initialState);
    const fakeCart = (
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>
    );

    render(fakeCart);
    expect(screen.getByText(/Вы ничего не добавили в корзину, а мы не решились положить сюда что-то за вас./i)).toBeInTheDocument();
    expect(screen.getByText(/Сначала добавьте товар/i)).toBeInTheDocument();
  });
  it('should render correctly when cart is not empty', () => {
    const store = mockStore({ ...initialState, guitarsInCart: [guitarInCartMock] });
    const fakeCart = (
      <Provider store={store}>
        <Router history={history}>
          <Cart />
        </Router>
      </Provider>
    );

    render(fakeCart);
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
  });
});
