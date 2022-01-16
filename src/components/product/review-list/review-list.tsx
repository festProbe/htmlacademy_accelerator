import { Link } from 'react-router-dom';
import { CommentType } from '../../../types/data';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
  comments: CommentType[];
}

function ReviewList({ comments }: ReviewListProps): JSX.Element {
  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3><Link className="button button--red-border button--big reviews__sumbit-button" to="/">Оставить отзыв</Link>
      {comments.map((comment) => (
        <ReviewItem
          key={comment.id}
          comment={comment}
        />
      ))}
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><Link className="button button--up button--red-border button--big reviews__up-button" to="/">Наверх</Link>
    </section>
  );
}

export default ReviewList;
