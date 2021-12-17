import { useSelector } from 'react-redux';
import { getGuitars } from '../../../store/selectors';
import Card from '../card/card';

function GuitarsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const cards = guitars.map((guitar) => (
    <Card
      guitar={guitar}
      key={guitar.id}
    />
  ));

  return (
    <div className="cards catalog__cards">
      {cards}
    </div>
  );
}

export default GuitarsList;
