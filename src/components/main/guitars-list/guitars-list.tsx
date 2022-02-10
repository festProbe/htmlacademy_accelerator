import { GuitarType } from '../../../types/data';
import Card from '../card/card';
import {useSelector} from 'react-redux';
import {selectGuitarsCount} from '../../../store/selectors';

type GuitarListProps = {
  guitars: GuitarType[];
}

function GuitarsList({ guitars }: GuitarListProps): JSX.Element {
  const guitarCount = useSelector(selectGuitarsCount);
  const cards = guitars.map((guitar) => (
    <Card
      guitar={guitar}
      key={guitar.id}
    />
  ));

  if (guitarCount === 0){
    return (
      <h1 className="page-content__title title title--bigger">
        К сожалению у нас нет гитар в таком ценовом диапазоне.
      </h1>);
  }

  return (
    <div className="cards catalog__cards">
      {cards}
    </div>
  );
}

export default GuitarsList;
