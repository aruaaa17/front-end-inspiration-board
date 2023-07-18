import axios from "axios";

export const loadBoardsRequest = () => {
    return axios
      .get('https://inspo-board-api.onrender.com/boards')
      .then(response => {
        const boards = response.data.map(board => {
          board.boardId = board.board_id;
          delete board.board_id;
          return board;
        });
        return (boards);
      })
  };