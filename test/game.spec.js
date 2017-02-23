const expect = require('chai').expect

const game = require('../src/game');
const { generateTiles } = require('../src/domino');

describe('game', () => {
  describe('newGame', () => {
    const { newGame } = game;

    it('should validate number of players for default hand', () => {
      expect(() => newGame(Array(13), 2)).to.throw('Too many players!');
    });

    it('should validate number of players for custom hand', () => {
      expect(() => newGame(Array(5), 2, 3)).to.throw('Too many players!');
    });

    it('should distribute tiles to players', () => {
      const tileset = generateTiles();
      const gameState = newGame(tileset, 3);

      expect(gameState.bones).to.have.lengthOf(7);
      expect(gameState.players).to.have.lengthOf(3);

      gameState.players.forEach(player => {
        expect(player.tiles).to.have.lengthOf(7);
        expect(player.score).to.equal(0);
      });
    });

    it('should not have bones if full game', () => {
      const tileset = generateTiles();
      const gameState = newGame(tileset, 4);

      expect(gameState.bones).to.have.lengthOf(0);
      gameState.players.forEach(player => {
        expect(player.tiles).to.have.lengthOf(7);
        expect(player.score).to.equal(0);
      });
    });
  });
});
