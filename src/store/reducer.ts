import {createReducer} from '@reduxjs/toolkit';
import {ReducerState} from '../types/state';
import {
  loadComments,
  loadAllGuitars,
  loadGuitars,
  setIsGuitarsLoaded,
  loadTotalCount,
  loadProductInfo,
  setIsGuitarLoaded,
  setCurrentPage,
  setMinPrice,
  setMaxPrice,
  setMinPricePlaceholder,
  setMaxPricePlaceholder,
  setSortType,
  setSortOrder,
  setGuitarTypes,
  setStringsCounts,
  setProductTab
} from './actions';

const initialState: ReducerState = {
  allGuitars: [],
  guitars: [],
  isGuitarsLoaded: false,
  guitar: null,
  isGuitarLoaded: false,
  totalCount: 0,
  allCommments: [],
  currentPage: 1,
  minPrice: '',
  maxPrice: '',
  minPricePlaceholder: 0,
  maxPricePlaceholder: 0,
  sortType: '',
  sortOrder: '',
  guitarTypes: [],
  stringsCounts: [],
  productTab: 'characteristics',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllGuitars, (state, action) => {
      state.allGuitars = action.payload;
    })
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setIsGuitarsLoaded, (state, action) => {
      state.isGuitarsLoaded = action.payload;
    })
    .addCase(loadProductInfo, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(setIsGuitarLoaded, (state, action) => {
      state.isGuitarLoaded = action.payload;
    })
    .addCase(loadTotalCount, (state, action) => {
      state.totalCount = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.allCommments.push(action.payload);
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(setMinPricePlaceholder, (state, action) => {
      state.minPricePlaceholder = action.payload;
    })
    .addCase(setMaxPricePlaceholder, (state, action) => {
      state.maxPricePlaceholder = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(setGuitarTypes, (state, action) => {
      state.guitarTypes = action.payload;
    })
    .addCase(setStringsCounts, (state, action) => {
      state.stringsCounts = action.payload;
    })
    .addCase(setProductTab, (state, action) => {
      state.productTab = action.payload;
    });
});

export {reducer, initialState};
