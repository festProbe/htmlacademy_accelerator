import { CommentType, GuitarType } from './data';

export type ReducerState = {
  guitars: GuitarType[],
  guitar: GuitarType | null,
  comments: CommentType[],
  filterType: boolean[],
};
