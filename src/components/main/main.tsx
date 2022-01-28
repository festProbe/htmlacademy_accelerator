import { Link, useParams } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import Sort from './sort/sort';
import Filter from './filter/filter';
import Pages from './pages/pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectGuitars } from '../../store/selectors';
import { useEffect } from 'react';
import { setCurrentPage } from '../../store/actions';
import { fetchGuitarsAction } from '../../store/api-actions';

function Main(): JSX.Element {
  const guitars = useSelector(selectGuitars);
  const dispatch = useDispatch();
  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    if (page) {
      dispatch(setCurrentPage(Number(page)));
      dispatch(fetchGuitarsAction());
    }
  }, [page, dispatch]);

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
            <Filter />
            <Sort />
            <GuitarsList guitars={guitars} />
            <Pages />
          </div>
        </div>
      </main>
    </MainLayout >
  );
}

export default Main;
