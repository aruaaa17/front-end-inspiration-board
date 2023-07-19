import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';
import './Board.css';

const Board = props => {
  return (
    <section className='board'>
      <section className='selected-board'>
        <h2 className='board-select'>Selected Board</h2>
        <section className='container1'>
          <p>
            <span className='deco'>Board Title:</span> {props.board.title}
          </p>
          <p>
            <span className='deco'>Board Owner:</span> {props.board.owner}
          </p>
        </section>
      </section>
      <section className='new-card-form'>
        <NewCardForm createNewCard={props.createNewCard} />
      </section>
        <CardList
          cards={props.board.cards}
          boardTitle={props.board.title}
          updateLikes={props.updateLikes}
          deleteCard={props.deleteCard}
        ></CardList>


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

export default Board;
