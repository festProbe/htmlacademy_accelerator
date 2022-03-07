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
import Promo from './promo';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakePromo = (
  <Provider store={store}>
    <Router history={history}>
      <Promo setIsDiscountUsed={jest.fn()} />
    </Router>
  </Provider>
);

describe('Component: Promo', () => {
  it('should render correctly', () => {
    render(fakePromo);
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите свой промокод, если он у вас есть./i)).toBeInTheDocument();
  });
});
