import { GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const getGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const getProductInfo = (state: ReducerState): GuitarType | null => state.guitar;
