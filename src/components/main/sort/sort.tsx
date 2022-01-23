import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder, setSortType } from '../../../store/actions';
import { selectSortOrder, selectSortType } from '../../../store/selectors';

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);

  const sortTypeClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setSortType(evt.currentTarget.value));
    if (sortOrder === '') {
      dispatch(setSortOrder('fromLow'));
      document.querySelector('.catalog-sort__order-button--up')?.classList.add('catalog-sort__order-button--active');
    }
    document.querySelector('.catalog-sort__type-button--active')?.classList.remove('catalog-sort__type-button--active');
    evt.currentTarget.classList.add('catalog-sort__type-button--active');
  };

  const sortOrderClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setSortOrder(evt.currentTarget.value));
    if (sortType === '') {
      dispatch(setSortType('price'));
      document.querySelector('.catalog-sort__type-button--price')?.classList.add('catalog-sort__type-button--active');
    }
    document.querySelector('.catalog-sort__order-button--active')?.classList.remove('catalog-sort__order-button--active');
    evt.currentTarget.classList.add('catalog-sort__order-button--active');
  };
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className="catalog-sort__type-button catalog-sort__type-button--price" aria-label="по цене" value='price' tabIndex={-1} onClick={sortTypeClickHandler}>по цене</button>
        <button className="catalog-sort__type-button" aria-label="по популярности" value='popularity' onClick={sortTypeClickHandler}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up" aria-label="По возрастанию" value="fromLow" tabIndex={-1} onClick={sortOrderClickHandler}></button>
        <button className="catalog-sort__order-button catalog-sort__order-button--down" value="fromHigh" aria-label="По убыванию" onClick={sortOrderClickHandler}></button>
      </div>
    </div>
  );
}

export default Sort;
