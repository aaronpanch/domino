const expect = require('chai').expect

const domino = require('../src/domino');

describe('domino', () => {
  describe('generateTiles', () => {
    const { generateTiles } = domino;

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

  describe('double', () => {
    const { double } = domino;

    it('should report if domino is a double', () => {
      expect(double([1,3])).to.be.false;
      expect(double([3,3])).to.be.true;
      expect(double([0,0])).to.be.true;
    });
  });
});
