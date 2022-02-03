import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../api/api';
import { ReducerState } from '../../types/state';
import { APIRoute } from '../../utils/const';
import {guitarMock, guitarsMock} from '../../utils/mocks';
import {initialState} from '../../store/reducer';
import Product from "./product";

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore({...initialState, guitar: guitarMock});
const history = createMemoryHistory();
mockAPI
  .onGet(`${APIRoute.GUITARS}?_start=0&_end=9&_limit=9`)
  .reply(200, guitarsMock);

const fakeProduct = (
  <Provider store={store}>
    <Router history={history}>
      <Product />
    </Router>
  </Provider>
);

describe('Component: Product', () => {
  it('should render correctly', () => {

    render(fakeProduct);
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
  });
});
