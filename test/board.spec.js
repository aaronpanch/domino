const { expect } = require('chai');

const Board = require('../src/board');

describe('Board', () => {
  const testBoard = {
    '-1': { 0: [2,6] },
       0: {
        '-1': [3,6],
           0: [6,6],
           1: [6,5]
       },
       1: { 0: [6,4] }
  }

  describe('get', () => {
    it('should get the domino at the given coordinates', () => {
      expect(Board.get(testBoard, 0, 0)).to.deep.equal([6,6]);
      expect(Board.get(testBoard, -1, 0)).to.deep.equal([2,6]);
      expect(Board.get(testBoard, 0, 1)).to.deep.equal([6,5]);
    });

    it('should return undefined for when there is no domino', () => {
      expect(Board.get(testBoard, -1, 1)).to.be.undefined;
      expect(Board.get(testBoard, 2, 0)).to.be.undefined;
      expect(Board.get(testBoard, 0, 2)).to.be.undefined;
    });
  });
});
