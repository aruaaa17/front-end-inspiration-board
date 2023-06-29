import './CardList.css';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = props => {
  const listOfCards = props.listOfCards;

  return (
    <section className='CardList'>
      <h2>Card List</h2>
      <ul>
        {listOfCards.map(card => (
          <li key={card.cardId}>
            <Card
              message={card.message}
              likesCount={card.likesCount}
              cardId={card.cardId}
              boardId={card.boardId}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

CardList.propTypes = {
  listOfCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number,
      boardId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CardList;
