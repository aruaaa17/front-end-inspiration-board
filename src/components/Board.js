import './Board.css';
import PropTypes from 'prop-types';
import CardList from './components/CardList';

const Board = props => {
  return (
    <section className='Board'>
      <p>
        Board owner:{props.owner}
        title:{props.title}
      </p>
      <CardList listOfCards={props.listOfCards}></CardList>
    </section>
  );
};

Board.propTypes = {
  boardId: PropTypes.number,
  title: PropTypes.string,
  owner: PropTypes.string,
  listOfCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string,
      likesCount: PropTypes.number,
      boardId: PropTypes.number,
    })
  ),
};

export default Board;
