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
    cards: [
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
  const [boardData, setBoardData] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});

  const loadBoards = () => {
    axios
      .get('https://inspo-board-api.onrender.com/boards')
      .then(response => {
        const boards = response.data.map(board => {
          return { ...board };
        });
        setBoardData(boards);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const cardPostRequest = cardToAdd => {
    axios
      .post(
        `https://inspo-board-api.onrender.com/${currentBoard.boardId}/cards`,
        {
          message: cardToAdd.message,
        }
      )
      .then(response => {
        console.log(response.data);
        axios
          .get(
            `https://inspo-board-api.onrender.com/boards/${response.data.cards.cardId}`
          )
          .then(response => {
            console.log(response.data.card);
            // setCurrentBoard([...currentBoard, response.data.card]);
          })
          .catch(error => {
            console.log('error', error);
          });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  const deleteCardRequest = cardId => {
    axios
      .delete(`https://inspo-board-api.onrender.com/cards/${cardId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteCard = cardToDelete => {
    const newCardList = currentBoard.cards.filter(
      card => card.carIid !== cardToDelete.cardId
    );
    deleteCardRequest(cardToDelete.cardId);
    setCurrentBoard({ ...currentBoard, cards: newCardList });
  };

  const updateLikes = cardToUpdate => {};

  const createNewBoard = newBoard => {};

  const createNewCard = newCard => {};

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <section className='App'>
      <header className='App-header'>
        <h1 className='title'>Inspiration Board</h1>
      </header>
      <main className='App-main'>
        <section className='boards-container'>
          <section className='two-col'>
            <BoardList className='boards-names' boardData={boardData} />
            <NewBoardForm className='new-board-form' />
          </section>
          <section className='grid'>
            <Board className='board' board={currentBoard} />
          </section>
        </section>
      </main>
      {/* <footer>Click <span class="footer__delete-btn">here</span> to delete all boards and cards!</footer> */}
    </section>
  );
};

export default App;
