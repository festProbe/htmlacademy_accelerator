import { createReducer } from '@reduxjs/toolkit';
import { ReducerState } from '../types/state';
import { loadComments, loadGuitars, loadProductInfo, setFilter } from './actions';

const initialState: ReducerState = {
  guitars: [],
  guitar: null,
  comments: [],
  filterType: [true, false, true, true],
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
    .addCase(setFilter, (state, action) => {
      state.filterType = action.payload;
    });
});

export { reducer };
