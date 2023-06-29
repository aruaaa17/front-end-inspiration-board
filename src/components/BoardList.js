import React from 'react';
import './BoardList.css';

const BoardList = props => {
  const getBoardsNames = boards => {
    return boards.map(board => <li>{board.title}</li>);
  };
  return (
    <section>
      <ul>{getBoardsNames(props.boardData)}</ul>
    </section>
  );
};

export default BoardList;
