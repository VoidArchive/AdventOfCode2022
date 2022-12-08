import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString().split('\n');

const testGrid = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];
const grid = [];

for (let line of input) {
  grid.push(line.split('').map(Number));
}

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function partOne(grid: number[][]) {
  let result = 0;
  let column = grid.length;
  let row = grid[0].length;

  const isVisible = (i: number, j: number) => {
    for (const [dirI, dirJ] of directions) {
      let rowI = i + dirI;
      let rowJ = j + dirJ;

      while (
        0 <= rowI &&
        rowI < column &&
        0 <= rowJ &&
        rowJ < row &&
        grid[rowI][rowJ] < grid[i][j]
      ) {
        rowI += dirI;
        rowJ += dirJ;
      }

      if (!(0 <= rowI && rowI < column && 0 <= rowJ && rowJ < row)) {
        return true;
      }
    }
    return false;
  };

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      if (isVisible(i, j)) {
        result += 1;
      }
    }
  }
  return result;
}

console.log(partOne(grid));

function partTwo(grid: number[][]) {
  let result = 0;
  let column = grid.length;
  let row = grid[0].length;

  const score = (i: number, j: number) => {
    let s = 1;
    for (const [dirI, dirJ] of directions) {
      let curr = 0;
      let rowI = i + dirI;
      let rowJ = j + dirJ;

      while (0 <= rowI && rowI < column && 0 <= rowJ && rowJ < row) {
        curr += 1;
        if (grid[rowI][rowJ] >= grid[i][j]) {
          break;
        }

        rowI += dirI;
        rowJ += dirJ;
      }
      s *= curr;
    }
    return s;
  };

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      result = Math.max(result, score(i, j));
    }
  }

  return result;
}

console.log(partTwo(testGrid));
