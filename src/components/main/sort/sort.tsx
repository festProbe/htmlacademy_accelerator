import {MouseEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setSortOrder, setSortType } from '../../../store/actions';
import {SetQuery} from 'use-query-params';
import {Params} from '../../../types/params';
import {selectSortOrder, selectSortType} from '../../../store/selectors';

type SortPropsType = {
  setQueryParams: SetQuery<Params>,
}

function Sort({setQueryParams}: SortPropsType): JSX.Element {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);

  useEffect(() => {
    setQueryParams({
      _sort: sortType ? sortType : undefined,
      _order: sortOrder ? sortOrder : undefined,
    }, 'pushIn');
  }, [sortType, sortOrder, setQueryParams]);

  const FROM_LOW = 'asc';
  const FROM_HIGH = 'desc';
  const PRICE = 'price';
  const RATING = 'rating';

  const sortTypeClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setSortType(evt.currentTarget.value));
    document.querySelector('.catalog-sort__type-button--active')?.classList.remove('catalog-sort__type-button--active');

    if (!sortOrder) {
      dispatch(setSortOrder(FROM_LOW));
      document.querySelector('.catalog-sort__order-button--up')?.classList.add('catalog-sort__order-button--active');
    }
    evt.currentTarget.classList.add('catalog-sort__type-button--active');
    //dispatch(fetchGuitarsAction());
  };

  const sortOrderClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setSortOrder(evt.currentTarget.value));
    document.querySelector('.catalog-sort__order-button--active')?.classList.remove('catalog-sort__order-button--active');
    if (!sortType) {
      dispatch(setSortType(PRICE));
      document.querySelector('.catalog-sort__type-button--price')?.classList.add('catalog-sort__type-button--active');
    }
    evt.currentTarget.classList.add('catalog-sort__order-button--active');
    //dispatch(fetchGuitarsAction());
  };
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className="catalog-sort__type-button catalog-sort__type-button--price" aria-label="по цене" value={PRICE} tabIndex={-1} onClick={sortTypeClickHandler}>по цене</button>
        <button className="catalog-sort__type-button" aria-label="по популярности" value={RATING} onClick={sortTypeClickHandler}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" value={FROM_LOW} tabIndex={-1} onClick={sortOrderClickHandler}></button>
        <button className="catalog-sort__order-button catalog-sort__order-button--down" value={FROM_HIGH} aria-label="По убыванию" onClick={sortOrderClickHandler}></button>
      </div>
    </div>
  );
}

export default Sort;
