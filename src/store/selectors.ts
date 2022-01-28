import { createSelector } from 'reselect';
import { CommentType, GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const selectGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const selectMinPrice = (state: ReducerState): string => state.minPrice;
export const selectMaxPrice = (state: ReducerState): string => state.maxPrice;
export const selectMinPriceForPlaceholder = createSelector(
  selectGuitars,
  (guitars) => Math.min(...guitars.map((guitar) => guitar.price)),
);
export const selectMaxPriceForPlaceholder = createSelector(
  selectGuitars,
  (guitars) => Math.max(...guitars.map((guitar) => guitar.price)),
);
export const selectSortType = (state: ReducerState): string => state.sortType;
export const selectSortOrder = (state: ReducerState): string => state.sortOrder;
export const selectGuitarTypes = (state: ReducerState): string[] => state.guitarTypes;
export const selectStringsCounts = (state: ReducerState): string[] => state.stringsCounts;
export const selectGuitarsCount = (state: ReducerState): number => state.totalCount;
export const selectCurrentPage = (state: ReducerState): number => state.currentPage;
export const selectGuitar = (state: ReducerState): GuitarType | null => state.guitar;
export const selectComments = (state: ReducerState): CommentType[] => state.comments;
