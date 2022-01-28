import { Link } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import Sort from './sort/sort';
import Filter from './filter/filter';
import Pages from './pages/pages';
import { useSelector } from 'react-redux';
import { selectGuitarsByStringsCounts } from '../../store/selectors';

function Main(): JSX.Element {
  const guitars = useSelector(selectGuitarsByStringsCounts);

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
