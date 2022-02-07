import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCommentsAction, fetchGuitarAction } from '../../store/api-actions';
import {selectComments, selectGuitar, selectIsGuitarLoaded} from '../../store/selectors';
import LoadingScreen from '../common/loading-screen/loading-screen';
import MainLayout from '../common/main-layout/main-layout';
import ReviewList from './review-list/review-list';
import {GuitarType} from '../../types/data';

function Product(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const guitar = useSelector(selectGuitar);
  const isGuitarLoaded = useSelector(selectIsGuitarLoaded);
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
    dispatch(fetchCommentsAction(id));
  }, [id, dispatch]);

  if (isGuitarLoaded === false) {
    return <LoadingScreen />;
  }

  const { name, rating, previewImg, vendorCode, type, stringCount, description, price } = guitar as GuitarType;

  const stars = [];
  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(
      <svg width="12" height="11" aria-hidden="true" key={i}>
        <use xlinkHref="#icon-full-star"></use>
      </svg>);
  }
  for (let i = 5; i > Math.round(rating); i--) {
    stars.push(
      <svg width="12" height="11" aria-hidden="true" key={i}>
        <use xlinkHref="#icon-star"></use>
      </svg>);
  }

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Товар</Link>
            </li>
          </ul>
          <div className="product-container"><img className="product-container__img" src={`../${previewImg}`} srcSet={`%PUBLIC_URL%/${previewImg} 2x`} width="90" height="235" alt={name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                {stars}
                <span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <div className="tabs"><Link className="button button--medium tabs__button" to="/characteristics">Характеристики</Link><Link className="button button--black-border button--medium tabs__button" to="/">Описание</Link>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{type}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description hidden">{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price} ₽</p><Link className="button button--red button--big product-container__button" to="/">Добавить в корзину</Link>
            </div>
          </div>
          <ReviewList comments={comments} />
        </div>
      </main>
    </MainLayout >
  );
}

export default Product;
