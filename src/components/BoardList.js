import React from 'react';
import PropTypes from 'prop-types';
import './BoardList.css';

const BoardList = props => {
  const getBoardsNames = boards => {
    return boards.map(board => <li>{board.title}</li>);
  };
  return (
    <section>
      <h2>Boards</h2>
      <ul>className='boards-list'{getBoardsNames(props.boardData)}</ul>
    </section>
  );
};

BoardList.propTypes = {
  boardData: PropTypes.arrayOf(
    PropTypes.shape({
      boardId: PropTypes.number,
      owner: PropTypes.string,
      title: PropTypes.string.isRequired,
      listOfCards: PropTypes.array,
    })
  ).isRequired,
};

export default BoardList;
