import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
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
  const [countValue, setCountValue] = useState<string | number>(guitar.count);
  const dispatch = useDispatch();
  const debounceOnChangeGuitarsCount = useDebouncedCallback((value: number) => {
    dispatch(setCustomGuitarCount({ ...guitar, count: value }));
  }, 350);
  const debounceOnIncreaseGuitarsCount = useDebouncedCallback(() => {
    dispatch(putGuitarInCart(guitar));
  }, 350);
  const debounceOnDecreaseGuitarsCount = useDebouncedCallback(() => {
    dispatch(decreseGuitarInCart(guitar));
  }, 350);

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
      setCountValue(+countValue - 1);
      debounceOnDecreaseGuitarsCount();
    } else {
      document.body.style.overflow = 'hidden';
      setDeletingGuitar(guitar);
      window.addEventListener('keydown', closeDeleteGuitarFromCartPopup);
    }
  };
  const clickIncreaseCount = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (countValue < 99) {
      setCountValue(+countValue + 1);
      debounceOnIncreaseGuitarsCount();
    }
  };
  const changeGuitarsCountHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const number = /^\d*$/;
    if (value === '') {
      setCountValue('');
      return;
    }
    if (value.match(number)) {
      const numberValue = Math.max(1, Math.min(+value, MAX_GUITAR_COUNT));
      setCountValue(numberValue);
      debounceOnChangeGuitarsCount(numberValue);
    }
  };

  const blurGuitarsCountHandler = () => {
    setCountValue(guitar.count);
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить" onClick={clickDeleteGuitarFromCartHandler}><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image"><img src={previewImg} srcSet={`${previewImg} 2x`} width="55" height="130" alt={`Гитара ${name}`} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{getRuGuitarType(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price.toLocaleString()} ₽</div>
      <div className="quantity cart-item__quantity">
        <button className="quantity__button" aria-label="Уменьшить количество" onClick={clickDecreaseCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder={countValue.toString()}
          id="2-count"
          name="2-count"
          ref={inputCountRef}
          min={1}
          max={MAX_GUITAR_COUNT}
          onChange={changeGuitarsCountHandler}
          onBlur={blurGuitarsCountHandler}
          value={countValue}
        />
        <button className="quantity__button" aria-label="Увеличить количество" onClick={clickIncreaseCount}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{(price * guitar.count).toLocaleString()} ₽</div>
    </div>
  );
}

export default CartItem;
