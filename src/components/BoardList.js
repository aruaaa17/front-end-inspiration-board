import React from 'react';
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

export default BoardList;
