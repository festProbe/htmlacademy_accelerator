import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/selectors';
import { stringsCount } from '../../utils/const';

function Main(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const [stringFilter, setStringFilter] = useState([true, false, false, true]);

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
                        checked={stringFilter[id]}
                        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                          const value = target.checked;
                          setStringFilter([...stringFilter.slice(0, id), value, ...stringFilter.slice(id + 1)]);
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
                <button className="catalog-sort__type-button catalog-sort__type-button--active" aria-label="по цене" tabIndex={-1}>по цене</button>
                <button className="catalog-sort__type-button" aria-label="по популярности">по популярности</button>
              </div>
              <div className="catalog-sort__order">
                <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию" tabIndex={-1}></button>
                <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
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
