import { ChangeEvent, MouseEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { decreseGuitarInCart, putGuitarInCart, setCustomGuitarCount } from '../../../store/actions';
import { GuitarInCart } from '../../../types/data';
import { getRuGuitarType } from '../../../utils/utils';

type CartItemPropsType = {
  guitar: GuitarInCart;
  setDeletingGuitar: React.Dispatch<React.SetStateAction<GuitarInCart | null>>;
}

function CartItem({ guitar, setDeletingGuitar }: CartItemPropsType): JSX.Element {
  const MAX_GUITAR_COUNT = 99;
  const { name, type, vendorCode, stringCount, previewImg, price } = guitar.guitar;
  const inputCountRef = useRef(null);
  const dispatch = useDispatch();
  const debounceOnChangeGuitarsCount = useDebouncedCallback((value: number) => {
    dispatch(setCustomGuitarCount({ ...guitar, count: value }));
  });

  const closeDeleteGuitarFromCartPopup = (evt: KeyboardEvent) => {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      document.body.style.overflow = '';
      setDeletingGuitar(null);
    }
  };

  const clickDeleteGuitarFromCartHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setDeletingGuitar(guitar);
    window.addEventListener('keydown', closeDeleteGuitarFromCartPopup);
  };

  const clickDecreaseCount = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (guitar.count > 1) {
      dispatch(decreseGuitarInCart(guitar));
    } else {
      document.body.style.overflow = 'hidden';
      setDeletingGuitar(guitar);
      window.addEventListener('keydown', closeDeleteGuitarFromCartPopup);
    }
  };
  const clickIncreaseCount = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (guitar.count < 99) {
      dispatch(putGuitarInCart(guitar));
    }
  };
  const changeGuitarsCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(Number(evt.currentTarget.value), MAX_GUITAR_COUNT));
    debounceOnChangeGuitarsCount(value);
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={clickDeleteGuitarFromCartHandler}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={previewImg} srcSet="img/content/catalog-product-2@2x.jpg 2x" width="55" height="130" alt="ЭлектроГитара Честер bass" />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{getRuGuitarType(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={clickDecreaseCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder={guitar.count.toString()}
          id="2-count"
          name="2-count"
          ref={inputCountRef}
          max={MAX_GUITAR_COUNT}
          onChange={changeGuitarsCountHandler}
          value={guitar.count}
        />
        <button className="quantity__button" aria-label="Увеличить количество" onClick={clickIncreaseCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{price * guitar.count} ₽</div>
    </div>
  );
}

export default CartItem;
