import axios from "axios";

export const loadBoards = () => {
  return axios
    .get('https://inspo-board-api.onrender.com/boards')
    .then(response => {
      const boards = response.data.map(board => {
        board.boardId = board.board_id;
        delete board.board_id;
        return board;
      });
      return boards;
    });
  };

export const loadCards = (board, boardId)=> {
  return axios
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
    return board;
  });
};

export const boardPost = boardToAdd => {
  return axios
  .post(`https://inspo-board-api.onrender.com/boards`, {
    title: boardToAdd.title,
    owner: boardToAdd.owner,
  })
  .then(response => {
    response.data.boardId = response.data.board_id;
    delete response.data.board_id;
    return response.data;
  });
};

export const cardPost = (cardToAdd, currentBoardId) => {
  return axios
  .post(
    `https://inspo-board-api.onrender.com/boards/${currentBoardId}/cards`,
    {
      message: cardToAdd.message,
    }
  )
  .then(response => {
    console.log(response.data);
    const card = response.data;
    card.cardId = card.card_id;
    card.boardId = card.board_id;
    card.likesCount = card.likes_count;
    delete card.card_id;
    delete card.board_id;
    delete card.likes_count;
    return card;
  });
};

export const deleteCard = cardId => {
  return axios
  .delete(`https://inspo-board-api.onrender.com/cards/${cardId}`)
  .then(response => 
    response);
};

export const deleteAllBoards = () => {
  return axios
  .delete(`https://inspo-board-api.onrender.com/boards`)
  .then(response => 
    response);
};

export const updateLikes = cardToUpdate => {
  return axios
  .patch(
    `https://inspo-board-api.onrender.com/cards/${cardToUpdate.cardId}`,
    {
      likes_count: cardToUpdate.likesCount,
    }
  )
  .then(response => 
    response);
};