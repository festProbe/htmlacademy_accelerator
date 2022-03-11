import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectDiscount } from '../../../store/selectors';
import { GuitarInCart } from '../../../types/data';
import CartItem from '../cart-item/cart-item';
import Promo from '../promo/promo';

type CartListProps = {
  guitars: GuitarInCart[];
  setDeletingGuitar: React.Dispatch<React.SetStateAction<GuitarInCart | null>>;
}

function CartList({ guitars, setDeletingGuitar }: CartListProps): JSX.Element {
  const discount = useSelector(selectDiscount);
  const discountRef = useRef(null);
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
        <Promo />
        <div className="cart__total-info">
          <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalCount.toLocaleString()} ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name" ref={discountRef}>Скидка:</span><span className={`cart__total-value ${discount !== 0 ? 'cart__total-value--bonus' : ''}`}>{discount !== 0 ? (- totalCount * discount / 100).toLocaleString() : discount} ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{discount !== 0 ? (totalCount * (1 - discount / 100)).toLocaleString() : totalCount.toLocaleString()} ₽</span></p>
          <button className="button button--red button--big cart__order-button">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
