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

  describe('validDeal', () => {
    const { validDeal } = game;

    it('should pass if all hands have fewer than half of the doubles', () => {
      const hands = [
        [
          [1,1],
          [2,2],
          [3,3],
          [3,4],
          [5,6],
          [1,2],
          [2,3]
        ]
      ];

      expect(validDeal({ hands })).to.be.true;
    });

    it('should fail if hand has more than half the doubles', () => {
      const hands = [
        [
          [1,1],
          [2,2],
          [3,3],
          [3,4],
          [5,6],
          [1,2],
          [6,6]
        ]
      ];

      expect(validDeal({ hands })).to.be.false;
    });
  });

  describe('newGame', () => {
    const { newGame } = game;

    it('should generate a game object', () => {
      const numPlayers = 2;
      const gameState = newGame(numPlayers);

      // Players
      expect(gameState.hands).to.have.lengthOf(numPlayers);
      expect(gameState.scores).to.have.lengthOf(numPlayers);
      gameState.hands.forEach(hand =>
        expect(hand).to.have.lengthOf(7)
      );
      gameState.scores.forEach(score =>
        expect(score).to.equal(0)
      );

      // Board
      expect(gameState.bones).to.have.lengthOf(28 - 7 * numPlayers);
      expect(gameState.board.tiles).to.deep.equal([]);
      expect(gameState.board.spinner).to.equal(null);
      expect(gameState.board.leaves).to.equal(null);

      // Game Progress
      expect(gameState.dealer).to.equal(0);
      expect(gameState.currentPlayer).to.equal(1);
    });
  });
});
