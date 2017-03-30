/*
  A board is an object representing an arrangement of Domino tiles
  It consists of two parts:
    1) tiles: mimics a two dimentional array (referenced X then Y)
    2) spinner: a coordinate reference to the spinner

    {
      tiles: {
        [Number (X)]: {
          [Number (Y)]: Domino
        }
      }
      spinner: [Number, Number] | null
    }

    e.g.
    {
      tiles: {{
        -1: { 0: [2,6] },
         0: { -1: [3,6], 0: [6,6], 1: [6,5] },
         1: { 0: [6,4] }
      },
      spinner: [0,0]
    }
*/

const isBlank = ({ tiles }) =>
  Object.keys(tiles).length === 0;

const get = ({ tiles }, [x, y]) =>
  tiles[x] && tiles[x][y]

const canFourBranch = board => {
  const { spinner } = board;
  return (
    spinner &&
    get(board, [spinner[0] - 1, 0]) &&
    get(board, [spinner[0] + 1, 0])
  );
}

const validLocations = board => {
  if (isBlank(board)) { return [ [0,0] ] };

  const { tiles, spinner } = board;
  const xRange = Object.keys(tiles);
  let locations = [
    [Math.min(...xRange) - 1, 0],
    [Math.max(...xRange) + 1, 0]
  ];

  if (canFourBranch(board)) {
    const yRange = Object.keys(tiles[spinner[0]]);
    locations.push([spinner[0], Math.min(...yRange) - 1]);
    locations.push([spinner[0], Math.max(...yRange) + 1]);
  }

  return locations;
};

module.exports = {
  canFourBranch,
  get,
  isBlank,
  validLocations
}
