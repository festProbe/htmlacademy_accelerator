import { createReducer } from '@reduxjs/toolkit';
import { ReducerState } from '../types/state';
import {
  loadComments,
  loadGuitars,
  loadProductInfo,
  setMinPrice,
  setMaxPrice,
  setSortType,
  setSortOrder,
  setGuitarTypes,
  setStringsCounts
} from './actions';

const initialState: ReducerState = {
  guitars: [],
  guitar: null,
  comments: [],
  minPrice: '',
  maxPrice: '',
  sortType: '',
  sortOrder: '',
  guitarTypes: [],
  stringsCounts: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadProductInfo, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
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
    });
});

export { reducer };
