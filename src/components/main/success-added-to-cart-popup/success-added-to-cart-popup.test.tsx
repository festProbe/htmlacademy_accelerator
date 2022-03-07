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
import SuccessAddedToCartPopup from './success-added-to-cart-popup';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakeAddToCartPopup = (
  <Provider store={store}>
    <Router history={history}>
      <SuccessAddedToCartPopup setIsAddingSuccessfulOpen={jest.fn()} />
    </Router>
  </Provider>
);

describe('Component: AddToCartPopup', () => {
  it('should render correctly', () => {
    render(fakeAddToCartPopup);
    expect(screen.getByText(/Товар успешно добавлен в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
