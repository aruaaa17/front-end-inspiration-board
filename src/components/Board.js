import './Board.css';
import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = props => {
  return (
    <section className='board'>
      <section className='display-board-name'>
        <h2>Selected Board</h2>
        <p>
          Board owner:{props.board.owner}
          title:{props.board.title}
        </p>
      </section>
      {/* if true | else: <p>Select a Board from the Board List!</p> */}
      <section className='cards-container'>
        <CardList
          cards={props.board.cards}
          boardTitle={props.board.title}
          updateLikes={props.updateLikes}
          deleteCard={props.deleteCard}
        ></CardList>
        <NewCardForm createNewCard={props.createNewCard} />
      </section>
    </section>
  );
};

Board.propTypes = {
  boardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  listOfCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number,
      boardId: PropTypes.number.isRequired,
    })
  ).isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  createNewCard: PropTypes.func.isRequired,
  createNewBoard: PropTypes.func.isRequired,
};

export default Board;
