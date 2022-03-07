/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useHistory } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import Sort from './sort/sort';
import Filter from './filter/filter';
import Pages from './pages/pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectGuitars, selectIsGuitarsLoaded } from '../../store/selectors';
import { useEffect, useState } from 'react';
import { fetchGuitarsAction } from '../../store/api-actions';
import { ArrayParam, NumberParam, StringParam, useQueryParams } from 'use-query-params';
import queryString from 'query-string';
import LoadingScreen from '../common/loading-screen/loading-screen';
import { parsedUrlType } from '../../types/params';
import {
  setCurrentPage,
  setGuitarTypes,
  setMaxPrice,
  setMinPrice,
  setSortOrder,
  setSortType,
  setStringsCounts
} from '../../store/actions';
import AddToCartPopup from './add-to-cart-popup/add-to-cart-popup';
import { GuitarType } from '../../types/data';
import SuccessAddedToCartPopup from './success-added-to-cart-popup/success-added-to-cart-popup';

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const guitars = useSelector(selectGuitars);
  const isGuitarsLoaded = useSelector(selectIsGuitarsLoaded);
  const parsedURL: parsedUrlType = queryString.parse(history.location.search);
  const [addingGuitarToCart, setAddingGuitarToCart] = useState<null | GuitarType>(null);
  const [isAddingSuccessfulOpen, setIsAddingSuccessfulOpen] = useState(false);

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    'price_gte': StringParam,
    'price_lte': StringParam,
    type: ArrayParam,
    stringCount: ArrayParam,
    _sort: StringParam,
    _order: StringParam,
  });

  useEffect(() => {
    dispatch(fetchGuitarsAction());
  }, [dispatch, query]);

  useEffect(() => {
    if (parsedURL.price_gte) {
      dispatch(setMinPrice(parsedURL.price_gte));
      setQuery({ 'price_gte': parsedURL.price_gte }, 'push');
    }
    if (parsedURL.price_lte) {
      dispatch(setMaxPrice(parsedURL.price_lte));
      setQuery({ 'price_lte': parsedURL.price_lte }, 'push');
    }
    if (parsedURL._sort) {
      dispatch(setSortType(parsedURL._sort));
      setQuery({ _sort: parsedURL._sort }, 'push');
    }
    if (parsedURL._order) {
      dispatch(setSortOrder(parsedURL._order));
      setQuery({ _order: parsedURL._order }, 'push');
    }
    if (parsedURL.page && parsedURL.page > 1) {
      dispatch(setCurrentPage(parsedURL.page));
      setQuery({ page: parsedURL.page }, 'push');
    }
    if (parsedURL.type) {
      if (Array.isArray(parsedURL.type)) {
        dispatch(setGuitarTypes(parsedURL.type));
        setQuery({ type: parsedURL.type }, 'push');
      }
      if (typeof parsedURL.type === 'string') {
        dispatch(setGuitarTypes([parsedURL.type]));
        setQuery({ type: parsedURL.type }, 'push');
      }
    }
    if (parsedURL.stringCount) {
      if (Array.isArray(parsedURL.stringCount)) {
        dispatch(setStringsCounts(parsedURL.stringCount));
        setQuery({ stringCount: parsedURL.stringCount }, 'push');
      }
      if (typeof parsedURL.stringCount === 'string') {
        dispatch(setStringsCounts([parsedURL.stringCount]));
        setQuery({ stringCount: parsedURL.stringCount }, 'push');
      }
    }
  }, []);

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
            <Filter setQueryParams={setQuery} />
            <Sort setQueryParams={setQuery} />
            {isGuitarsLoaded ? <GuitarsList guitars={guitars} setAddingGuitarToCart={setAddingGuitarToCart} /> : <LoadingScreen />}
            <Pages setQueryParams={setQuery} />
          </div>
        </div>
        {addingGuitarToCart !== null ? <AddToCartPopup guitar={addingGuitarToCart} setAddingGuitarToCart={setAddingGuitarToCart} setIsAddingSuccessfulOpen={setIsAddingSuccessfulOpen} /> : ''}
        {isAddingSuccessfulOpen ? <SuccessAddedToCartPopup setIsAddingSuccessfulOpen={setIsAddingSuccessfulOpen} /> : ''}
      </main>
    </MainLayout>
  );
}

export default Main;
