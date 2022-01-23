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

// Селекторы сортировки
export const selectSortedGuitars = createSelector(
  selectGuitars,
  selectSortType,
  selectSortOrder,
  (guitars, type, order) => {
    const copyGuitars = [...guitars];
    switch (type) {
      case 'popularity':
        if (order === 'fromHigh') {
          return copyGuitars.sort((a, b) => b.rating - a.rating);
        } else if (order === 'fromLow') {
          return copyGuitars.sort((a, b) => a.rating - b.rating);
        }
        return copyGuitars.sort((a, b) => a.rating - b.rating);
      case 'price':
        if (order === 'fromHigh') {
          return copyGuitars.sort((a, b) => b.price - a.price);
        } else if (order === 'fromLow') {
          return copyGuitars.sort((a, b) => a.price - b.price);
        }
        return copyGuitars.sort((a, b) => a.price - b.price);
      default:
        if (order === 'fromLow') {
          return copyGuitars.sort((a, b) => a.price - b.price);
        } else if (order === 'fromHigh') {
          return copyGuitars.sort((a, b) => b.price - a.price);
        }
        return copyGuitars;
    }
  });

// Селекторы фильтрации
export const selectFilteredGuitarsByPrice = createSelector(
  selectSortedGuitars,
  selectMinPrice,
  selectMaxPrice,
  (guitars, minPrice, maxPrice) => {
    if (minPrice !== '' && maxPrice !== '') {
      return guitars.filter((guitar) => guitar.price >= Number(minPrice) && guitar.price <= Number(maxPrice));
    } else if (minPrice !== '') {
      return guitars.filter((guitar) => guitar.price >= Number(minPrice));
    } else if (maxPrice !== '') {
      return guitars.filter((guitar) => guitar.price <= Number(maxPrice));
    } else {
      return guitars;
    }
  },
);

export const selectGuitarsByGuitarTypes = createSelector(
  selectFilteredGuitarsByPrice,
  selectGuitarTypes,
  (guitars, types) => {
    if (types.length !== 0) {
      let filteredGuitars: GuitarType[] = [];
      types.forEach((type) => {
        filteredGuitars = [...filteredGuitars, ...guitars.filter((guitar) => guitar.type === type)];
      });
      return filteredGuitars;
    }
    return guitars;
  },
);

export const selectGuitarsByStringsCounts = createSelector(
  selectGuitarsByGuitarTypes,
  selectStringsCounts,
  (guitars, stringsCounts) => {
    let filteredGuitars: GuitarType[] = [];
    if (stringsCounts.length !== 0) {
      stringsCounts.forEach((stringsCount) => {
        filteredGuitars = [...filteredGuitars, ...guitars.filter((guitar) => guitar.stringCount === Number(stringsCount))];
      });
      return filteredGuitars;
    }
    return guitars;
  },
);

export const selectGuitar = (state: ReducerState): GuitarType | null => state.guitar;
export const selectComments = (state: ReducerState): CommentType[] => state.comments;
