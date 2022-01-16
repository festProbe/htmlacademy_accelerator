import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/actions';
import { CommentType, GuitarType } from '../types/data';

export const loadGuitars = createAction<GuitarType[]>(ActionType.LoadGuitars);
export const loadProductInfo = createAction<GuitarType>(ActionType.LoadProductInfo);
export const loadComments = createAction<CommentType[]>(ActionType.LoadComments);
export const setFilter = createAction<boolean[]>(ActionType.SetFilter);
