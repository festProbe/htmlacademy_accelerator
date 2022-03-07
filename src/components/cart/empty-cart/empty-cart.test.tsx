import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../api/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ReducerState } from '../../../types/state';
import { Action } from '@reduxjs/toolkit';
import { initialState } from '../../../store/reducer';
import { Provider } from 'react-redux';
import EmptyCart from './empty-cart';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakeEmptyCart = (
  <Provider store={store}>
    <Router history={history}>
      <EmptyCart />
    </Router>
  </Provider>
);

describe('Component: EmptyCart', () => {
  it('should render correctly', () => {
    render(fakeEmptyCart);
    expect(screen.getByText(/Вы ничего не добавили в корзину, а мы не решились положить сюда что-то за вас./i)).toBeInTheDocument();
    expect(screen.getByText(/Сначала добавьте товар/i)).toBeInTheDocument();
  });
});
