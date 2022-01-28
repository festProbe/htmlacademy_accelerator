import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { CommentType, GuitarType } from '../types/data';

export const loadGuitars = createAction<GuitarType[]>(ActionType.LoadGuitars);
export const loadProductInfo = createAction<GuitarType>(ActionType.LoadProductInfo);
export const loadTotalCount = createAction<number>(ActionType.LoadTotalCount);
export const loadComments = createAction<CommentType[]>(ActionType.LoadComments);
export const setCurrentPage = createAction<number>(ActionType.SetCurrentPage);
export const setMinPrice = createAction<string>(ActionType.SetMinPrice);
export const setMaxPrice = createAction<string>(ActionType.SetMaxPrice);
export const setSortType = createAction<string>(ActionType.SetSortType);
export const setSortOrder = createAction<string>(ActionType.SetSortOrder);
export const setGuitarTypes = createAction<string[]>(ActionType.SetGuitarTypes);
export const setStringsCounts = createAction<string[]>(ActionType.SetStringsCounts);
