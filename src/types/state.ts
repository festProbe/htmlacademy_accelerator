import { GuitarType } from './data';

export type ReducerState = {
  guitars: GuitarType[],
  guitar: GuitarType | null,
};
