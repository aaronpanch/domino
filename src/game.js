const shuffle = require('./shuffle');

const DEFAULT_HAND_SIZE = 7;

/*
  A Game is an object:
  {
    bones: Array<Domino>
  }
*/

// dealTiles: Array<Domino>, Number, (Number)
//   -> { bones: Array<Domino>, hands: Array<Array<Domino>> }
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

module.exports = {
  dealTiles
}
