import { createSelector } from 'reselect';
import { CommentType, GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const selectGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const selectGuitarsByPriceFromLow = createSelector(
  selectGuitars,
  (guitars) => {
    const copyGuitars = [...guitars];
    return copyGuitars.sort((a, b) => a.price - b.price);
  },
);
export const selectGuitarsByPriceFromHigh = createSelector(
  selectGuitars,
  (guitars) => {
    const copyGuitars = [...guitars];
    return copyGuitars.sort((a, b) => b.price - a.price);
  },
);
export const selectGuitarsByPopularityFromLow = createSelector(
  selectGuitars,
  (guitars) => {
    const copyGuitars = [...guitars];
    return copyGuitars.sort((a, b) => a.rating - b.rating);
  },
);
export const selectGuitarsByPopularityFromHigh = createSelector(
  selectGuitars,
  (guitars) => {
    const copyGuitars = [...guitars];
    return copyGuitars.sort((a, b) => b.rating - a.rating);
  },
);
export const selectStringCountFilter = (state: ReducerState): boolean[] => state.filterType;

export const selectGuitar = (state: ReducerState): GuitarType | null => state.guitar;
export const selectComments = (state: ReducerState): CommentType[] => state.comments;
