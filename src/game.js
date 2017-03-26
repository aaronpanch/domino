const shuffle = require('./shuffle');
const { generateTiles, double } = require('./domino');

const DEFAULT_HAND_SIZE = 7;

/*
  A Game is an object:
  {
    hands: Array<Array<Domino>>,
    scores: Array<Number>,
    bones: Array<Domino>
    board: {
      tiles: Array<Position>,
      spinner: Number || null,
      leaves: Array<Number> || null
    },
    dealer: Number,
    currentPlayer: Number
  }
*/

// dealTiles: Array<Domino>, Number, (Number)
//   -> { bones: Array<Domino>, hands: Array<Array<Domino>> }
// Distributes the tileset for the number of players with the default hand size
function dealTiles(tileset, numPlayers, handSize = DEFAULT_HAND_SIZE) {
  if (tileset.length / numPlayers < handSize) {
    throw 'Too many players!';
  }

  const tiles = shuffle(tileset);

  const hands = Array(numPlayers).fill(undefined).map((_, i) =>
    tiles.slice(handSize * i, handSize * i + handSize)
  );

  return {
    bones: tiles.slice(numPlayers * handSize),
    hands
  };
}

// validDeal: { bones: Array<Domino>, hands: Array<Array<Domino>> }
//   -> Boolean
// Determines if the given deal is valid (less than half the doubles)
const validDeal = ({ hands }) =>
  hands.some(hand => hand.filter(double).length < hand.length / 2);

// newGame: Number -> Game
// Creates a new Game object representing a new game (zero score)
const newGame = numPlayers => {
  let tileset = generateTiles();
  let deal = dealTiles(tileset, numPlayers);

  while(!validDeal(deal)) {
    deal = dealTiles(tileset, numPlayers);
  }

  return {
    hands: deal.hands,
    scores: Array(numPlayers).fill(0),
    bones: deal.bones,
    board: {
      tiles: [],
      spinner: null,
      leaves: null
    },
    dealer: 0,
    currentPlayer: 1
  };
}

module.exports = {
  dealTiles,
  newGame,
  validDeal
}
