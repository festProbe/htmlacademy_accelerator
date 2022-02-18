import { CommentType } from '../../../types/data';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type ReviewItemProps = {
  comment: CommentType;
}

function ReviewItem({ comment }: ReviewItemProps): JSX.Element {
  const { rating, advantages, createAt, disadvantages, userName } = comment;

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
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4><span className="review__date">{dayjs(createAt).locale('ru').format('D MMMM')}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        {stars}
        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment.comment}</p>
    </div>
  );
}

export default ReviewItem;
