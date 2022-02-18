import { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGuitar } from '../../../store/selectors';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { CommentPostType } from '../../../types/data';
import { sendNewCommentAction } from '../../../store/api-actions';

type NewReviewPropsType = {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
  setIsSuccessModalOpened: Dispatch<SetStateAction<boolean>>;
}

function NewReview({ setIsModalOpened, setIsSuccessModalOpened }: NewReviewPropsType): JSX.Element {
  const guitar = useSelector(selectGuitar);
  const dispatch = useDispatch();
  const newReviewModalRef = useRef(null);
  const [newReview, setNewReview] = useState<CommentPostType>({
    guitarId: guitar?.id,
    userName: '',
    rating: undefined,
    advantage: '',
    disadvantage: '',
    comment: '',
  });

  const modalReviewStyle = {
    width: '550px',
    height: '610px',
    marginBottom: '50px',
  };

  const closeNewReviewModal = () => {
    document.body.style.overflow = '';
    setIsModalOpened(false);
  };

  const clickCloseNewReviewModalHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    closeNewReviewModal();
  };

  const changeUserNameHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setNewReview({ ...newReview, userName: value });
  };

  const changeAdvantageHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setNewReview({ ...newReview, advantage: value });
  };

  const changeDisadvantageHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setNewReview({ ...newReview, disadvantage: value });
  };

  const changeRatingHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setNewReview({ ...newReview, rating: Number(value) });
  };

  const changeCommentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setNewReview({ ...newReview, comment: value });
  };

  const closeOnEscNewReviewModal = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      document.body.style.overflow = '';
      setIsSuccessModalOpened(false);
    }
  };

  const submitNewReviewHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (newReview) {
      dispatch(sendNewCommentAction(newReview));
      closeNewReviewModal();
      document.body.style.overflow = 'hidden';
      setIsSuccessModalOpened(true);
      window.addEventListener('keydown', closeOnEscNewReviewModal);
    }
  };

  useOnClickOutside(newReviewModalRef, closeNewReviewModal);
  return (
    <div
      style={modalReviewStyle}
    >
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content" ref={newReviewModalRef}>
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitar?.name}</h3>
            <form className="form-review" onSubmit={submitNewReviewHandler}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">
                    Ваше Имя
                  </label>
                  <input
                    className="form-review__input form-review__input--name"
                    id="user-name"
                    type="text"
                    autoComplete="off"
                    onChange={changeUserNameHandler}
                    value={newReview.userName}
                    required
                  />
                  {newReview.userName === '' ? <span className="form-review__warning">Заполните поле</span> : ''}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input
                      className="visually-hidden" type="radio" id="star-5" name="rate" value="5"
                      onChange={changeRatingHandler}
                    />
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input
                      className="visually-hidden" type="radio" id="star-4" name="rate" value="4"
                      onChange={changeRatingHandler}
                    />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input
                      className="visually-hidden" type="radio" id="star-3" name="rate" value="3"
                      onChange={changeRatingHandler}
                    />
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input
                      className="visually-hidden" type="radio" id="star-2" name="rate" value="2"
                      onChange={changeRatingHandler}
                    />
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input
                      className="visually-hidden" type="radio" id="star-1" name="rate" value="1"
                      onChange={changeRatingHandler}
                    />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <span className="rate__count"></span>
                    {newReview.rating ? '' : <span className="rate__message">Поставьте оценку</span>}
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input
                className="form-review__input"
                id="pros"
                type="text"
                autoComplete="off"
                onChange={changeAdvantageHandler}
                value={newReview.advantage}
              />
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input
                className="form-review__input"
                id="user-name"
                type="text"
                autoComplete="off"
                onChange={changeDisadvantageHandler}
                value={newReview.disadvantage}
              />
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea
                className="form-review__input form-review__input--textarea"
                id="user-name"
                rows={10}
                autoComplete="off"
                onChange={changeCommentHandler}
                value={newReview.comment}
              >
              </textarea>
              <button
                className="button button--medium-20 form-review__button"
                type="submit"
                disabled={newReview.userName === '' || newReview.rating === 0}
              >
                Отправить отзыв
              </button>
            </form>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={clickCloseNewReviewModalHandler}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReview;
