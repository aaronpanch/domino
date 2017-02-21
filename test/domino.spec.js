const expect = require('chai').expect

const domino = require('../src/domino');

describe('domino', () => {
  describe('generateTiles', () => {
    const generateTiles = domino.generateTiles;

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
});
