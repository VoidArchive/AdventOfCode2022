import { readFileSync } from 'fs';

const data = readFileSync('input.txt').toString().split('\n');

// console.log(data[0].split(' '));

let totalScore: number = 0;

enum Point {
  rock = 1,
  paper = 2,
  scissor = 3,
}

enum matchPoint {
  win = 6,
  draw = 3,
  lose = 0,
}
// console.log(data[0].split(' ')[0]);

// Part 1
// for (let i = 0; i < data.length; i++) {
//   let move = data[i].split(' ');

//   //   If opponent choose 'A' which is rock
//   if (move[0] === 'A') {
//     // You choose rock
//     if (move[1] === 'X') {
//       totalScore += Point.rock + matchPoint.draw;
//     }
//     // You choose paper
//     if (move[1] === 'Y') {
//       totalScore += Point.paper + matchPoint.win;
//     }
//     // You choose scissor
//     if (move[1] === 'Z') {
//       totalScore += Point.scissor + matchPoint.lose;
//     }
//   }

//   //   If opponent choose 'B' which is paper
//   else if (move[0] === 'B') {
//     // You choose rock
//     if (move[1] === 'X') {
//       totalScore += Point.rock + matchPoint.lose;
//     }
//     // You choose paper
//     if (move[1] === 'Y') {
//       totalScore += Point.paper + matchPoint.draw;
//     }
//     // You choose scissor
//     if (move[1] === 'Z') {
//       totalScore += Point.scissor + matchPoint.win;
//     }
//   }

//   //   If opponent choose 'C' which is scissor
//   else {
//     // You choose rock
//     if (move[1] === 'X') {
//       totalScore += Point.rock + matchPoint.win;
//     }
//     // You choose paper
//     if (move[1] === 'Y') {
//       totalScore += Point.paper + matchPoint.lose;
//     }
//     // You choose scissor
//     if (move[1] === 'Z') {
//       totalScore += Point.scissor + matchPoint.draw;
//     }
//   }
// }

// Part 2
for (let i = 0; i < data.length; i++) {
  let move = data[i].split(' ');

  //   If the guide say choose 'X' which is lose
  if (move[1] === 'X') {
    // if opponent choose rock then you need to play scissor
    if (move[0] === 'A') {
      totalScore += Point.scissor + matchPoint.lose;
    }
    // if opponent choose paper then you need to play rock
    if (move[0] === 'B') {
      totalScore += Point.rock + matchPoint.lose;
    }
    // if opponent choose scissor then you need to play paper
    if (move[0] === 'C') {
      totalScore += Point.paper + matchPoint.lose;
    }
  }

  //   If the guide say choose 'Y' which is draw
  if (move[1] === 'Y') {
    // if opponent choose rock then you need to play rock
    if (move[0] === 'A') {
      totalScore += Point.rock + matchPoint.draw;
    }
    // if opponent choose paper then you need to play paper
    if (move[0] === 'B') {
      totalScore += Point.paper + matchPoint.draw;
    }
    // if opponent choose scissor then you need to play scissor
    if (move[0] === 'C') {
      totalScore += Point.scissor + matchPoint.draw;
    }
  }

  //   If the guide say choose 'Z' which is win
  if (move[1] === 'Z') {
    // if opponent choose rock then you need to play paper
    if (move[0] === 'A') {
      totalScore += Point.paper + matchPoint.win;
    }
    // if opponent choose paper then you need to play scissor
    if (move[0] === 'B') {
      totalScore += Point.scissor + matchPoint.win;
    }
    // if opponent choose scissor then you need to play rock
    if (move[0] === 'C') {
      totalScore += Point.rock + matchPoint.win;
    }
  }
}

console.log(totalScore);
