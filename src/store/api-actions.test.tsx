import { createAPI } from '../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ReducerState } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../utils/const';
import {loadComments, loadGuitars, loadProductInfo, loadTotalCount} from './actions';
import {fetchCommentsAction, fetchGuitarAction, fetchGuitarsAction} from './api-actions';
import {commentsMock, guitarMock, guitarsMock, totalCountMock} from '../utils/mocks';
import {initialState} from "./reducer";


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);

  it('should dispatch loadGuitars and loadTotalCount when GET /guitars', async () => {
    const store = mockStore(initialState);
    mockAPI
      .onGet(`${APIRoute.GUITARS}?_start=0&_end=9&_limit=9`)
      .reply(200, guitarsMock, {
        'x-total-count': totalCountMock,
      });

    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitars(guitarsMock),
      loadTotalCount(totalCountMock),
    ]);
  });

  it('should dispatch loadProductInfo when GET /guitars/:id', async () => {
    const store = mockStore(initialState);
    const id = guitarMock.id;
    mockAPI
      .onGet(`${APIRoute.GUITARS}/${id}`)
      .reply(200, guitarMock);

    await store.dispatch(fetchGuitarAction(id.toString()));
    expect(store.getActions()).toEqual([
      loadProductInfo(guitarMock),
    ]);
  });

  it('should dispatch loadComments when GET /guitars/:id/comments', async () => {
    const store = mockStore(initialState);
    const id = guitarMock.id;
    mockAPI
      .onGet(`${APIRoute.GUITARS}/${id}/${APIRoute.COMMENTS}`)
      .reply(200, commentsMock);

    await store.dispatch(fetchCommentsAction(id.toString()));
    expect(store.getActions()).toEqual([
      loadComments(commentsMock),
    ]);
  });
});
