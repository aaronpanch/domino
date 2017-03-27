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
    const numPlayers = 2;
    const gameState = newGame(numPlayers);

    it('should generate a game object', () =>
      expect(gameState).to.be.an('object')
    );

    it('should have hands for each player', () => {
      expect(gameState.hands).to.have.lengthOf(numPlayers);
      gameState.hands.forEach(hand =>
        expect(hand).to.have.lengthOf(7)
      );
    });

    it('should set up scores initially as zero', () => {
      expect(gameState.scores).to.have.lengthOf(numPlayers);
      gameState.scores.forEach(score =>
        expect(score).to.equal(0)
      );
    });

    it('should set up a blank game board', () => {
      expect(gameState.bones).to.have.lengthOf(28 - 7 * numPlayers);
      expect(gameState.board.tiles).to.deep.equal([]);
      expect(gameState.board.spinner).to.equal(null);
      expect(gameState.board.leaves).to.equal(null);
    });

    it('should start the first player as dealer', () =>
      expect(gameState.dealer).to.equal(0)
    );

    it('should set the next player with the current turn', () =>
      expect(gameState.currentPlayer).to.equal(1)
    );

    it('should save the tileset', () =>
      expect(gameState).to.have.property('tileset')
    );
  });

  describe('newRound', () => {
    const { newRound } = game;
    const oldGame = {
      hands: 'junk',
      scores: [20, 40, 50],
      bones: 'junk',
      board: {
        tiles: 'junk',
        spinner: 'junk',
        leaves: 'junk'
      },
      dealer: 2,
      currentPlayer: 2,
      tileset: generateTiles()
    };

    const newGameRound = newRound(oldGame);

    it('should deal a new hand for each player', () => {
      expect(newGameRound.hands).to.have.lengthOf(3);
      newGameRound.hands.forEach(hand =>
        expect(hand).to.have.lengthOf(7)
      );
    });

    it('should preserve the score', () =>
      expect(newGameRound.scores).to.deep.equal([20, 40, 50])
    );

    it('should increment the dealer', () =>
      expect(newGameRound.dealer).to.equal(0)
    );

    it('should increment the player', () =>
      expect(newGameRound.currentPlayer).to.equal(1)
    );

    it('should set up a blank game board', () => {
      expect(newGameRound.bones).to.have.lengthOf(7);
      expect(newGameRound.board.tiles).to.deep.equal([]);
      expect(newGameRound.board.spinner).to.equal(null);
      expect(newGameRound.board.leaves).to.equal(null);
    });

    it('should leave the tileset untouched', () =>
      expect(newGameRound.tileset).to.deep.equal(oldGame.tileset)
    );
  });
});
