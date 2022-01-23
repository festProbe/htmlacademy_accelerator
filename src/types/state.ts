import { CommentType, GuitarType } from './data';

export type ReducerState = {
  guitars: GuitarType[],
  guitar: GuitarType | null,
  comments: CommentType[],
  minPrice: string,
  maxPrice: string,
  sortType: string,
  sortOrder: string,
  guitarTypes: string[],
  stringsCounts: string[],
};
