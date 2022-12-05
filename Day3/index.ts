import { readFileSync } from 'fs';

const data = readFileSync('input.txt').toString().split('\n');

// Part One
const getValueOfChar = (char: string) => {
  return char === char.toUpperCase()
    ? char.charCodeAt(0) - 38
    : char.charCodeAt(0) - 96;
};

const partOne = data.reduce((sum, word) => {
  const [a, b] = [
    word.substring(0, word.length / 2),
    word.substring(word.length / 2),
  ];
  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i])) {
      return (sum += getValueOfChar(a[i]));
    }
  }
}, 0);

console.log('Part 1:', partOne);

const splitArrayAfterNValues = <T>(array: T[], length: number): T[][] => {
  let result = [];
  let amountOfLoops = array.length / length;

  for (let i = 0; i < amountOfLoops; i++) {
    const downRange = i * length;
    const upperRange = (i + 1) * length;
    result = [...result, array.slice(downRange, upperRange)];
  }

  return result;
};

const partTwo = splitArrayAfterNValues(data, 3).reduce(
  (sum: number, wordTriplet) => {
    const [a, b, c] = wordTriplet;

    for (let j = 0; j < a.length; j++) {
      if (b.includes(a[j]) && c.includes(a[j])) {
        return (sum += getValueOfChar(a[j]));
      }
    }
  },
  0
);

console.log(splitArrayAfterNValues(data, 3));
