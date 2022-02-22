import {AllCommments, GuitarType} from './data';

export type ReducerState = {
  allGuitars: GuitarType[],
  guitars: GuitarType[],
  isGuitarsLoaded: boolean,
  guitar: GuitarType | null,
  isGuitarLoaded: boolean,
  totalCount: number,
  allComments: AllCommments[],
  currentPage: number,
  minPrice: string,
  maxPrice: string,
  minPricePlaceholder: number,
  maxPricePlaceholder: number,
  sortType: string,
  sortOrder: string,
  guitarTypes: (string | null)[],
  stringsCounts: (string | null)[],
  productTab: string,
};
