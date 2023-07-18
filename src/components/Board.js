import './Board.css';
import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = props => {
  if (props.board.boardId === 0) {
    return <p>Select a Board from the Board List!</p>;
  }

  return (
    <section className='board'>
      <section className='display'>
        <section className='selected-board'>
          <h2>Selected Board</h2>
          <p>
            Board owner:{props.board.owner}
            title:{props.board.title}
          </p>
        </section>
        <section className='new-card-form'>
          <NewCardForm createNewCard={props.createNewCard} />
        </section>
      </section>
      <section className='cards-container'>
        <CardList
          cards={props.board.cards}
          boardTitle={props.board.title}
          updateLikes={props.updateLikes}
          deleteCard={props.deleteCard}
        ></CardList>
      </section>
    </section>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    boardId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        cardId: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        likesCount: PropTypes.number,
        boardId: PropTypes.number.isRequired,
      })
    ),
  }),
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  createNewCard: PropTypes.func.isRequired,
  createNewBoard: PropTypes.func.isRequired,
};

Board.defaultProps = {
  board: PropTypes.shape({}),
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  createNewCard: PropTypes.func.isRequired,
  createNewBoard: PropTypes.func.isRequired,
};

export default Board;
