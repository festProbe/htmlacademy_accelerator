import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectGuitarsInCart } from '../../store/selectors';
import { GuitarInCart } from '../../types/data';
import { AppRoute } from '../../utils/const';
import MainLayout from '../common/main-layout/main-layout';
import CartList from './cart-list/cart-list';
import DeleteCartPopup from './delete-guitar-from-cart-popup/delete-guitar-from-cart-popup';
import EmptyCart from './empty-cart/empty-cart';

function Cart(): JSX.Element {
  const guitarsInCart = useSelector(selectGuitarsInCart);
  const [deletingGuitar, setDeletingGuitar] = useState<GuitarInCart | null>(null);
  return (
    <MainLayout>
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.MAIN}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.MAIN}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.CART}>Корзина</Link>
            </li>
          </ul>
          {guitarsInCart.length === 0 ? <EmptyCart /> : <CartList guitars={guitarsInCart} setDeletingGuitar={setDeletingGuitar} />}
        </div>
        {deletingGuitar === null ? '' : <DeleteCartPopup guitar={deletingGuitar} setDeletingGuitar={setDeletingGuitar} />}
      </main>
    </MainLayout>
  );
}

export default Cart;
