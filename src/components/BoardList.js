import React from 'react';
import PropTypes from 'prop-types';
import './BoardList.css';

const BoardList = props => {
  const getBoardsNames = boards => {
    return boards.map(board => (
      <li key={board.boardId} onClick={() => props.createCurrentBoard(board)}>
        {board.title}
      </li>
    ));
  };
  return (
    <section>
      <h2>Boards</h2>
      <ul className='boards-list'>{getBoardsNames(props.boardData)}</ul>
    </section>
  );
};

BoardList.propTypes = {
  boardData: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number,
      owner: PropTypes.string,
      title: PropTypes.string.isRequired,
      cards: PropTypes.array,
    })
  ).isRequired,
  createCurrentBoard: PropTypes.func.isRequired,
};

export default BoardList;
