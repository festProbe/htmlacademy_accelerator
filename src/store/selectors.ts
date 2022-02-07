import { CommentType, GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const selectAllGuitars = (state: ReducerState): GuitarType[] => state.allGuitars;
export const selectGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const selectMinPrice = (state: ReducerState): string => state.minPrice;
export const selectMaxPrice = (state: ReducerState): string => state.maxPrice;
export const selectMinPriceForPlaceholder = (state: ReducerState): number => state.minPricePlaceholder;
export const selectMaxPriceForPlaceholder = (state: ReducerState): number => state.maxPricePlaceholder;
export const selectSortType = (state: ReducerState): string => state.sortType;
export const selectSortOrder = (state: ReducerState): string => state.sortOrder;
export const selectGuitarTypes = (state: ReducerState): (string | null)[] => state.guitarTypes;
export const selectStringsCounts = (state: ReducerState): (string | null)[] => state.stringsCounts;
export const selectGuitarsCount = (state: ReducerState): number => state.totalCount;
export const selectCurrentPage = (state: ReducerState): number => state.currentPage;
export const selectGuitar = (state: ReducerState): GuitarType | null => state.guitar;
export const selectComments = (state: ReducerState): CommentType[] => state.comments;
export const selectIsGuitarsLoaded = (state:ReducerState):boolean => state.isGuitarsLoaded;
export const selectIsGuitarLoaded = (state:ReducerState):boolean => state.isGuitarLoaded;
