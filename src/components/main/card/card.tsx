import { Link } from 'react-router-dom';
import { GuitarType } from '../../../types/data';
import { AppRoute } from '../../../utils/const';

type CardProps = {
  guitar: GuitarType
  commentsCount: number,
}

function Card({ guitar, commentsCount }: CardProps): JSX.Element {
  const { previewImg, name, id, rating, price } = guitar;

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
    <div className="product-card"><img src={previewImg} srcSet={`${previewImg} 2x`} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
          {stars}
          <span className="rate__count">{commentsCount}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.PRODUCT}/${id}`}>Подробнее</Link><Link className="button button--red button--mini button--add-to-cart" to="/">Купить</Link>
      </div>
    </div>
  );
}

export default Card;
