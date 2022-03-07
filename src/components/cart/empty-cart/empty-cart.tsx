function EmptyCart(): JSX.Element {
  return (
    <>
      <h2 className="title title--little coupon__title">Вы ничего не добавили в корзину, а мы не решились положить сюда что-то за вас.</h2>
      <p className="coupon__info">Сначала добавьте товар</p>
    </>
  );
}

export default EmptyCart;
