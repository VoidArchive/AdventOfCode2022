import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString().split('\n');
const testInput = ['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'];

function partOne(data: string[]) {
  let currentHeadPos = '0#0';
  let currentTailPos = '0#0';
  const tailPos: string[] = [];

  data.forEach((line) => {
    const [cmd, steps] = line.split(' ');

    let [headX, headY] = currentHeadPos.split('#').map((x) => +x);
    let [tailX, tailY] = currentTailPos.split('#').map((x) => +x);

    for (let i = 1; i <= +steps; i++) {
      if (cmd === 'L') headX--;
      else if (cmd === 'R') headX++;
      else if (cmd === 'U') headY++;
      else if (cmd === 'D') headY--;

      let moveX = 0;
      let moveY = 0;

      // move X
      if (
        Math.abs(headX - tailX) > 1 ||
        (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) > 1)
      ) {
        headX < tailX ? moveX-- : moveX++;
      }

      // move y
      if (
        Math.abs(headY - tailY) > 1 ||
        (Math.abs(headY - tailY) === 1 && Math.abs(headX - tailX) > 1)
      ) {
        headY < tailY ? moveY-- : moveY++;
      }

      tailX += moveX;
      tailY += moveY;

      currentHeadPos = [headX, headY].join('#');
      currentTailPos = [tailX, tailY].join('#');
      tailPos.push(currentTailPos);
    }
  });

  return new Set(tailPos).size;
}

console.log(partOne(input));

function partTwo(data: string[]) {
  const snake = Array(10).fill('0#0');
  const tailPos: string[] = [];

  const moveSnake = (pos1, pos2, i, cmd) => {
    let [s1x, s1y] = pos1.split('#').map((x) => +x);
    let [s2x, s2y] = pos2.split('#').map((x) => +x);

    if (i === 0) {
      if (cmd === 'L') s1x--;
      else if (cmd === 'R') s1x++;
      else if (cmd === 'U') s1y++;
      else if (cmd === 'D') s1y--;
    }

    let moveX = 0;
    let moveY = 0;

    // move X
    if (
      Math.abs(s1x - s2x) > 1 ||
      (Math.abs(s1x - s2x) === 1 && Math.abs(s1y - s2y) > 1)
    ) {
      s1x < s2x ? moveX-- : moveX++;
    }

    // move y
    if (
      Math.abs(s1y - s2y) > 1 ||
      (Math.abs(s1y - s2y) === 1 && Math.abs(s1x - s2x) > 1)
    ) {
      s1y < s2y ? moveY-- : moveY++;
    }

    s2x += moveX;
    s2y += moveY;

    snake[i] = [s1x, s1y].join('#');
    snake[i + 1] = [s2x, s2y].join('#');

    if (i === snake.length - 2) return tailPos.push(snake[i + 1]);

    moveSnake(snake[i + 1], snake[i + 2], i + 1, cmd);
  };

  data.forEach((line) => {
    const [cmd, steps] = line.split(' ');

    for (let i = 0; i < +steps; i++) {
      moveSnake(snake[0], snake[1], 0, cmd);
    }
  });

  return new Set(tailPos).size;
}

console.log(partTwo(input));
