import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductInfo } from '../../store/selectors';
import MainLayout from '../common/main-layout/main-layout';

function Product(): JSX.Element {
  const guitar = useSelector(getProductInfo);

  if (!guitar) {
    return (<div>Loading...</div>);
  }

  const { name, rating, previewImg, vendorCode, type, stringCount, description, id } = guitar;

  const stars = [];
  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(
      <svg width="12" height="11" aria-hidden="true" key={id + i}>
        <use xlinkHref="#icon-full-star"></use>
      </svg>);
  }
  for (let i = 5; i > Math.round(rating); i--) {
    stars.push(
      <svg width="12" height="11" aria-hidden="true" key={id - i}>
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
          <div className="product-container"><img className="product-container__img" src={previewImg} srcSet={`${previewImg} 2x`} width="90" height="235" alt={name} />
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
              <p className="product-container__price-info product-container__price-info--value">52 000 ₽</p><Link className="button button--red button--big product-container__button" to="/">Добавить в корзину</Link>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3><Link className="button button--red-border button--big reviews__sumbit-button" to="/">Оставить отзыв</Link>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button><Link className="button button--up button--red-border button--big reviews__up-button" to="/">Наверх</Link>
          </section>
        </div>
      </main>
    </MainLayout >
  );
}

export default Product;
