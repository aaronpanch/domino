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

const get = ({ tiles }, [x, y]) =>
  tiles[x] && tiles[x][y]

const leaves = ({ tiles, spinner }) => {
  const xRange = Object.keys(tiles);

  let leaves = [
    [Math.min(...xRange), 0],
    [Math.max(...xRange), 0]
  ];

  if (spinner) {
    const yRange = Object.keys(tiles[spinner[0]]);
    leaves.push([spinner[0], Math.min(...yRange)]);
    leaves.push([spinner[0], Math.max(...yRange)]);
  }

  return leaves;
}

module.exports = {
  get,
  leaves
}
