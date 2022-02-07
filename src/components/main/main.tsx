import {Link, useHistory} from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import Sort from './sort/sort';
import Filter from './filter/filter';
import Pages from './pages/pages';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCurrentPage,
  selectGuitars, selectGuitarTypes, selectIsGuitarsLoaded,
  selectMaxPrice,
  selectMaxPriceForPlaceholder,
  selectMinPrice,
  selectMinPriceForPlaceholder, selectSortOrder, selectSortType, selectStringsCounts
} from '../../store/selectors';
import {useEffect} from 'react';
import {fetchGuitarsAction} from '../../store/api-actions';
import {ArrayParam, NumberParam, StringParam, useQueryParams} from 'use-query-params';
import {
  setCurrentPage,
  setGuitarTypes,
  setMaxPrice,
  setMinPrice,
  setSortType,
  setStringsCounts
} from '../../store/actions';
import queryString from 'query-string';
import LoadingScreen from '../common/loading-screen/loading-screen';

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const guitars = useSelector(selectGuitars);
  const isGuitarsLoaded = useSelector(selectIsGuitarsLoaded);
  // Filters
  const minPriceFilter = useSelector(selectMinPrice);
  const maxPriceFilter = useSelector(selectMaxPrice);
  const placeholderMin = useSelector(selectMinPriceForPlaceholder);
  const placeholderMax = useSelector(selectMaxPriceForPlaceholder);
  const guitarTypes = useSelector(selectGuitarTypes);
  const stringsCounts = useSelector(selectStringsCounts);
  //Sort
  const sortType = useSelector(selectSortType);
  const sortOrder = useSelector(selectSortOrder);
  //Page
  const currentPage = useSelector(selectCurrentPage);

  type parsedUrlType = {
    page?: number,
    'price-gte'?: string,
    'price_lte'?: string,
    type?: string[],
    stringCount?: string[],
    _sort?: string,
    _order?: string,
  };

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    'price-gte': StringParam,
    'price_lte': StringParam,
    type: ArrayParam,
    stringCount: ArrayParam,
    _sort: StringParam,
    _order: StringParam,
  });

  useEffect(() => {
    const search = history.location.search;
    const parsedURL: parsedUrlType = queryString.parse(search);
    if (parsedURL._sort !== undefined) {
      dispatch(setSortType(parsedURL._sort));
    }
    if (parsedURL.page !== undefined) {
      dispatch(setCurrentPage(Number(parsedURL.page)));
    }
    if (parsedURL['price-gte'] !== undefined) {
      dispatch(setMinPrice(parsedURL['price-gte']));
    }
    if (parsedURL['price_lte'] !== undefined) {
      dispatch(setMaxPrice(parsedURL['price_lte']));
    }
    if (parsedURL.type !== undefined) {
      let newGuitarTypes = parsedURL.type;
      if (typeof parsedURL.type === 'string') {
        newGuitarTypes = [parsedURL.type];
      }
      dispatch(setGuitarTypes(newGuitarTypes));
    }
    if (parsedURL.stringCount !== undefined) {
      let newStingsCount = parsedURL.stringCount;
      if (typeof parsedURL.stringCount === 'string') {
        newStingsCount = [parsedURL.stringCount];
      }
      dispatch(setStringsCounts(newStingsCount));
    }
    dispatch(fetchGuitarsAction());
  }, [dispatch, history.location.search]);

  useEffect(() => {
    setQuery({
      page: currentPage === 1 ? undefined : currentPage,
      'price-gte': minPriceFilter ? minPriceFilter : undefined,
      'price_lte': maxPriceFilter ? maxPriceFilter : undefined,
      type: guitarTypes ? guitarTypes : undefined,
      stringCount: stringsCounts ? stringsCounts : undefined,
      _sort: sortType ? sortType : undefined,
      _order: sortOrder ? sortOrder : undefined,
    }, 'push');
    dispatch(fetchGuitarsAction());
  }, [dispatch, currentPage, minPriceFilter, maxPriceFilter, guitarTypes, stringsCounts, sortOrder, sortType, query, setQuery]);

  if (isGuitarsLoaded === false){
    return <LoadingScreen/>;
  }

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
            <Filter
              minPriceFilter={minPriceFilter}
              maxPriceFilter={maxPriceFilter}
              placeholderMin={placeholderMin}
              placeholderMax={placeholderMax}
              guitarTypes={guitarTypes}
              stringsCounts={stringsCounts}
            />
            <Sort
              sortType={sortType}
              sortOrder={sortOrder}
            />
            <GuitarsList guitars={guitars}/>
            <Pages/>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Main;
