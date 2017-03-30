const { expect } = require('chai');

const Board = require('../src/board');

describe('Board', () => {
  const centerSpinnerBoard = {
    tiles: {
      '-1': { 0: [2,6] },
         0: {
          '-1': [3,6],
             0: [6,6],
             1: [6,5]
         },
         1: { 0: [6,4] }
    },
    spinner: [0,0]
  };

  const noSpinnerBoard = {
    tiles: {
      '-1': { 0: [2,6] },
         0: { 0: [6,4] },
         1: { 0: [4,2] }
    },
    spinner: null
  };

  const offsetSpinnerBoard = {
    tiles: {
      '-1': { 0: [2,6] },
         0: { 0: [6,5] },
         1: {
          '-1': [0,5],
             0: [5,5],
             1: [5,2]
         },
         2: { 0: [5,4] }
    },
    spinner: [1,0]
  };

  const blankBoard = {
    tiles: {},
    spinner: null
  };

  describe('get', () => {
    it('should get the domino at the given coordinates', () => {
      expect(Board.get(centerSpinnerBoard, [0,0])).to.deep.equal([6,6]);
      expect(Board.get(centerSpinnerBoard, [-1,0])).to.deep.equal([2,6]);
      expect(Board.get(centerSpinnerBoard, [0,1])).to.deep.equal([6,5]);
    });

    it('should return undefined for when there is no domino', () => {
      expect(Board.get(centerSpinnerBoard, [-1,1])).to.be.undefined;
      expect(Board.get(centerSpinnerBoard, [2,0])).to.be.undefined;
      expect(Board.get(centerSpinnerBoard, [0,2])).to.be.undefined;
    });
  });

  describe('leaves', () => {
    it('should return the coordinates of the leaves with center spinner', () => {
      expect(Board.leaves(centerSpinnerBoard)).to.deep.equal([
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
      ]);
    });

    it('should return the coordinates of leaves when no spinner', () => {
      expect(Board.leaves(noSpinnerBoard)).to.deep.equal([
        [-1,0],
        [1,0]
      ]);
    });

    it('should return the coordinates of leaves when offset spinner', () => {
      expect(Board.leaves(offsetSpinnerBoard)).to.deep.equal([
        [-1,0],
        [2,0],
        [1,-1],
        [1,1]
      ]);
    });

    it('should return empty for blankBoard', () => {
      expect(Board.leaves(blankBoard)).to.deep.equal({});
    });
  });
});
