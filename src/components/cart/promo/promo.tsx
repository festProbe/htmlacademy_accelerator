import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCouponAction } from '../../../store/api-actions';
import { selectDiscount } from '../../../store/selectors';

function Promo(): JSX.Element {
  const dispatch = useDispatch();
  const [userText, setUserText] = useState<string | null>('');
  const discount = useSelector(selectDiscount);
  const PROMO_CODES = [
    'light-333',
    'medium-444',
    'height-555',
  ];

  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const space = /\s/;
    const value = evt.currentTarget.value;
    if (!value.match(space)) {
      setUserText(value);
    }
    const incorrectPromoError = document.querySelector('.form-input__message--error');
    if (!incorrectPromoError?.classList.contains('hidden')) {
      incorrectPromoError?.classList.add('hidden');
    }
  };

  const clickUsePromoHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (userText && PROMO_CODES.includes(userText)) {
      dispatch(postCouponAction(userText));
    }
    if (userText && !PROMO_CODES.includes(userText)) {
      document.querySelector('.form-input__message--error')?.classList.remove('hidden');
    }
  };
  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/">
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" onChange={onChangeHandler} value={userText ? userText : ''} disabled={discount !== 0} />
          {discount !== 0 ? <p className="form-input__message form-input__message--success">Промокод принят</p> : <p className="form-input__message form-input__message--error hidden">неверный промокод</p>}
        </div>
        <button className="button button--big coupon__button" onClick={clickUsePromoHandler} disabled={discount !== 0}>Применить</button>
      </form>
    </div>
  );
}

export default Promo;
