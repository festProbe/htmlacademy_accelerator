import { createReducer } from '@reduxjs/toolkit';
import { ReducerState } from '../types/state';
import { loadGuitars } from './actions';

const initialState: ReducerState = {
  guitars: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export { reducer };
