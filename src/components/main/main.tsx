import { Link } from 'react-router-dom';
import MainLayout from '../common/main-layout/main-layout';
import GuitarsList from './guitars-list/guitars-list';
import { useSelector } from 'react-redux';
import {
  selectGuitarsByStringsCounts
} from '../../store/selectors';
import Sort from './sort/sort';
import Filter from './filter/filter';

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
