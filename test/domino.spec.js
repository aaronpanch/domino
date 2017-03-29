const { expect } = require('chai');

const Domino = require('../src/domino');

describe('Domino', () => {
  describe('generateTiles', () => {
    const { generateTiles } = Domino;

    it('should generate a default tileset', () => {
      const tiles = generateTiles();

      expect(tiles).to.be.an('array');
      expect(tiles).to.have.lengthOf(28);
    });

    it('should generate custom tileset', () => {
      const tiles = generateTiles([1, 2, 3]);

      expect(tiles).to.eql([
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 2],
        [2, 3],
        [3, 3]
      ]);
    });
  });

  describe('isDouble', () => {
    const { isDouble } = Domino;

    it('should report if domino is a double', () => {
      expect(isDouble([1,3])).to.be.false;
      expect(isDouble([3,3])).to.be.true;
      expect(isDouble([0,0])).to.be.true;
    });
  });

  describe('isEqual', () => {
    const { isEqual } = Domino;

    it('should return true for same domino', () => {
      expect(isEqual([1,2], [1,2])).to.be.true;
      expect(isEqual([3,3], [3,3])).to.be.true;
      expect(isEqual([3,2], [2,3])).to.be.true;
    });

    it('should return false for different dominos', () => {
      expect(isEqual([3,3], [3,2])).to.be.false;
      expect(isEqual([0,3], [3,3])).to.be.false;
    });
  });
});
