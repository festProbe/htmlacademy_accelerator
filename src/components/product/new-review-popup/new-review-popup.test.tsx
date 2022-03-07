import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {ReducerState} from '../../../types/state';
import {initialState} from '../../../store/reducer';
import NewReview from './new-review-popup';
import {createAPI} from '../../../api/api';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();

const fakeNewReview = (
  <Provider store={store}>
    <Router history={history}>
      <NewReview setIsModalOpened={jest.fn} setIsSuccessModalOpened={jest.fn}/>
    </Router>
  </Provider>
);

describe('Component: NewReview', () => {
  it('should render correctly', () => {

    render(fakeNewReview);
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
  });
});
