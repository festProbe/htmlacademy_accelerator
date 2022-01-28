import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentPage } from '../../../store/actions';
import { fetchGuitarsAction } from '../../../store/api-actions';
import { selectCurrentPage, selectGuitarsCount } from '../../../store/selectors';
import { AppRoute, MAX_GUITARS_ON_PAGE } from '../../../utils/const';

function Pages(): JSX.Element {
  const dispatch = useDispatch();
  const guitarsCount = useSelector(selectGuitarsCount);
  const pageCount = Math.ceil(guitarsCount / MAX_GUITARS_ON_PAGE);
  const currentPage = useSelector(selectCurrentPage);

  const pageArr = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArr.push(i);
  }

  const handlePageClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(Number(evt.currentTarget.firstChild?.textContent)));
    dispatch(fetchGuitarsAction());
  };

  const handleNextPageClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchGuitarsAction());
  };

  const handlePrevPageClick = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchGuitarsAction());
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage === 1
          ? ''
          :
          <li className="pagination__page pagination__page--prev" id="prev" onClick={handlePrevPageClick}>
            <Link
              className="link pagination__page-link"
              to={currentPage !== 2 ? `${AppRoute.PAGE}${currentPage - 1}` : AppRoute.MAIN}
            >
              Назад
            </Link>
          </li>}


        {pageArr.map((page) => (
          <li className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`} key={page} onClick={handlePageClick}>
            <Link className="link pagination__page-link" to={page !== 1 ? `${AppRoute.PAGE}${page}` : AppRoute.MAIN}>{page}</Link>
          </li>
        ))}

        {currentPage === pageCount
          ? ''
          :
          <li className="pagination__page pagination__page--next" id="next" onClick={handleNextPageClick}>
            <Link
              className="link pagination__page-link"
              to={`${AppRoute.PAGE}${currentPage + 1}`}
            >
              Далее
            </Link>
          </li>}

      </ul>
    </div>
  );
}

export default Pages;
