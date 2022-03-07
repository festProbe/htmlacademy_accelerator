import FocusTrap from 'focus-trap-react';
import { MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { AppRoute } from '../../../utils/const';

type SuccessAddedToCartProps = {
  setIsAddingSuccessfulOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SuccessAddedToCartPopup({ setIsAddingSuccessfulOpen }: SuccessAddedToCartProps): JSX.Element {
  const successAddedToCartModalRef = useRef(null);

  const closeSuccessAddedPopup = () => {
    document.body.style.overflow = '';
    setIsAddingSuccessfulOpen(false);
  };

  const clickCloseSuccessAddedPopupHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    closeSuccessAddedPopup();
  };

  useOnClickOutside(successAddedToCartModalRef, closeSuccessAddedPopup);
  return (
    <FocusTrap>
      <div style={{ width: '550px', height: '410px', marginBottom: '50px' }}>
        <div className="modal is-active modal--success modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={successAddedToCartModalRef}>
              <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <p className="modal__message">Товар успешно добавлен в корзину</p>
              <div className="modal__button-container modal__button-container--add">
                <Link className="button button--small modal__button" to={AppRoute.CART} onClick={closeSuccessAddedPopup}>Перейти в корзину</Link>
                <Link className="button button--black-border button--small modal__button modal__button--right" to={AppRoute.MAIN} onClick={closeSuccessAddedPopup}>Продолжить покупки</Link>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={clickCloseSuccessAddedPopupHandler}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default SuccessAddedToCartPopup;
