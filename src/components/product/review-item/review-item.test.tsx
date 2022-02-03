import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../../api/api';
import {ReducerState} from '../../../types/state';
import {APIRoute} from '../../../utils/const';
import {guitarsMock, commentMock} from '../../../utils/mocks';
import {initialState} from '../../../store/reducer';
import ReviewItem from "./review-item";

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();
mockAPI
  .onGet(`${APIRoute.GUITARS}?_start=0&_end=9&_limit=9`)
  .reply(200, guitarsMock);

const fakeReviewItem = (
  <Provider store={store}>
    <Router history={history}>
      <ReviewItem comment={commentMock}/>
    </Router>
  </Provider>
);

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {

    render(fakeReviewItem);
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства:/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки:/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий:/i)).toBeInTheDocument();
  });
});
