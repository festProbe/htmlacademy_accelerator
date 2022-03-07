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
import { guitarInCartMock } from '../../../utils/mocks';
import CartList from './cart-list';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakeCartList = (
  <Provider store={store}>
    <Router history={history}>
      <CartList guitars={[guitarInCartMock]} setDeletingGuitar={jest.fn()} />
    </Router>
  </Provider>
);

describe('Component: CartList', () => {
  it('should render correctly', () => {
    render(fakeCartList);
    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
  });
});
