import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/Board'
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const INITIAL_BOARD = [ 
  {
    boardId:1,
    owner: "nerdjal",
    title: "1st Board",  
    listOfCards: [{
      cardId: 1,
      message: "HELLO",
      likesCount: 0,
      boardId:1
    },
    {
      cardId: 2,
      message: "HELLO2",
      likesCount: 0,
      boardId: 1
    },
    {
      cardId: 3,
      message: "HELLO3",
      likesCount: 0,
      boardId: 1
    }]
  }
]

const App = () => {
  return (
    <section className="App">
      <header className="App-header"></header>
      <main>
        <h1>Inspiration Board</h1>
        <Board Board= {INITIAL_BOARD}><Board>
        <NewBoardForm></NewBoardForm>
        <NewCardForm></NewCardForm>
      </main>
    </section>
  );
};

export default App;
