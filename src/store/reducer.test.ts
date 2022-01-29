import { ActionType } from '../types/actions';
import { CommentType, GuitarType } from '../types/data';
import { ReducerState } from '../types/state';
import { reducer } from './reducer';

let stateMock: ReducerState;

beforeEach(() => {
  stateMock = {
    guitars: [],
    guitar: null,
    totalCount: 0,
    comments: [],
    currentPage: 1,
    minPrice: '',
    maxPrice: '',
    sortType: '',
    sortOrder: '',
    guitarTypes: [],
    stringsCounts: [],
  };
});

describe('reducer test', () => {
  it('loadGuitars should add guitars to state', () => {
    const guitars: GuitarType[] = [
      {
        id: 0,
        name: 'guitar1',
        vendorCode: 'fhwe123123',
        type: 'electric',
        description: 'best guitar of the world',
        previewImg: '/123/img.img',
        stringCount: 6,
        rating: 4.5,
        price: 20000,
      },
      {
        id: 1,
        name: 'guitar2',
        vendorCode: 'wef324g3g3',
        type: 'ukulele',
        description: 'is it guitar?',
        previewImg: '/312/img.img',
        stringCount: 4,
        rating: 2.5,
        price: 7000,
      },
      {
        id: 2,
        name: 'guitar3',
        vendorCode: 'btrtwr32r',
        type: 'acoustic',
        description: 'not bad',
        previewImg: '/321/img.img',
        stringCount: 12,
        rating: 3.7,
        price: 17000,
      },
    ];

    const loadGuitarsAction = {
      type: ActionType.LoadGuitars,
      payload: guitars,
    };

    expect(reducer(stateMock, loadGuitarsAction))
      .toEqual({ ...stateMock, guitars: guitars });
  });

  it('loadProductInfo should add guitar to state', () => {
    const guitar: GuitarType = {
      id: 1,
      name: 'guitar2',
      vendorCode: 'wef324g3g3',
      type: 'ukulele',
      description: 'is it guitar?',
      previewImg: '/312/img.img',
      stringCount: 4,
      rating: 2.5,
      price: 7000,
    };

    const loadProductInfoAction = {
      type: ActionType.LoadProductInfo,
      payload: guitar,
    };

    expect(reducer(stateMock, loadProductInfoAction))
      .toEqual({ ...stateMock, guitar: guitar });
  });

  it('loadTotalCount should add total count of guitars to state', () => {
    const totalCount = 13;
    const loadTotalCountAction = {
      type: ActionType.LoadTotalCount,
      payload: totalCount,
    };
    expect(reducer(stateMock, loadTotalCountAction))
      .toEqual({ ...stateMock, totalCount: totalCount });
  });

  it('loadComments should add comments to state', () => {
    const comments: CommentType[] = [
      {
        id: '0',
        userName: 'Vasya',
        advantages: '4 string',
        disadvantages: 'cant play',
        comment: 'its guitar',
        rating: 3,
        createAt: new Date(),
        guitarId: 1,
      },
      {
        id: '1',
        userName: 'Petya',
        advantages: 'seems like gutiar of gods',
        disadvantages: 'no one',
        comment: 'i want to get marry this guitar',
        rating: 4.7,
        createAt: new Date(),
        guitarId: 0,
      },
      {
        id: '2',
        userName: 'Somebody',
        advantages: 'WHAT A SOUND!!!',
        disadvantages: 'i dont understand english',
        comment: 'I can play famous songs of Little Big band',
        rating: 5,
        createAt: new Date(),
        guitarId: 2,
      },
    ];
    const loadCommentsAction = {
      type: ActionType.LoadComments,
      payload: comments,
    };
    expect(reducer(stateMock, loadCommentsAction))
      .toEqual({ ...stateMock, comments: comments });
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
