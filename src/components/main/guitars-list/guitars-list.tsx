import {GuitarType} from '../../../types/data';
import Card from '../card/card';
import {useSelector} from 'react-redux';
import {selectComments, selectGuitarsCount} from '../../../store/selectors';

type GuitarListProps = {
  guitars: GuitarType[];
}

function GuitarsList({guitars}: GuitarListProps): JSX.Element {
  const guitarCount = useSelector(selectGuitarsCount);
  const comments = useSelector(selectComments);
  const cards = guitars.map((guitar) => {
    const length = comments.filter((comment) => comment.id === guitar.id.toString())[0]?.comments.length;
    return (
      <Card
        guitar={guitar}
        key={guitar.id}
        commentsCount={length}
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
