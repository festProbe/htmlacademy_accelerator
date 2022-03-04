import FocusTrap from 'focus-trap-react';
import { MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { putGuitarInCart } from '../../../store/actions';
import { selectGuitarsInCart } from '../../../store/selectors';
import { GuitarType } from '../../../types/data';
import { getRuGuitarType } from '../../../utils/utils';

type AddToCartProps = {
  guitar: GuitarType;
  setAddingGuitarToCart: React.Dispatch<React.SetStateAction<GuitarType | null>>;
  setIsAddingSuccessfulOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddToCart({ guitar, setAddingGuitarToCart, setIsAddingSuccessfulOpen }: AddToCartProps): JSX.Element {
  const { previewImg, name, price, vendorCode, stringCount, type, id } = guitar;
  const addingToCartModalRef = useRef(null);
  const guitarsInCart = useSelector(selectGuitarsInCart);
  const dispatch = useDispatch();

  let count = 1;

  guitarsInCart.forEach((guitarInCount) => {
    if (guitarInCount.guitar.id === id) {
      count = guitarInCount.count;
    }
  });

  const closeAddCartPopup = () => {
    document.body.style.overflow = '';
    setAddingGuitarToCart(null);
  };

  const clickCloseAddToCartPopupHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    closeAddCartPopup();
  };

  const closeSuccessAddToCartPopup = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      document.body.style.overflow = '';
      setIsAddingSuccessfulOpen(false);
    }
  };

  const clickAddToCartHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(putGuitarInCart({
      guitar,
      count: count,
    }));
    document.body.style.overflow = 'hidden';
    setIsAddingSuccessfulOpen(true);
    window.addEventListener('keydown', closeSuccessAddToCartPopup);
  };

  useOnClickOutside(addingToCartModalRef, closeAddCartPopup);
  return (
    <FocusTrap>
      <div style={{ width: '550px', height: '440px', marginBottom: '50px' }}>
        <div className="modal is-active modal-for-ui-kit">
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal></div>
            <div className="modal__content" ref={addingToCartModalRef}>
              <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
              <div className="modal__info">
                <img className="modal__img" src={`../${previewImg}`} width="67" height="137" alt={name} />
                <div className="modal__info-wrapper">
                  <h3 className="modal__product-name title title--little title--uppercase">{`Гитара ${name}`}</h3>
                  <p className="modal__product-params modal__product-params--margin-11">{`Артикул: ${vendorCode}`}</p>
                  <p className="modal__product-params">{`${getRuGuitarType(type)}, ${stringCount} струнная`}</p>
                  <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{`${price} ₽`}</span></p>
                </div>
              </div>
              <div className="modal__button-container">
                <button className="button button--red button--big modal__button modal__button--add" onClick={clickAddToCartHandler}>Добавить в корзину</button>
              </div>
              <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={clickCloseAddToCartPopupHandler}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddToCart;
