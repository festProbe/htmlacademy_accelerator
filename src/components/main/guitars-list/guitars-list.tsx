import { GuitarType } from '../../../types/data';
import Card from '../card/card';

type GuitarListProps = {
  guitars: GuitarType[];
}

function GuitarsList({ guitars }: GuitarListProps): JSX.Element {

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
