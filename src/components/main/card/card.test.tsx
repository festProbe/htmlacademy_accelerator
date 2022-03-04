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
import Card from './card';
import { guitarMock } from '../../../utils/mocks';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);

describe('Component: Card', () => {
  it('should render correctly', () => {
    const fakeCard = (
      <Provider store={store}>
        <Router history={history}>
          <Card guitar={guitarMock} commentsCount={0} setAddingGuitarToCart={jest.fn()} />
        </Router>
      </Provider>
    );
    render(fakeCard);
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
  });
});
