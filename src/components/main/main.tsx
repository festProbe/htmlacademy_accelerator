import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGuitars,
  selectGuitarsByPriceFromLow,
  selectGuitarsByPriceFromHigh,
  selectGuitarsByPopularityFromLow,
  selectGuitarsByPopularityFromHigh,
  selectStringCountFilter
} from '../../store/selectors';
import { stringsCount } from '../../utils/const';
import { setFilter } from '../../store/actions';
import { GuitarType } from '../../types/data';

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const guitarsByPopularityFromLow = useSelector(selectGuitarsByPopularityFromLow);
  const guitarsByPopularityFromHigh = useSelector(selectGuitarsByPopularityFromHigh);
  const guitarsByPriceFromLow = useSelector(selectGuitarsByPriceFromLow);
  const guitarsByPriceFromHigh = useSelector(selectGuitarsByPriceFromHigh);
  const allGuitars = useSelector(selectGuitars);
  const stringCountFilter = useSelector(selectStringCountFilter);

  const getGuitars = (type: string): GuitarType[] => {
    switch (type) {
      case 'popularity':
        if (sortOrder === 'fromHigh') {
          return guitarsByPopularityFromHigh;
        } else if (sortOrder === 'fromLow') {
          return guitarsByPopularityFromLow;
        }
        setSortOrder('fromLow');
        document.querySelector('.catalog-sort__order-button--up')?.classList.add('catalog-sort__order-button--active');
        return guitarsByPopularityFromLow;
      case 'price':
        if (sortOrder === 'fromHigh') {
          return guitarsByPriceFromHigh;
        } else if (sortOrder === 'fromLow') {
          return guitarsByPriceFromLow;
        }
        setSortOrder('fromLow');
        document.querySelector('.catalog-sort__order-button--up')?.classList.add('catalog-sort__order-button--active');
        return guitarsByPriceFromLow;
      default:
        if (sortOrder === 'fromLow') {
          setSortType('price');
          document.querySelector('.catalog-sort__type-button--price')?.classList.add('catalog-sort__type-button--active');
          return guitarsByPriceFromLow;
        } else if (sortOrder === 'fromHigh') {
          setSortType('price');
          document.querySelector('.catalog-sort__type-button--price')?.classList.add('catalog-sort__type-button--active');
          return guitarsByPriceFromHigh;
        }
        return allGuitars;
    }
  };

  const guitars = getGuitars(sortType);

  const sortTypeClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    setSortType(evt.currentTarget.value);
    document.querySelector('.catalog-sort__type-button--active')?.classList.remove('catalog-sort__type-button--active');
    evt.currentTarget.classList.add('catalog-sort__type-button--active');
  };

  const sortOrderClickHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    setSortOrder(evt.currentTarget.value);
    document.querySelector('.catalog-sort__order-button--active')?.classList.remove('catalog-sort__order-button--active');
    evt.currentTarget.classList.add('catalog-sort__order-button--active');
  };

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">
            <form className="catalog-filter">
              <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Цена, ₽</legend>
                <div className="catalog-filter__price-range">
                  <div className="form-input">
                    <label className="visually-hidden">Минимальная цена</label>
                    <input type="number" placeholder="1 000" id="priceMin" name="от" />
                  </div>
                  <div className="form-input">
                    <label className="visually-hidden">Максимальная цена</label>
                    <input type="number" placeholder="30 000" id="priceMax" name="до" />
                  </div>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Тип гитар</legend>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" />
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" defaultChecked />
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" defaultChecked />
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
              </fieldset>
              <fieldset className="catalog-filter__block">
                <legend className="catalog-filter__block-title">Количество струн</legend>
                {stringsCount.map((stringCount, id) => {
                  const keyValue = `${id} - strings`;
                  return (
                    <div className="form-checkbox catalog-filter__block-item" key={keyValue}>
                      <input
                        className="visually-hidden"
                        type="checkbox"
                        id={`${stringCount}-strings`}
                        name={`${stringCount}-strings`}
                        checked={stringCountFilter[id]}
                        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                          const value = target.checked;
                          dispatch(setFilter([...stringCountFilter.slice(0, id), value, ...stringCountFilter.slice(id + 1)]));
                        }}
                      />
                      <label htmlFor={`${stringCount}-strings`}>{stringCount}</label>
                    </div>
                  );
                })}
              </fieldset>
            </form>
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
            <GuitarsList guitars={guitars} />
            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><Link className="link pagination__page-link" to="/">1</Link>
                </li>
                <li className="pagination__page"><Link className="link pagination__page-link" to="/">2</Link>
                </li>
                <li className="pagination__page"><Link className="link pagination__page-link" to="/">3</Link>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><Link className="link pagination__page-link" to="/">Далее</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </MainLayout >
  );
}

export default Main;
