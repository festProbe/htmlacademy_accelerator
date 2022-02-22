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
import {guitarsMock, commentsMock, fourCommentsMock} from '../../../utils/mocks';
import {initialState} from '../../../store/reducer';
import ReviewList from './review-list';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();
mockAPI
  .onGet(`${APIRoute.GUITARS}?_start=0&_end=9&_limit=9`)
  .reply(200, guitarsMock);

const fakeReviewList = (
  <Provider store={store}>
    <Router history={history}>
      <ReviewList comments={commentsMock}/>
    </Router>
  </Provider>
);

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(fakeReviewList);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should display button if number of comments > 3', () => {
    const fakeReviewListWithFourComments = (
      <Provider store={store}>
        <Router history={history}>
          <ReviewList comments={fourCommentsMock}/>
        </Router>
      </Provider>
    );
    render(fakeReviewListWithFourComments);
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
  });
});
