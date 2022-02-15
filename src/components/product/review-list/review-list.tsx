import {Link} from 'react-router-dom';
import {CommentType} from '../../../types/data';
import ReviewItem from '../review-item/review-item';
import {MouseEvent, useEffect, useState} from 'react';

type ReviewListProps = {
  comments: CommentType[];
}

function ReviewList({comments}: ReviewListProps): JSX.Element {
  const COMMENTS_COUNT_PER_STEP = 3;
  const [showedCommentCount, setShowedCommentCount] = useState<number>(COMMENTS_COUNT_PER_STEP);
  const [showedComments, setShowedComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const commentsCopy = comments.slice();
    const commentCount = comments.length;
    const newShowCommentCount = Math.min(commentCount, showedCommentCount);
    setShowedComments (commentsCopy.slice(0, newShowCommentCount));
  }, [comments, showedCommentCount]);

  const clickShowMoreHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setShowedCommentCount(showedCommentCount + COMMENTS_COUNT_PER_STEP);
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link
        className="button button--red-border button--big reviews__sumbit-button" to="/"
      >
        Оставить отзыв
      </Link>
      {showedComments.map((comment) => (
        <ReviewItem
          key={comment.id}
          comment={comment}
        />
      ))}
      {showedCommentCount < comments.length
        ?
        <button
          className="button button--medium reviews__more-button"
          onClick={clickShowMoreHandler}
        >
          Показать еще отзывы
        </button> : ''}
      <Link className="button button--up button--red-border button--big reviews__up-button" to="/">Наверх</Link>
    </section>
  );
}

export default ReviewList;
