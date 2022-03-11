import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { setMaxPrice, setMinPrice } from '../../../../store/actions';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMaxPrice,
  selectMaxPriceForPlaceholder,
  selectMinPrice,
  selectMinPriceForPlaceholder
} from '../../../../store/selectors';
import { SetQuery } from 'use-query-params';
import { Params } from '../../../../types/params';

type PriceRangeProps = {
  setQueryParams: SetQuery<Params>,
}

function PriceRange({ setQueryParams }: PriceRangeProps): JSX.Element {
  const dispatch = useDispatch();
  const placeholderMin = useSelector(selectMinPriceForPlaceholder);
  const placeholderMax = useSelector(selectMaxPriceForPlaceholder);
  const minPriceFilter = useSelector(selectMinPrice);
  const maxPriceFilter = useSelector(selectMaxPrice);
  const [minPrice, setMinPriceText] = useState<string>(minPriceFilter);
  const [maxPrice, setMaxPriceText] = useState<string>(maxPriceFilter);
  const debounceOnChangeMinPrice = useDebouncedCallback((value: string) => {
    dispatch(setMinPrice(value));
  }, 500);
  const debounceOnChangeMaxPrice = useDebouncedCallback((value: string) => {
    dispatch(setMaxPrice(value));
  }, 500);

  useEffect(() => {
    setQueryParams({
      'price_gte': minPriceFilter ? minPriceFilter : undefined,
      'price_lte': maxPriceFilter ? maxPriceFilter : undefined,
    }, 'pushIn');
  }, [minPriceFilter, maxPriceFilter, setQueryParams]);

  const changeMinPriceHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const number = /^([1-9]\d*)$/;
    const value = evt.currentTarget.value;
    if (value !== undefined && value.match(number)) {
      setMinPriceText(value);
      Number(maxPrice) > 0
        ? debounceOnChangeMinPrice(Math.min(Math.max(placeholderMin, Number(value)), Number(maxPrice)).toString())
        : debounceOnChangeMinPrice(Math.max(placeholderMin, Number(value)).toString());
    } else if (value === '') {
      setMinPriceText(value);
      debounceOnChangeMinPrice(value);
    }
  };

  const blurMinPriceInputHandler = (evt: FocusEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    if (value !== '') {
      Number(maxPrice) > 0
        ? setMinPriceText(Math.min(Math.max(placeholderMin, Number(value)), Number(maxPrice)).toString())
        : setMinPriceText(Math.max(placeholderMin, Number(value)).toString());
    }
  };

  const changeMaxPriceHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const number = /^([1-9]\d*)$/;
    const value = evt.currentTarget.value;
    if (value !== undefined && value.match(number)) {
      setMaxPriceText(value);
      Number(minPrice) > 0
        ? debounceOnChangeMaxPrice(Math.max(Math.min(placeholderMax, Number(value)), Number(minPrice)).toString())
        : debounceOnChangeMaxPrice(Math.min(placeholderMax, Number(value)).toString());

    } else if (value === '') {
      setMaxPriceText(value);
      debounceOnChangeMaxPrice(value);
    }
  };

  const blurMaxPriceInputHandler = (evt: FocusEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    if (value !== '') {
      Number(minPrice) > 0
        ? setMaxPriceText(Math.max(Math.min(placeholderMax, Number(value)), Number(minPrice)).toString())
        : setMaxPriceText(Math.min(placeholderMax, Number(value)).toString());
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input type="number"
            min={0}
            placeholder={placeholderMin.toLocaleString()}
            id="priceMin"
            name="от"
            onChange={changeMinPriceHandler}
            onBlur={blurMinPriceInputHandler}
            value={minPrice}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            min={0}
            placeholder={placeholderMax.toLocaleString()}
            id="priceMax"
            name="до"
            onChange={changeMaxPriceHandler}
            onBlur={blurMaxPriceInputHandler}
            value={maxPrice}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default PriceRange;
