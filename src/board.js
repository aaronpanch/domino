/*
  A board is an object representing an arrangement of Domino tiles
  It mimics a two dimentional array (referenced X then Y).

    {
      [Number (X)]: {
        [Number (Y)]: Domino
      }
    }

    e.g.
    {
      -1: { 0: [2,6] },
       0: { -1: [3,6], 0: [6,6], 1: [6,5] },
       1: { 0: [6,4] }
    }
*/

const get = (board, x, y) =>
  board[x] && board[x][y]

module.exports = {
  get
}
