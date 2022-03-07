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
import DeleteGuitarFromCartPopup from './delete-guitar-from-cart-popup';
import { guitarInCartMock } from '../../../utils/mocks';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakeDeleteGuitarFromCartPopup = (
  <Provider store={store}>
    <Router history={history}>
      <DeleteGuitarFromCartPopup guitar={guitarInCartMock} setDeletingGuitar={jest.fn()} />
    </Router>
  </Provider>
);

describe('Component: DeleteGuitarFromCartPopup', () => {
  it('should render correctly', () => {
    render(fakeDeleteGuitarFromCartPopup);
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });
});
