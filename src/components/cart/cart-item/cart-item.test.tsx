import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../../api/api';
import { ReducerState } from '../../../types/state';
import { initialState } from '../../../store/reducer';
import CartItem from './cart-item';
import { guitarInCartMock } from '../../../utils/mocks';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();

const fakeCart = (
  <Provider store={store}>
    <Router history={history}>
      <CartItem guitar={guitarInCartMock} setDeletingGuitar={jest.fn()} />
    </Router>
  </Provider>
);

describe('Component: CartItem', () => {
  it('should render correctly', () => {

    render(fakeCart);
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
  });
});
