import { GuitarType } from '../../../types/data';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { selectCommentsCount, selectGuitarsCount } from '../../../store/selectors';

type GuitarListProps = {
  guitars: GuitarType[];
  setAddingGuitarToCart: React.Dispatch<React.SetStateAction<GuitarType | null>>;
}

function GuitarsList({ guitars, setAddingGuitarToCart }: GuitarListProps): JSX.Element {
  const guitarCount = useSelector(selectGuitarsCount);
  const commentsCount = useSelector(selectCommentsCount);
  const cards = guitars.map((guitar) => {
    const length = commentsCount.filter((comment) => comment.id === guitar.id.toString())[0]?.count;
    return (
      <Card
        guitar={guitar}
        key={guitar.id}
        commentsCount={length}
        setAddingGuitarToCart={setAddingGuitarToCart}
      />
    );
  });


  if (guitarCount === 0) {
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
