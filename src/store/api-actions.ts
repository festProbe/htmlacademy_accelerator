import {ThunkActionResult} from '../types/actions';
import {GuitarType, CommentType, CommentPostType} from '../types/data';
import {APIRoute, MAX_GUITARS_ON_PAGE} from '../utils/const';
import {
  loadGuitars,
  loadProductInfo,
  loadComments,
  loadTotalCount,
  setMinPricePlaceholder,
  setMaxPricePlaceholder,
  loadAllGuitars,
  setIsGuitarsLoaded,
  setIsGuitarLoaded
} from './actions';
import {toast} from 'react-toastify';

export const fetchAllGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const response = await api.get<GuitarType[]>(APIRoute.GUITARS);
      dispatch(loadAllGuitars(response.data));
      response.data.forEach((guitar) => dispatch(fetchCommentsAction(guitar.id.toString())));
    } catch {
      toast.error('Ошибка при загрузке объявлений.');
    }
  };

export const getMinMaxPricePlaceholder = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {guitarTypes, stringsCounts} = _getState();
      const typeQuery = guitarTypes.map((guitarType) => `&type=${guitarType}`).join('');
      const stringCountQuery = stringsCounts.map((stringCount) => `&stringCount=${stringCount}`).join('');

      const response = await api.get<GuitarType[]>(`${APIRoute.GUITARS}?${typeQuery ? typeQuery : ''}${stringCountQuery ? stringCountQuery : ''}`);
      const guitars = response.data;
      dispatch(setMinPricePlaceholder(Math.min(...guitars.map((guitar) => guitar.price))));
      dispatch(setMaxPricePlaceholder(Math.max(...guitars.map((guitar) => Number(guitar.price)))));
    } catch {
      toast.error('Ошибка при загрузке плейсхолдеров.');
    }
  };

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setIsGuitarsLoaded(false));
      const startGuitarCount = `_start=${MAX_GUITARS_ON_PAGE * (_getState().currentPage - 1)}`;
      const endGuitarCount = `_end=${MAX_GUITARS_ON_PAGE * _getState().currentPage}`;
      const limitGuitarCount = `_limit=${MAX_GUITARS_ON_PAGE}`;
      const {minPrice, maxPrice, sortType, sortOrder, guitarTypes, stringsCounts} = _getState();
      const typeQuery = guitarTypes.map((guitarType) => `&type=${guitarType}`).join('');
      const stringCountQuery = stringsCounts.map((stringCount) => `&stringCount=${stringCount}`).join('');

      const response = await api.get<GuitarType[]>(`${APIRoute.GUITARS}?${startGuitarCount}&${endGuitarCount}&${limitGuitarCount}${minPrice ? `&price_gte=${minPrice}` : ''}${maxPrice ? `&price_lte=${maxPrice}` : ''}${sortType ? `&_sort=${sortType}` : ''}${sortOrder ? `&_order=${sortOrder}` : ''}${typeQuery ? typeQuery : ''}${stringCountQuery ? stringCountQuery : ''}`);
      dispatch(loadGuitars(response.data));
      dispatch(loadTotalCount(response.headers['x-total-count']));
      dispatch(setIsGuitarsLoaded(true));
    } catch {
      toast.error('Ошибка при загрузке объявлений.');
    }
  };

export const fetchGuitarAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      dispatch(setIsGuitarLoaded(false));
      const {data} = await api.get<GuitarType>(`${APIRoute.GUITARS}/${id}`);
      dispatch(loadProductInfo(data));
      dispatch(setIsGuitarLoaded(true));
    } catch {
      toast.error('Ошибка при загрузке информации о товаре.');
    }
  };

export const fetchCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<CommentType[]>(`${APIRoute.GUITARS}/${id}${APIRoute.COMMENTS}`);
      const comments = {
        id: id,
        comments: data,
      };
      dispatch(loadComments(comments));
    } catch {
      toast.error('Ошибка при загрузке комментариев');
    }
  };

export const sendNewCommentAction = (comment: CommentPostType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post<CommentPostType>(`${APIRoute.GUITARS}/${comment.guitarId}${APIRoute.COMMENTS}`, comment);
      dispatch(fetchAllGuitarsAction());
    } catch {
      toast.error('Ошибка при отправке комментария');
    }
  };
