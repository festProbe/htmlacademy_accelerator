import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {ReducerState} from '../../../types/state';
import {initialState} from '../../../store/reducer';
import {createAPI} from '../../../api/api';
import NewReviewSuccess from './new-review-success';
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();

const fakeNewReviewSuccess = (
  <Provider store={store}>
    <Router history={history}>
      <NewReviewSuccess setIsSuccessModalOpened={jest.fn}/>
    </Router>
  </Provider>
);

describe('Component: NewReviewSuccess', () => {
  it('should render correctly', () => {

    render(fakeNewReviewSuccess);
    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  });
});
