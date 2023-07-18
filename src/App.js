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

  const loadBoardsRequest = () => {
    axios
      .get('https://inspo-board-api.onrender.com/boards')
      .then(response => {
        const boards = response.data.map(board => {
          board.boardId = board.board_id;
          delete board.board_id;
          return board;
        });
        setBoardData(boards);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const createCurrentBoard = board => {
    const setBoards = boardId => {
      axios
        .get(`https://inspo-board-api.onrender.com/boards/${boardId}/cards`)
        .then(response => {
          if (response.data === undefined) {
            board.cards = [];
          }
          const cards = response.data.cards.map(card => {
            card.cardId = card.card_id;
            card.boardId = card.board_id;
            card.likesCount = card.likes_count;
            delete card.card_id;
            delete card.board_id;
            delete card.likes_count;
            return card;
          });
          board.cards = cards;
          setCurrentBoard(board);
        })
        .catch(error => {
          console.log('error', error);
        });
    };
    setBoards(board.boardId);
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
    console.log('card to add', cardToAdd.message);
    axios
      .post(
        `https://inspo-board-api.onrender.com/boards/${currentBoard.boardId}/cards`,
        {
          message: cardToAdd.message,
        }
      )
      .then(response => {
        const cards = [...currentBoard.cards, response.data];
        setCurrentBoard({ ...currentBoard, cards });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  const createNewCard = newCard => {
    cardPostRequest(newCard);
    const newCards = currentBoard.cards.add(newCard);
    setCurrentBoard({...currentBoard, newCards});
  };

  const createNewBoard = newBoard => {
    boardPostRequest(newBoard);
    setBoardData(newBoard);
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
      card => card.cardId !== cardToDelete.cardId
    );
    deleteCardRequest(cardToDelete.cardId);
    setCurrentBoard({ ...currentBoard, cards: newCardList });
  };

  const deleteAllBoardsRequest = () => {
    axios
      .delete(`https://inspo-board-api.onrender.com/boards`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBoards = boardData => {
    deleteAllBoardsRequest();
    setBoardData([]);
  };

  const updateLikesRequest = cardToUpdate => {
    axios
      .patch(
        `https://inspo-board-api.onrender.com/cards/${cardToUpdate.cardId}`,
        {
          likes_count: cardToUpdate.likesCount,
        }
      )
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
        card.likesCount = cardToUpdate.likesCount;
      }
      return card;
    });
    setCurrentBoard({ ...currentBoard, cards: updatedCards });
  };

  useEffect(() => {
    loadBoardsRequest();
  }, []);

  const boardComponent = () => {
    if (Object.keys(currentBoard).length === 0 || !currentBoard) {
      return <p>Select a Board from the Board List!</p>;
    }
    return (
      <Board
        className='board'
        board={currentBoard}
        updateLikes={updateLikes}
        deleteCard={deleteCard}
        createNewCard={createNewCard}
        createNewBoard={createNewBoard}
      />
    );
  };

  return (
    <section className='App'>
      <header className='App-header'>
        <h1 className='title'>Inspiration Board</h1>
      </header>
      <main className='App-main'>
        <section className='boards-container'>
          <section className='two-col'>
            <BoardList
              className='boards-names'
              boardData={boardData}
              createCurrentBoard={createCurrentBoard}
            />
            <NewBoardForm
              className='new-board-form'
              createNewBoard={createNewBoard}
            />
          </section>
          <section className='grid'>{boardComponent()}</section>
        </section>
      </main>
      <footer>
        Click{' '}
        <span
          className='footer__delete-btn'
          onClick={() => deleteBoards(boardData)}
        >
          here
        </span>{' '}
        to delete all boards and cards!
      </footer>
    </section>
  );
};

export default App;
