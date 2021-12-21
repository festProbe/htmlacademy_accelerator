import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { GuitarType } from '../types/data';

export const loadGuitars = createAction<GuitarType[]>(ActionType.LoadGuitars);
export const loadProductInfo = createAction<GuitarType>(ActionType.LoadProductInfo);
