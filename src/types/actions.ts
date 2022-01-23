import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ReducerState } from './state';
import { Action } from 'redux';

export enum ActionType {
  LoadGuitars = 'main/loadGuitars',
  LoadProductInfo = 'product/productInfo',
  LoadComments = 'product/loadComments',
  SetMinPrice = 'main/filter/setMinPrice',
  SetMaxPrice = 'main/filter/setMaxPrice',
  SetGuitarTypes = 'main/filter/setGuitarTypes',
  SetStringsCounts = 'main/filter/setStringsCounts',
  SetSortType = 'main/sort/setSortType',
  SetSortOrder = 'main/sort/setSortOrder',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, ReducerState, AxiosInstance, Action>;
