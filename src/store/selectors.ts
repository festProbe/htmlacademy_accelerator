import { createSelector } from 'reselect';
import { CommentsCount, CommentType, GuitarInCart, GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const selectAllGuitars = (state: ReducerState): GuitarType[] => state.allGuitars;
export const selectGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const selectGuitarsInCart = (state: ReducerState): GuitarInCart[] => state.guitarsInCart;
export const selectCountGuitarsInCart = createSelector(
  selectGuitarsInCart,
  (guitars) => {
    if (guitars.length === 0) {
      return 0;
    }
    const counts = guitars.map((guitar) => guitar.count);
    return counts.reduce((prev, curr) => prev + curr);
  },
);
export const selectGuitarsWithoutCount = createSelector(
  selectGuitarsInCart,
  (guitars) => guitars.map((guitar) => guitar.guitar),
);
export const selectMinPrice = (state: ReducerState): string => state.minPrice;
export const selectMaxPrice = (state: ReducerState): string => state.maxPrice;
export const selectMinPriceForPlaceholder = (state: ReducerState): number => state.minPricePlaceholder;
export const selectMaxPriceForPlaceholder = (state: ReducerState): number => state.maxPricePlaceholder;
export const selectSortType = (state: ReducerState): string => state.sortType;
export const selectSortOrder = (state: ReducerState): string => state.sortOrder;
export const selectGuitarTypes = (state: ReducerState): (string | null)[] => state.guitarTypes;
export const selectStringsCounts = (state: ReducerState): (string | null)[] => state.stringsCounts;
export const selectGuitarsCount = (state: ReducerState): number => state.totalCount;
export const selectDiscount = (state: ReducerState): number => state.discount;
export const selectCurrentPage = (state: ReducerState): number => state.currentPage;
export const selectGuitar = (state: ReducerState): GuitarType | null => state.guitar;
export const selectCommentsCount = (state: ReducerState): CommentsCount[] => state.commentsCount;
export const selectComments = (state: ReducerState): CommentType[] => state.comments;
export const selectIsGuitarsLoaded = (state: ReducerState): boolean => state.isGuitarsLoaded;
export const selectIsGuitarLoaded = (state: ReducerState): boolean => state.isGuitarLoaded;
export const selectProductTab = (state: ReducerState): string => state.productTab;
