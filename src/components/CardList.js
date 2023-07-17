import './CardList.css';
import PropTypes from 'prop-types';
import Card from './Card';

const CardList = props => {
  return (
    <section className='card-list'>
      <h2>Cards For {props.boardTitle}</h2>
      <ul>
        {props.cards.map(card => (
          <li key={card.cardId}>
            <Card
              message={card.message}
              likesCount={card.likesCount}
              cardId={card.cardId}
              boardId={card.boardId}
              updateLikes={props.updateLikes}
              deleteCard={props.deleteCard}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number,
      boardId: PropTypes.number.isRequired,
    })
  ).isRequired,
  boardTitle: PropTypes.string.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default CardList;
