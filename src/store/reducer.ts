import { createReducer } from '@reduxjs/toolkit';
import { ReducerState } from '../types/state';
import { loadGuitars, loadProductInfo } from './actions';

const initialState: ReducerState = {
  guitars: [],
  guitar: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(loadProductInfo, (state, action) => {
      state.guitar = action.payload;
    });
});

export { reducer };
