const expect = require('chai').expect

const game = require('../src/game');
const { generateTiles } = require('../src/domino');

describe('game', () => {
  describe('dealTiles', () => {
    const { dealTiles } = game;

    it('should validate number of players for default hand', () => {
      expect(() => dealTiles(Array(13), 2)).to.throw('Too many players!');
    });

    it('should validate number of players for custom hand', () => {
      expect(() => dealTiles(Array(5), 2, 3)).to.throw('Too many players!');
    });

    it('should distribute tiles to players', () => {
      const tileset = generateTiles();
      const distribution = dealTiles(tileset, 3);

      expect(distribution.bones).to.have.lengthOf(7);
      expect(distribution.hands).to.have.lengthOf(3);

      distribution.hands.forEach(hand => {
        expect(hand).to.have.lengthOf(7);
      });
    });

    it('should not have bones if full game', () => {
      const tileset = generateTiles();
      const distribution = dealTiles(tileset, 4);

      expect(distribution.bones).to.have.lengthOf(0);
      distribution.hands.forEach(hand => {
        expect(hand).to.have.lengthOf(7);
      });
    });
  });
});
