import { useRef, useState } from 'react';
import { GuitarInCart } from '../../../types/data';
import CartItem from '../cart-item/cart-item';
import Promo from '../promo/promo';

type CartListProps = {
  guitars: GuitarInCart[];
  setDeletingGuitar: React.Dispatch<React.SetStateAction<GuitarInCart | null>>;
}

function CartList({ guitars, setDeletingGuitar }: CartListProps): JSX.Element {
  const [isDiscountUsed, setIsDiscountUsed] = useState(false);
  const discountRef = useRef(null);
  const WITHOUT_DISCOUNT = 0;
  const WITH_DISCOUNT = 3000;
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
        <Promo setIsDiscountUsed={setIsDiscountUsed}/>
        <div className="cart__total-info">
          <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalCount} ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name" ref={discountRef}>Скидка:</span><span className={`cart__total-value ${isDiscountUsed ? 'cart__total-value--bonus' : ''}`}>{isDiscountUsed ? - WITH_DISCOUNT : WITHOUT_DISCOUNT} ₽</span></p>
          <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{isDiscountUsed ? totalCount - WITH_DISCOUNT : totalCount} ₽</span></p>
          <button className="button button--red button--big cart__order-button">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
