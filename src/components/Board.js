import './Board.css';
import PropTypes from 'prop-types';
import CardList from './components/CardList';
import NewCardForm from './NewCardForm';

const Board = props => {
  return (
    <section className='board'>
      <h2>Selected Board</h2>
      <p>
        Board owner:{props.owner}
        title:{props.title}
      </p>
      {/* if true | else: <p>Select a Board from the Board List!</p> */}
      <section className='cards-container'>
        <CardList
          listOfCards={props.listOfCards}
          boardTitle={props.title}
        ></CardList>
        <NewCardForm />
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
};

export default Board;
