import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ReducerState } from './state';
import { Action } from 'redux';

export enum ActionType {
  LoadGuitars = 'main/loadGuitars',
  LoadProductInfo = 'product/productInfo',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, ReducerState, AxiosInstance, Action>;
