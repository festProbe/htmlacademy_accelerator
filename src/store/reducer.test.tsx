import { ActionType } from '../types/actions';
import { ReducerState } from '../types/state';
import { commentsMock, guitarMock, guitarsMock, totalCountMock } from '../utils/mocks';
import { initialState, reducer } from './reducer';

let stateMock: ReducerState;

beforeEach(() => {
  stateMock = initialState;
});

describe('reducer test', () => {
  it('loadGuitars should add guitars to state', () => {
    const loadGuitarsAction = {
      type: ActionType.LoadGuitars,
      payload: guitarsMock,
    };

    expect(reducer(stateMock, loadGuitarsAction))
      .toEqual({ ...stateMock, guitars: guitarsMock });
  });

  it('loadProductInfo should add guitar to state', () => {
    const loadProductInfoAction = {
      type: ActionType.LoadProductInfo,
      payload: guitarMock,
    };

    expect(reducer(stateMock, loadProductInfoAction))
      .toEqual({ ...stateMock, guitar: guitarMock });
  });

  it('loadTotalCount should add total count of guitars to state', () => {
    const loadTotalCountAction = {
      type: ActionType.LoadTotalCount,
      payload: totalCountMock,
    };
    expect(reducer(stateMock, loadTotalCountAction))
      .toEqual({ ...stateMock, totalCount: totalCountMock });
  });

  it('loadComments should add comments to state', () => {

    const loadCommentsAction = {
      type: ActionType.LoadComments,
      payload: commentsMock,
    };

    expect(reducer(stateMock, loadCommentsAction))
      .toEqual({ ...stateMock, comments: commentsMock });
  });

  it('setCurrentPage should set currentPage to state', () => {
    const currentPage = 2;
    const setCurrentPageAction = {
      type: ActionType.SetCurrentPage,
      payload: currentPage,
    };
    expect(reducer(stateMock, setCurrentPageAction))
      .toEqual({ ...stateMock, currentPage: currentPage });
  });

  it('setMinPrice should set minPrice to state', () => {
    const minPrice = 2000;
    const setMinPriceAction = {
      type: ActionType.SetMinPrice,
      payload: minPrice,
    };
    expect(reducer(stateMock, setMinPriceAction))
      .toEqual({ ...stateMock, minPrice: minPrice });
  });

  it('setMaxPrice should set maxPrice to state', () => {
    const maxPrice = 17000;
    const setMaxPriceAction = {
      type: ActionType.SetMaxPrice,
      payload: maxPrice,
    };
    expect(reducer(stateMock, setMaxPriceAction))
      .toEqual({ ...stateMock, maxPrice: maxPrice });
  });


  it('setSortType should set sortType to state', () => {
    const sortType = 'price';
    const setSortTypeAction = {
      type: ActionType.SetSortType,
      payload: sortType,
    };
    expect(reducer(stateMock, setSortTypeAction))
      .toEqual({ ...stateMock, sortType: sortType });
  });

  it('setSortOrder should set sortOrder to state', () => {
    const sortOrder = 'asc';
    const setMaxPriceAction = {
      type: ActionType.SetSortOrder,
      payload: sortOrder,
    };
    expect(reducer(stateMock, setMaxPriceAction))
      .toEqual({ ...stateMock, sortOrder: sortOrder });
  });

  it('setGuitarTypes should set guitarTypes to state', () => {
    const guitarTypes = ['acoustic', 'ukulele'];
    const setGuitarTypesAction = {
      type: ActionType.SetGuitarTypes,
      payload: guitarTypes,
    };
    expect(reducer(stateMock, setGuitarTypesAction))
      .toEqual({ ...stateMock, guitarTypes: guitarTypes });
  });

  it('setStringsCounts should set stringsCounts to state', () => {
    const stringsCounts = ['4', '6'];
    const setStringsCountsAction = {
      type: ActionType.SetStringsCounts,
      payload: stringsCounts,
    };
    expect(reducer(stateMock, setStringsCountsAction))
      .toEqual({ ...stateMock, stringsCounts: stringsCounts });
  });
});
