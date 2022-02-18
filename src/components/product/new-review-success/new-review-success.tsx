import { Dispatch, SetStateAction, MouseEvent, useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

type NewReviewSuccessPropsType = {
  setIsSuccessModalOpened: Dispatch<SetStateAction<boolean>>;
};

function NewReviewSuccess({ setIsSuccessModalOpened }: NewReviewSuccessPropsType): JSX.Element {
  const newReviewSuccessModalRef = useRef(null);
  const modalSuccessStyle = {
    width: '550px',
    height: '410px',
    marginBottom: '50px',
  };

  const closeNewReviewSuccessModal = () => {
    document.body.style.overflow = '';
    setIsSuccessModalOpened(false);
  };

  const clickCloseSuccessModalHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    closeNewReviewSuccessModal();
  };

  useOnClickOutside(newReviewSuccessModalRef, closeNewReviewSuccessModal);
  return (
    <div style={modalSuccessStyle}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content" ref={newReviewSuccessModalRef}>
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review">К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={clickCloseSuccessModalHandler}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReviewSuccess;
