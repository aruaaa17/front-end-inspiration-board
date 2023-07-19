import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from './api/apiRequests';
import Board from './components/Board';
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import './App.css';

const App = () => {
  const [boardData, setBoardData] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({});

  const loadBoardsRequest = () => {
    api.loadBoards()
    .then(boards => {
      setBoardData(boards);
    })
    .catch(error => {
      console.log('error', error);
    });
  };

  const createCurrentBoard = board => {
    const setBoards = () => {
      const loadCardsRequest = () => {
        api.loadCards(board, board.boardId)
        .then(board => {
          setCurrentBoard(board);
        })
        .catch(error => {
          console.log('error', error);
        });
      };
    loadCardsRequest();
    };
    setBoards();
  };

  const boardPostRequest = boardToAdd => {
    api.boardPost(boardToAdd)
    .then(response => {
      setBoardData([...boardData, response]);
    })
    .catch(error => {
      console.log('error', error);
    });
  };

  const cardPostRequest = cardToAdd => {
    api.cardPost(cardToAdd, currentBoard.boardId)
    .then(card => {
      currentBoard.cards.push(card);
      setCurrentBoard({ ...currentBoard });
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
    api.deleteCard(cardId)
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
    api.deleteAllBoards()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  };

  const deleteBoards = () => {
    deleteAllBoardsRequest();
    setBoardData([]);
    setCurrentBoard({});
  };

  const updateLikesRequest = cardToUpdate => {
    api.updateLikes(cardToUpdate)
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
      return <p className='notes'>Select a Board from the Board List!</p>;
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
      <footer className='footer'>
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
