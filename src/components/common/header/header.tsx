import {FocusEvent, useEffect, useRef, useState, ChangeEvent} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllGuitars } from '../../../store/selectors';
import { GuitarType } from '../../../types/data';
import { AppRoute } from '../../../utils/const';
import logo from '../../../img/svg/logo.svg';

function Header(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [filteredGuitars, setFilteredGuitars] = useState<GuitarType[] | null>(null);
  const searchValue = useRef(null);
  const guitars = useSelector(selectAllGuitars);

  useEffect(() => {
    setFilteredGuitars(guitars.filter((guitar) => guitar.name.toLowerCase().includes(searchText.toLowerCase())));
  }, [guitars, searchText]);


  const clickLinkHandler = () => {
    setSearchText('');
    document.querySelector('.form-search__select-list')?.classList.add('hidden');
  };

  const changeTextHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(evt.currentTarget.value);
  };

  const focusSearchHandler = () => {
    document.querySelector('.form-search__select-list')?.classList.remove('hidden');
  };

  const blurSearchHandler = (evt: FocusEvent<HTMLDivElement>) => {
    if (!evt.currentTarget.contains(evt.relatedTarget)){
      document.querySelector('.form-search__select-list')?.classList.add('hidden');
    }
  };

  return (
    <header className="header" id="header">
      <div className="container header__wrapper"><Link className="header__logo logo" to="/"><img className="logo__img" width="70" height="70" src={logo} alt="Логотип" /></Link>
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
        <div className="form-search"onFocus={focusSearchHandler} onBlur={blurSearchHandler}>
          <form className="form-search__form" >
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
              ref={searchValue.current}
              value={searchText}
              onChange={changeTextHandler}
            />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            {
              filteredGuitars?.length !== undefined && filteredGuitars?.length > 0
                ? filteredGuitars?.map((guitar) => (
                  <Link to={`${AppRoute.PRODUCT}/${guitar.id}`} key={guitar.id} onClick={clickLinkHandler}>
                    <li
                      className="form-search__select-item"
                      tabIndex={0}
                      key={guitar.id}
                    >
                      {guitar.name}
                    </li>
                  </Link>
                ))
                : <li className="form-search__select-item" tabIndex={0} key={0}>К сожалению у нас нет гитар с таким названием.</li>
            }
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
    </header >
  );
}

export default Header;
