import { ThunkActionResult } from '../types/actions';
import { GuitarType, CommentType } from '../types/data';
import { APIRoute, MAX_GUITARS_ON_PAGE } from '../utils/const';
import { loadGuitars, loadProductInfo, loadComments, loadTotalCount } from './actions';
import { toast } from 'react-toastify';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const startGuitarCount = `_start=${MAX_GUITARS_ON_PAGE * (_getState().currentPage - 1)}`;
      const endGuitarCount = `_end=${MAX_GUITARS_ON_PAGE * _getState().currentPage}`;
      const limitGuitarCount = `_limit=${MAX_GUITARS_ON_PAGE}`;
      const { minPrice, maxPrice, sortType, sortOrder, guitarTypes, stringsCounts } = _getState();
      const typeQuery = guitarTypes.map((guitarType) => `&type=${guitarType}`).join('');
      const stringCountQuery = stringsCounts.map((stringCount) => `&stringCount=${stringCount}`).join('');

      const response = await api.get<GuitarType[]>(`${APIRoute.GUITARS}?${startGuitarCount}&${endGuitarCount}&${limitGuitarCount}${minPrice ? `&price_gte=${minPrice}` : ''}${maxPrice ? `&price_lte=${maxPrice}` : ''}${sortType ? `&_sort=${sortType}` : ''}${sortOrder ? `&_order=${sortOrder}` : ''}${typeQuery ? typeQuery : ''}${stringCountQuery ? stringCountQuery : ''}`);
      dispatch(loadGuitars(response.data));
      dispatch(loadTotalCount(response.headers['x-total-count']));
    }
    catch {
      toast.error('Ошибка при загрузке объявлений.');
    }
  };

export const fetchGuitarAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType>(`${APIRoute.GUITARS}/${id}`);
      dispatch(loadProductInfo(data));
    }
    catch {
      toast.error('Ошибка при загрузке информации о товаре.');
    }
  };

export const fetchCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<CommentType[]>(`${APIRoute.GUITARS}/${id}/${APIRoute.COMMENTS}`);
      dispatch(loadComments(data));
    }
    catch {
      toast.error('Ошибка при загрузке комментариев');
    }
  };
