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
import {commentsMock, fourCommentsMock, guitarsMock} from '../../../utils/mocks';
import GuitarsList from './guitars-list';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore({
  ...initialState, allComments: [
    {id: '0', comments: commentsMock},
    {id: '1', comments: fourCommentsMock},
    {id: '2', comments: commentsMock},
  ],
  totalCount: 3,
});
const fakeGuitarsList = (
  <Provider store={store}>
    <Router history={history}>
      <GuitarsList guitars={guitarsMock}/>
    </Router>
  </Provider>
);

describe('Component: GuitarsList', () => {
  it('should render correctly', () => {
    render(fakeGuitarsList);
    expect(screen.getByText(/guitar1/i)).toBeInTheDocument();
    expect(screen.getByText(/guitar2/i)).toBeInTheDocument();
    expect(screen.getByText(/guitar3/i)).toBeInTheDocument();
  });
});
