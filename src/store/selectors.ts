import { GuitarType } from '../types/data';
import { ReducerState } from '../types/state';

export const getGuitars = (state: ReducerState): GuitarType[] => state.guitars;
export const getFilteredGuitarsByStringCount = (state: ReducerState, stringCount: number): GuitarType[] => state.guitars.filter((guitar) => guitar.stringCount === stringCount);

export const getProductInfo = (state: ReducerState): GuitarType | null => state.guitar;
