import {ChangeEvent, useEffect} from 'react';
import { setCurrentPage, setGuitarTypes, setStringsCounts } from '../../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectGuitarTypes, selectStringsCounts } from '../../../../store/selectors';
import {SetQuery} from 'use-query-params';
import {Params} from '../../../../types/params';
import {getMinMaxPricePlaceholder} from '../../../../store/api-actions';

type GuitarTypesProps={
  setQueryParams: SetQuery<Params>,
}

function GuitarTypes({setQueryParams}: GuitarTypesProps): JSX.Element {
  const dispatch = useDispatch();
  const guitarTypes = useSelector(selectGuitarTypes);
  const stringsCounts = useSelector(selectStringsCounts);

  useEffect(() => {
    setQueryParams({
      type: guitarTypes ? guitarTypes : undefined,
    },'pushIn');
    dispatch(getMinMaxPricePlaceholder());
  }, [guitarTypes, setQueryParams, dispatch]);

  const changeGuitarTypeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    let newGuitarTypes: (string | null)[];
    if (guitarTypes.includes(evt.target.name)) {
      const index = guitarTypes.findIndex((guitarType) => guitarType === evt.target.name);
      newGuitarTypes = [...guitarTypes.slice(0, index), ...guitarTypes.slice(index + 1)];
      dispatch(setGuitarTypes(newGuitarTypes));
    } else {
      newGuitarTypes = [...guitarTypes, evt.target.name];
      dispatch(setGuitarTypes(newGuitarTypes));
    }
    if (newGuitarTypes.length === 1) {
      switch (newGuitarTypes[0]) {
        case 'acoustic':
          if (stringsCounts.includes('4')) {
            const stringIndex = stringsCounts.findIndex((stringsCount) => stringsCount === '4');
            const newStringsCounts = [...stringsCounts.slice(0, stringIndex), ...stringsCounts.slice(stringIndex + 1)];
            dispatch(setStringsCounts(newStringsCounts));
          }
          break;
        case 'ukulele':
          if (stringsCounts.includes('4')) {
            dispatch(setStringsCounts(['4']));
          }
          else {
            dispatch(setStringsCounts([]));
          }
      }
    }
    if ((newGuitarTypes.includes('electric') && newGuitarTypes.includes('ukulele')) || (newGuitarTypes.length === 1 && newGuitarTypes.includes('electric'))) {
      if (stringsCounts.includes('12')) {
        const stringIndex = stringsCounts.findIndex((stringsCount) => stringsCount === '12');
        const newStringsCounts = [...stringsCounts.slice(0, stringIndex), ...stringsCounts.slice(stringIndex + 1)];
        dispatch(setStringsCounts(newStringsCounts));
      }
    }
    dispatch(setCurrentPage(1));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Тип гитар</legend>
      <div className="form-checkbox catalog-filter__block-item">
        <input
          className="visually-hidden"
          type="checkbox"
          id="acoustic"
          name="acoustic"
          checked={guitarTypes.includes('acoustic')}
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
          checked={guitarTypes.includes('electric')}
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
          checked={guitarTypes.includes('ukulele')}
          onChange={changeGuitarTypeHandler}
        />
        <label htmlFor="ukulele">Укулеле</label>
      </div>
    </fieldset>
  );
}

export default GuitarTypes;
