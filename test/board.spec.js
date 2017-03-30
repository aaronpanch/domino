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

  const unSpun = {
    tiles: {
      '-1': { 0: [2, 6] },
         0: { 0: [6, 6] }
    },
    spinner: [0,0]
  }

  const twoDim = {
    tiles: {
      '-1': { 0: [2, 6] },
         0: { 0: [6, 6] },
         1: { 0: [6, 5] }
    },
    spinner: [0,0]
  }

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

  describe('canFourBranch', () => {
    it('should determine if spinner can branch 4 ways', () => {
      expect(Board.canFourBranch(unSpun)).to.be.falsy;
      expect(Board.canFourBranch(blankBoard)).to.be.falsy;
      expect(Board.canFourBranch(twoDim)).to.be.truthy;
      expect(Board.canFourBranch(centerSpinnerBoard)).to.be.truthy;
      expect(Board.canFourBranch(noSpinnerBoard)).to.be.falsy;
      expect(Board.canFourBranch(offsetSpinnerBoard)).to.be.truthy;
    });
  });

  describe('validLocations', () => {
    it('should return the coordinates of the valid locations with center spinner', () => {
      expect(Board.validLocations(centerSpinnerBoard)).to.deep.equal([
        [-2,0],
        [2,0],
        [0,-2],
        [0,2]
      ]);
    });

    it('should return the coordinates of valid locations when no spinner', () => {
      expect(Board.validLocations(noSpinnerBoard)).to.deep.equal([
        [-2,0],
        [2,0]
      ]);
    });

    it('should return the coordinates of valid locations when offset spinner', () => {
      expect(Board.validLocations(offsetSpinnerBoard)).to.deep.equal([
        [-2,0],
        [3,0],
        [1,-2],
        [1,2]
      ]);
    });

    it('should return [0,0] for blankBoard', () => {
      expect(Board.validLocations(blankBoard)).to.deep.equal([ [0,0] ]);
    });

    it('should return the coordinates of valid locations when unSpun board', () => {
      expect(Board.validLocations(unSpun)).to.deep.equal([
        [-2,0],
        [1,0]
      ]);
    });

    it('should return the coordinates of valid locations when twoDim board', () => {
      expect(Board.validLocations(twoDim)).to.deep.equal([
        [-2,0],
        [2,0],
        [0,-1],
        [0,1]
      ]);
    });
  });
});
