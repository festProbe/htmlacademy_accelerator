import { ThunkActionResult } from '../types/actions';
import { GuitarType } from '../types/data';
import { APIRoute } from '../utils/const';
import { loadGuitars, loadProductInfo } from './actions';
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
