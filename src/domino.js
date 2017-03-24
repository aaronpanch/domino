/*
  A Domino is a pair (an Array)
  [Number, Number]

  e.g.
  [2, 4]
*/

const DOMINO_VALUES = [0, 1, 2, 3, 4, 5, 6];

function generateTiles(values = DOMINO_VALUES) {
  return values.map((l, i) => (
    values.slice(i).map(r => [l, r])
  )).reduce((t, c) => t.concat(c), []);
};

module.exports = { generateTiles };
