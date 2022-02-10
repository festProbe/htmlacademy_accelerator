import GuitarTypes from './guitar-types/guitar-types';
import PriceRange from './price-range/price-range';
import StringsCount from './strings-count/strings-count';
import {SetQuery} from 'use-query-params';
import {Params} from '../../../types/params';

type FilterProps = {
  setQueryParams: SetQuery<Params>,
}

function Filter({setQueryParams}: FilterProps): JSX.Element {
  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <PriceRange setQueryParams={setQueryParams} />
      <GuitarTypes setQueryParams={setQueryParams} />
      <StringsCount setQueryParams={setQueryParams}/>
    </form>
  );
}

export default Filter;
