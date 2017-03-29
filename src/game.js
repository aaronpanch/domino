const shuffle = require('./shuffle');
const { generateTiles, isDouble } = require('./domino');

const DEFAULT_HAND_SIZE = 7;

/*
  A Game is an object:
  {
    hands: Array<Array<Domino>>,
    scores: Array<Number>,
    bones: Array<Domino>
    board: {
      pieces: Array<Domino>, // For the spinner, it's two-dimensional
      spinner: Number || null
    },
    dealer: Number,
    currentPlayer: Number,
    tileset: Array<Domino>
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

// isValidDeal: { bones: Array<Domino>, hands: Array<Array<Domino>> }
//   -> Boolean
// Determines if the given deal is valid (less than half the doubles)
const isValidDeal = ({ hands }) =>
  hands.some(hand => hand.filter(isDouble).length < hand.length / 2);

// newRound: Game -> Game
// Deals a new game clearing hands/board but keeps score
const newRound = game => {
  const numPlayers = game.scores.length;

  let deal;
  while(!(deal && isValidDeal(deal))) {
    deal = dealTiles(game.tileset, numPlayers);
  }

  return {
    hands: deal.hands,
    scores: game.scores.slice(),
    bones: deal.bones,
    board: {
      pieces: [],
      spinner: null
    },
    dealer: (game.dealer + 1) % numPlayers,
    currentPlayer: (game.dealer + 2) % numPlayers,
    tileset: game.tileset.slice()
  };
}

// newGame: Number -> Game
// Creates a new Game object representing a new game (zero score)
const newGame = numPlayers => {
  const tileset = generateTiles();

  return newRound({
    scores: Array(numPlayers).fill(0),
    dealer: -1,
    tileset
  });
}

module.exports = {
  dealTiles,
  newGame,
  newRound,
  isValidDeal
}
