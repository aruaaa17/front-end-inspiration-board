import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/Board';
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';

const INITIAL_BOARD = [
  {
    boardId: 1,
    owner: 'nerdjal',
    title: '1st Board',
    listOfCards: [
      {
        cardId: 1,
        message: 'HELLO',
        likesCount: 0,
        boardId: 1,
      },
      {
        cardId: 2,
        message: 'HELLO2',
        likesCount: 0,
        boardId: 1,
      },
      {
        cardId: 3,
        message: 'HELLO3',
        likesCount: 0,
        boardId: 1,
      },
    ],
  },
];

const App = () => {
  const [boardData, setBoardData] = useState(INITIAL_BOARD);

  return (
    <section className='App'>
      <header className='App-header'></header>
      <main>
        <h1 className='title'>Inspiration Board</h1>
        <section className='boards-container'>
          <BoardList className='boards-names' boardData={boardData} />
          <Board className='board' />
          <NewBoardForm className='new-board-form' />
        </section>
      </main>
      {/* <footer>Click <span class="footer__delete-btn">here</span> to delete all boards and cards!</footer> */}
    </section>
  );
};

export default App;
