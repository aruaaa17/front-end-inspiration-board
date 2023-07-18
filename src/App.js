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
  const [currentBoard, setCurrentBoard] = useState({
    boardId: 0,
    title: 'empty',
    owner: 'empty',
    cards: [{ cardId: 0, message: 'empty', boardId: 0 }],
  });

  const loadBoardsRequest = () => {
    axios
      .get('https://inspo-board-api.onrender.com/boards')
      .then(response => {
        const boards = response.data.map(board => {
          const caseFixedCards = board.cards.map(card => {
            return {
              ...card,
              likesCount: card.likes_count,
              cardId: card.card_id,
            };
          });
          return { ...board, boardId: board.board_id, cards: caseFixedCards };
        });
        setBoardData(boards);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const boardPostRequest = boardToAdd => {
    axios
      .post(`https://inspo-board-api.onrender.com/boards`, {
        title: boardToAdd.title,
        owner: boardToAdd.owner,
      })
      .then(response => {
        setBoardData([...boardData, response.data]);
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
        const cards = [...currentBoard.cards, response.data];
        setCurrentBoard([...currentBoard, cards]);
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  const createNewCard = newCard => {
    cardPostRequest(newCard);
  };

  const createNewBoard = newBoard => {
    boardPostRequest(newBoard);
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

  const deleteAllBoardsRequest = boardIds => {
    axios
      .delete(`https://inspo-board-api.onrender.com/boards/${boardIds}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBoards = boardData => {
    const boardIds = boardData.map(board => {
      return board.boardId;
    });
    deleteAllBoardsRequest(boardIds);
    setBoardData([]);
  };

  const updateLikesRequest = cardToUpdate => {
    axios
      .patch(`https://inspo-board-api.onrender.com/${cardToUpdate.cardId}`, {
        likes_count: cardToUpdate.likesCount + 1,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateLikes = cardToUpdate => {
    const updatedCards = currentBoard.cards.map(card => {
      if (card.cardId === cardToUpdate.cardId) {
        updateLikesRequest(cardToUpdate);
      }
      return card;
    });
    setCurrentBoard({ ...currentBoard, cards: updatedCards });
  };

  useEffect(() => {
    loadBoardsRequest();
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
            <Board
              className='board'
              board={currentBoard}
              updateLikes={updateLikes}
              deleteCard={deleteCard}
              createNewCard={createNewCard}
              createNewBoard={createNewBoard}
            />
          </section>
        </section>
      </main>
      {/* <footer>Click <span className="footer__delete-btn">here</span> to delete all boards and cards!</footer> */}
    </section>
  );
};

export default App;
