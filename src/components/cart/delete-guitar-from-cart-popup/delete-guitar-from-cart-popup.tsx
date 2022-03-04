import FocusTrap from 'focus-trap-react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { deleteGuitarFromCart } from '../../../store/actions';
import { GuitarInCart } from '../../../types/data';
import { getRuGuitarType } from '../../../utils/utils';

type DeleteGuitarPopupPropsType = {
  guitar: GuitarInCart,
  setDeletingGuitar: React.Dispatch<React.SetStateAction<GuitarInCart | null>>;
}

function DeleteGuitarFromCartPopup({ guitar, setDeletingGuitar }: DeleteGuitarPopupPropsType): JSX.Element {
  const { previewImg, name, price, vendorCode, stringCount, type } = guitar.guitar;
  const deletingFromCartModalRef = useRef(null);
  const dispatch = useDispatch();

  const closeDeleteGuitarFromCartPopup = () => {
    document.body.style.overflow = '';
    setDeletingGuitar(null);
  };

  const clickDeleteGuitarHandler = () => {
    dispatch(deleteGuitarFromCart(guitar));
    closeDeleteGuitarFromCartPopup();
  };

  useOnClickOutside(deletingFromCartModalRef, closeDeleteGuitarFromCartPopup);
  return (
    <FocusTrap>
      <div style={{ width: '550px', height: '440px', marginBottom: '50px' }}>
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={deletingFromCartModalRef}>
              <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
              <div className="modal__info">
                <img className="modal__img" src={`../${previewImg}`} width="67" height="137" alt="Честер bass" />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                  <p className="modal__product-params">{getRuGuitarType(type)}, {stringCount} струнная</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{price} ₽</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--small modal__button" onClick={clickDeleteGuitarHandler}>Удалить товар</button>
                <button
                  className="button button--black-border button--small modal__button modal__button--right"
                  onClick={closeDeleteGuitarFromCartPopup}
                >
                  Продолжить покупки
                </button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={closeDeleteGuitarFromCartPopup}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default DeleteGuitarFromCartPopup;
