import {ChangeEvent, useEffect} from 'react';
import {setCurrentPage, setStringsCounts} from '../../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {selectGuitarTypes, selectStringsCounts} from '../../../../store/selectors';
import {SetQuery} from 'use-query-params';
import {Params} from '../../../../types/params';
import {getMinMaxPricePlaceholder} from '../../../../store/api-actions';

type StringsCountProps={
  setQueryParams: SetQuery<Params>,
}

function StringsCount ({setQueryParams}: StringsCountProps):JSX.Element {
  const dispatch = useDispatch();
  const guitarTypes = useSelector(selectGuitarTypes);
  const stringsCounts = useSelector(selectStringsCounts);

  useEffect(() => {
    setQueryParams({
      stringCount: stringsCounts ? stringsCounts : undefined,
    },'pushIn');
    dispatch(getMinMaxPricePlaceholder());
  }, [stringsCounts, setQueryParams, dispatch]);

  const changeStringsCountsHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (stringsCounts.includes(evt.target.value)) {
      const index = stringsCounts.findIndex((stringsCount) => stringsCount === evt.target.value);
      const newStringsCounts = [...stringsCounts.slice(0, index), ...stringsCounts.slice(index + 1)];
      dispatch(setStringsCounts(newStringsCounts));
    } else {
      dispatch(setStringsCounts([...stringsCounts, evt.target.value]));
    }
    dispatch(setCurrentPage(1));
  };

  return (
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
          checked={stringsCounts.includes('4')}
          disabled={!guitarTypes.includes('ukulele') && !guitarTypes.includes('electric') && guitarTypes.length > 0}
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
          disabled={!guitarTypes.includes('electric') && !guitarTypes.includes('acoustic') && guitarTypes.length > 0}
          checked={stringsCounts.includes('6')}
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
          disabled={!guitarTypes.includes('electric') && !guitarTypes.includes('acoustic') && guitarTypes.length > 0}
          checked={stringsCounts.includes('7')}
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
          disabled={!guitarTypes.includes('acoustic') && guitarTypes.length > 0}
          checked={stringsCounts.includes('12')}
        />
        <label htmlFor="12-strings">12</label>
      </div>
    </fieldset>
  );
}

export default StringsCount;
