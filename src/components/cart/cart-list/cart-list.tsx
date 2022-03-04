import { GuitarInCart } from '../../../types/data';
import CartItem from '../cart-item/cart-item';

type CartListProps = {
  guitars: GuitarInCart[];
  setDeletingGuitar: React.Dispatch<React.SetStateAction<GuitarInCart | null>>;
}

function CartList({ guitars, setDeletingGuitar }: CartListProps): JSX.Element {
  let totalCount = 0;
  const cards = guitars.map((guitar) => {
    totalCount += guitar.guitar.price * guitar.count;
    return (
      <CartItem
        guitar={guitar}
        key={guitar.guitar.id}
        setDeletingGuitar={setDeletingGuitar}
      />);
  });
  return (
    <div className="cart">
      {cards}
      <div className="cart__footer">
        <div className="cart__coupon coupon">
          <h2 className="title title--little coupon__title">Промокод на скидку</h2>
          <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
          <form className="coupon__form" id="coupon-form" method="post" action="/">
            <div className="form-input coupon__input">
              <label className="visually-hidden">Промокод</label>
              <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
              <p className="form-input__message form-input__message--success">Промокод принят</p>
            </div>
            <button className="button button--big coupon__button">Применить</button>
          </form>
        </div>
        <div className="cart__total-info">
          <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalCount} ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
          <button className="button button--red button--big cart__order-button">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
