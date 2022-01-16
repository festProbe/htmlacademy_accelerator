import { ThunkActionResult } from '../types/actions';
import { GuitarType, CommentType } from '../types/data';
import { APIRoute } from '../utils/const';
import { loadGuitars, loadProductInfo, loadComments } from './actions';
import { toast } from 'react-toastify';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<GuitarType[]>(APIRoute.GUITARS);
      dispatch(loadGuitars(data));
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
