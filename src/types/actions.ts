import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { ReducerState } from './state';
import { Action } from 'redux';

export enum ActionType {
  LoadAllGuitars = 'main/loadAllGuitars',
  LoadGuitars = 'main/loadGuitars',
  PutGuitarInCart = 'cart/putGuitarInCart',
  SetCustomGuitarCount = 'cart/setCustomGuitarCount',
  DecreseGuitarInCart = 'cart/decreseGuitarInCart',
  DeleteGuitarFromCart = 'cart/deleteGuitarFromCar',
  SetIsGuitarsLoaded = 'main/isGuitarsLoaded',
  LoadProductInfo = 'product/productInfo',
  SetIsGuitarLoaded = 'product/isGuitarLoaded',
  LoadTotalCount = 'main/loadTotalCount',
  LoadComments = 'product/loadComments',
  LoadCommentsCount = 'main/loadCommentsCount',
  SetCurrentPage = 'main/setCurrentPage',
  SetMinPrice = 'main/filter/setMinPrice',
  SetMaxPrice = 'main/filter/setMaxPrice',
  SetMinPricePlaceholder = 'main/MinPricePlaceholder',
  SetMaxPricePlaceholder = 'main/MaxPricePlaceholder',
  SetGuitarTypes = 'main/filter/setGuitarTypes',
  SetStringsCounts = 'main/filter/setStringsCounts',
  SetSortType = 'main/sort/setSortType',
  SetSortOrder = 'main/sort/setSortOrder',
  SetProductTab = 'product/setProductTab',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, ReducerState, AxiosInstance, Action>;
