import { Link } from 'react-router-dom';
import { CommentType } from '../../../types/data';
import ReviewItem from '../review-item/review-item';
import { MouseEvent, useEffect, useState } from 'react';
import NewReview from '../new-review/new-review';
import NewReviewSuccess from '../new-review-success/new-review-success';
import dayjs from 'dayjs';

type ReviewListProps = {
  comments: CommentType[];
}

function ReviewList({ comments }: ReviewListProps): JSX.Element {
  const COMMENTS_COUNT_PER_STEP = 3;
  const [showedCommentCount, setShowedCommentCount] = useState<number>(COMMENTS_COUNT_PER_STEP);
  const [showedComments, setShowedComments] = useState<CommentType[]>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);

  useEffect(() => {
    if (!isModalOpened) {
      window.removeEventListener('keydown', closeNewReviewModal);
    }
  }, [isModalOpened]);

  useEffect(() => {
    if (!isSuccessModalOpened) {
      window.removeEventListener('keydown', closeNewReviewModal);
    }
  }, [isSuccessModalOpened]);

  useEffect(() => {
    const commentsCopy = comments.slice().sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    const commentCount = comments.length;
    const newShowCommentCount = Math.min(commentCount, showedCommentCount);
    setShowedComments(commentsCopy.slice(0, newShowCommentCount));
  }, [comments, showedCommentCount]);

  const clickShowMoreHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setShowedCommentCount(showedCommentCount + COMMENTS_COUNT_PER_STEP);
  };

  const clickAnchorButtonHandler = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const header = document.querySelector('#header');
    header?.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  };

  const closeNewReviewModal = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      document.body.style.overflow = '';
      setIsModalOpened(false);
    }
  };

  const clickAddNewReviewHandler = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setIsModalOpened(true);
    window.addEventListener('keydown', closeNewReviewModal);
  };

  function checkPosition() {
    // Нам потребуется знать высоту документа и высоту экрана.
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    // Они могут отличаться: если на странице много контента,
    // высота документа будет больше высоты экрана (отсюда и скролл).

    // Записываем, сколько пикселей пользователь уже проскроллил.
    const scrolled = window.scrollY;

    // Обозначим порог, по приближении к которому
    // будем вызывать какое-то действие.
    // В нашем случае — четверть экрана до конца страницы.
    const threshold = height - screenHeight / 4;

    // Отслеживаем, где находится низ экрана относительно страницы.
    const position = scrolled + screenHeight;

    if (position >= threshold) {
      setShowedCommentCount(showedCommentCount + COMMENTS_COUNT_PER_STEP);
    }
  }

  function throttle(fn: () => void, wait= 500) {
    let shouldWait = false;

    return function() {
      if (!shouldWait) {
        fn();
        shouldWait = true;
        setTimeout(() => shouldWait = false, wait);
      }
    };
  }

  window.addEventListener('scroll', throttle(checkPosition));
  window.addEventListener('resize', throttle(checkPosition));

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link
        className="button button--red-border button--big reviews__sumbit-button"
        to="/"
        onClick={clickAddNewReviewHandler}
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
      <Link
        className="button button--up button--red-border button--big reviews__up-button"
        onClick={clickAnchorButtonHandler}
        to="/"
      >
        Наверх
      </Link>
      {isModalOpened ? <NewReview setIsModalOpened={setIsModalOpened} setIsSuccessModalOpened={setIsSuccessModalOpened} /> : ''}
      {isSuccessModalOpened ? <NewReviewSuccess setIsSuccessModalOpened={setIsSuccessModalOpened} /> : ''}
    </section>
  );
}

export default ReviewList;
