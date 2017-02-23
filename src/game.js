const shuffle = require('./shuffle');

const DEFAULT_HAND_SIZE = 7;

/*
  A game is an object:
  {
    bones: Array<Domino>
  }
*/

function newGame(tileset, numPlayers, handSize = DEFAULT_HAND_SIZE) {
  if (tileset.length / numPlayers < handSize) {
    throw 'Too many players!';
  }

  const tiles = shuffle(tileset);

  const players = Array(numPlayers).fill(undefined).map((_, i) => {
    return {
      tiles: tiles.slice(handSize * i, handSize * i + handSize),
      score: 0
    };
  });

  return {
    bones: tiles.slice(numPlayers * handSize),
    players
  };
}

module.exports = {
  newGame
}
