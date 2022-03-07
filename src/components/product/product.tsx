import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCommentsAction, fetchGuitarAction } from '../../store/api-actions';
import { selectComments, selectGuitar, selectIsGuitarLoaded, selectProductTab } from '../../store/selectors';
import LoadingScreen from '../common/loading-screen/loading-screen';
import MainLayout from '../common/main-layout/main-layout';
import ReviewList from './review-list/review-list';
import { setProductTab } from '../../store/actions';
import { getRuGuitarType } from '../../utils/utils';
import { GuitarType } from '../../types/data';
import AddToCartPopup from '../main/add-to-cart-popup/add-to-cart-popup';
import SuccessAddedToCartPopup from '../main/success-added-to-cart-popup/success-added-to-cart-popup';

function Product(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const guitar = useSelector(selectGuitar);
  const isGuitarLoaded = useSelector(selectIsGuitarLoaded);
  const comments = useSelector(selectComments);
  const productTab = useSelector(selectProductTab);
  const [addingGuitarToCart, setAddingGuitarToCart] = useState<null | GuitarType>(null);
  const [isAddingSuccessfulOpen, setIsAddingSuccessfulOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
    dispatch(fetchCommentsAction(id));
  }, [id, dispatch]);
  if (!guitar || !isGuitarLoaded || !comments) {
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
            <LoadingScreen />
          </div>
        </main>
      </MainLayout>
    );
  }
  const { name, rating, previewImg, vendorCode, type, stringCount, description, price } = guitar;

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

  const clickProductTabHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setProductTab(evt.currentTarget.value));
  };

  const closeAddToCartPopup = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      document.body.style.overflow = '';
      setAddingGuitarToCart(null);
    }
  };

  const clickAddToCartHandler = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setAddingGuitarToCart(guitar);
    window.addEventListener('keydown', closeAddToCartPopup);
  };

  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to="/">Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to="/">{name}</Link>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img"
              src={`../${previewImg}`}
              srcSet={`%PUBLIC_URL%/${previewImg} 2x`}
              width="90"
              height="235"
              alt={name}
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <span className="visually-hidden">Рейтинг:</span>
                {stars}
                <span className="rate__count">{comments.length}</span><span className="rate__message"></span>
              </div>
              <div className="tabs">
                <button
                  className={`button button--medium tabs__button ${productTab === 'characteristics' ? '' : 'button button--black-border'}`}
                  value="characteristics"
                  onClick={clickProductTabHandler}
                >
                  Характеристики
                </button>
                <button
                  className={`button button--medium tabs__button ${productTab === 'description' ? '' : 'button button--black-border'}`}
                  value="description"
                  onClick={clickProductTabHandler}
                >
                  Описание
                </button>
                <div className="tabs__content" id="characteristics">
                  <table className={`${productTab === 'characteristics' ? '' : 'hidden'} tabs__table`}>
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{getRuGuitarType(type)}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className={`${productTab === 'description' ? '' : 'hidden'} tabs__product-description`}>{description}</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
              <Link className="button button--red button--big product-container__button" to="/" onClick={clickAddToCartHandler}>
                Добавить в корзину
              </Link>
            </div>
          </div>
          <ReviewList />
        </div>
        {addingGuitarToCart !== null ? <AddToCartPopup guitar={guitar} setAddingGuitarToCart={setAddingGuitarToCart} setIsAddingSuccessfulOpen={setIsAddingSuccessfulOpen} /> : ''}
        {isAddingSuccessfulOpen ? <SuccessAddedToCartPopup setIsAddingSuccessfulOpen={setIsAddingSuccessfulOpen} /> : ''}
      </main>
    </MainLayout>
  );
}

export default Product;
