import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../api/api';
import {ReducerState} from '../../types/state';
import {APIRoute} from '../../utils/const';
import {guitarsMock} from '../../utils/mocks';
import {initialState} from '../../store/reducer';
import Main from './main';
import { QueryParamProvider } from 'use-query-params';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();
mockAPI
  .onGet(`${APIRoute.GUITARS}?_start=0&_end=9&_limit=9`)
  .reply(200, guitarsMock);

const fakeMain = (
  <Provider store={store}>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Main/>
      </QueryParamProvider>
    </Router>
  </Provider>
);

describe('Component: Main', () => {
  it('should render correctly', () => {

    render(fakeMain);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });
});
