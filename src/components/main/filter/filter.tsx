import { ChangeEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGuitarTypes, setMaxPrice, setMinPrice, setStringsCounts } from '../../../store/actions';
import { selectGuitarTypes, selectMaxPrice, selectMaxPriceForPlaceholder, selectMinPrice, selectMinPriceForPlaceholder, selectStringsCounts } from '../../../store/selectors';

function Filter(): JSX.Element {
  const dispatch = useDispatch();
  const minPrice = useRef<HTMLInputElement>(null);
  const maxPrice = useRef<HTMLInputElement>(null);
  const minPriceFilter = useSelector(selectMinPrice);
  const maxPriceFilter = useSelector(selectMaxPrice);
  const placeholderMin = useSelector(selectMinPriceForPlaceholder);
  const placeholderMax = useSelector(selectMaxPriceForPlaceholder);
  const guitarTypes = useSelector(selectGuitarTypes);
  const stringsCounts = useSelector(selectStringsCounts);

  useEffect(() => {
    document.querySelectorAll('.catalog-filter__strings').forEach((stringsCount) => stringsCount.removeAttribute('disabled'));
    if (guitarTypes.includes('acoustic') && guitarTypes.length > 1) {
      document.querySelectorAll('.catalog-filter__strings').forEach((stringsCount) => stringsCount.removeAttribute('disabled'));
    } else if (guitarTypes.includes('acoustic')) {
      document.querySelector('[id="4-strings"]')?.setAttribute('disabled', 'true');
    } else if (guitarTypes.includes('electric')) {
      document.querySelector('[id="12-strings"]')?.setAttribute('disabled', 'true');
    } else if (guitarTypes.includes('ukulele')) {
      dispatch(setStringsCounts(['4']));
      document.querySelector('[id="6-strings"]')?.setAttribute('disabled', 'true');
      document.querySelector('[id="7-strings"]')?.setAttribute('disabled', 'true');
      document.querySelector('[id="12-strings"]')?.setAttribute('disabled', 'true');
    }
  }, [dispatch, guitarTypes]);

  const changeMinPriceHandler = () => {
    const number = /^([1-9]\d*)$/;
    if (minPrice.current?.value !== undefined && (minPrice.current?.value.match(number) || minPrice.current?.value === '')) {
      dispatch(setMinPrice(minPrice.current?.value));
    }
  };

  const blurMinPriceFieldHandler = () => {
    const min = Math.min(Math.max(Number(minPrice.current?.value), placeholderMin), placeholderMax).toString();
    dispatch(setMinPrice(min));
  };

  const changeMaxPriceHandler = () => {
    const number = /^([1-9]\d*)$/;
    if (maxPrice.current?.value !== undefined && (maxPrice.current?.value.match(number) || maxPrice.current?.value === '')) {
      dispatch(setMaxPrice(maxPrice.current?.value));
    }
  };

  const blurMaxPriceFieldHandler = () => {
    const max = Math.max(Math.min(Number(maxPrice.current?.value), placeholderMax), placeholderMin, Number(minPrice.current?.value)).toString();
    dispatch(setMaxPrice(max));
  };

  const changeGuitarTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (guitarTypes.includes(evt.target.name)) {
      const index = guitarTypes.findIndex((guitarType) => guitarType === evt.target.name);
      const newGuitarTypes = [...guitarTypes.slice(0, index), ...guitarTypes.slice(index + 1)];
      dispatch(setGuitarTypes(newGuitarTypes));
    } else {
      if (evt.target.name === 'electric') {
        const index = stringsCounts.findIndex((guitarType) => guitarType === '12');
        dispatch(setStringsCounts([...stringsCounts.slice(0, index), ...stringsCounts.slice(index + 1)]));
      } else if (evt.target.name === 'acoustic') {
        const index = stringsCounts.findIndex((guitarType) => guitarType === '4');
        dispatch(setStringsCounts([...stringsCounts.slice(0, index), ...stringsCounts.slice(index + 1)]));
      }
      dispatch(setGuitarTypes([...guitarTypes, evt.target.name]));
    }
  };

  const changeStringsCountsHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (stringsCounts.includes(evt.target.value)) {
      const index = stringsCounts.findIndex((stringsCount) => stringsCount === evt.target.value);
      const newStringsCounts = [...stringsCounts.slice(0, index), ...stringsCounts.slice(index + 1)];
      dispatch(setStringsCounts(newStringsCounts));
    } else {
      dispatch(setStringsCounts([...stringsCounts, evt.target.value]));
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number"
              min={0}
              placeholder={placeholderMin.toString()}
              id="priceMin"
              name="от"
              ref={minPrice}
              onChange={changeMinPriceHandler}
              onBlur={blurMinPriceFieldHandler}
              value={minPriceFilter}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              min={0}
              placeholder={placeholderMax.toString()}
              id="priceMax"
              name="до"
              ref={maxPrice}
              onChange={changeMaxPriceHandler}
              onBlur={blurMaxPriceFieldHandler}
              value={maxPriceFilter}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onChange={changeGuitarTypeHandler}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onChange={changeGuitarTypeHandler}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onChange={changeGuitarTypeHandler}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden catalog-filter__strings"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            value='4'
            onChange={changeStringsCountsHandler}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden catalog-filter__strings"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            value='6'
            onChange={changeStringsCountsHandler}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden catalog-filter__strings"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            value='7'
            onChange={changeStringsCountsHandler}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden catalog-filter__strings"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            value='12'
            onChange={changeStringsCountsHandler}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
