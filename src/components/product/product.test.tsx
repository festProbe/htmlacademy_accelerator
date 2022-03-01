import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../api/api';
import {ReducerState} from '../../types/state';
import {commentsMock, guitarMock} from '../../utils/mocks';
import {initialState} from '../../store/reducer';
import Product from './product';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore({...initialState, guitar: guitarMock, isGuitarLoaded: true, comments: commentsMock});
const history = createMemoryHistory();

const fakeProduct = (
  <Provider store={store}>
    <Router history={history}>
      <Product/>
    </Router>
  </Provider>
);

describe('Component: Product', () => {
  it('should render correctly', () => {

    render(fakeProduct);
    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
  });
});
