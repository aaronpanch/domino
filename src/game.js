const shuffle = require('./shuffle');
const { double } = require('./domino');

const DEFAULT_HAND_SIZE = 7;

/*
  A Game is an object:
  {
    bones: Array<Domino>
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

module.exports = {
  dealTiles,
  validDeal
}
