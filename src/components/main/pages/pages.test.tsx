import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {createAPI} from '../../../api/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {ReducerState} from '../../../types/state';
import {Action} from '@reduxjs/toolkit';
import {initialState} from '../../../store/reducer';
import {Provider} from 'react-redux';
import Pages from './pages';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);

describe('Component: Pages', () => {
  it('should render correctly', () => {
    const store = mockStore({...initialState, totalCount: 27});
    const fakePages = (
      <Provider store={store}>
        <Router history={history}>
          <Pages setQueryParams={jest.fn}/>
        </Router>
      </Provider>
    );
    render(fakePages);
    expect(screen.getByTestId('pagination-list')).toBeInTheDocument();
  });
  it('should be empty when guitars count equal 0', () => {
    const store = mockStore({...initialState, totalCount: 0});
    const fakePages = (
      <Provider store={store}>
        <Router history={history}>
          <Pages setQueryParams={jest.fn}/>
        </Router>
      </Provider>
    );
    render(fakePages);
    expect(screen.getByTestId('pagination-empty')).toBeInTheDocument();
  });
});
