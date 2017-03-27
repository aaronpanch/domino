/*
  A Domino is a pair (an Array)
  [Number, Number]

  e.g.
  [2, 4]
*/

const DOMINO_VALUES = [0, 1, 2, 3, 4, 5, 6];

// generateTiles: Array<Number> -> Array<Domino>
// Generates a tileset of all the combination of values
const generateTiles = (values = DOMINO_VALUES) =>
  values.map((l, i) => (
    values.slice(i).map(r => [l, r])
  )).reduce((t, c) => t.concat(c), []);

// double: Domino -> Boolean
// Determines if the Domino is a double
const double = ([l, r]) => l === r;

const equal = (d1, d2) =>
  (d1[0] === d2[0] && d1[1] === d2[1]) ||
  (d1[1] === d2[0] && d1[0] === d2[1])

module.exports = { double, equal, generateTiles };
