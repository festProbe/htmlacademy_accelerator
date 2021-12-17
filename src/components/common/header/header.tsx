import { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGuitars } from '../../../store/selectors';
import { AppRoute } from '../../../utils/const';

function Header(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const searchValue = useRef(null);
  const guitars = useSelector(getGuitars);
  const guitarsNames = guitars.map((guitar) => guitar.name).slice(0, 4);
  const searchSelectList = guitarsNames.map((guitarName) => (
    <li className="form-search__select-item" tabIndex={0} key={guitarName}>{guitarName}</li>
  ));
  const changeTextHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(evt.target.value);
    if (searchText !== '') {
      document.querySelector('.form-search__select-list')?.classList.remove('hidden');
    }
  };
  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><Link className="header__logo logo" to="/"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" /></Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link className="link main-nav__link" to="/">Каталог</Link>
            </li>
            <li><Link className="link main-nav__link" to="/">Где купить?</Link>
            </li>
            <li><Link className="link main-nav__link" to="/">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form">
            <button className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg><span className="visually-hidden">Начать поиск</span>
            </button>
            <input
              className="form-search__input"
              id="search" type="text"
              autoComplete="off"
              placeholder="что вы ищите?"
              ref={searchValue}
              value={searchText}
              onChange={changeTextHandler}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            {searchSelectList}
          </ul>
        </div>
        <Link className="header__cart-link" to={AppRoute.CART} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
