import { readFileSync } from 'fs';

const data = readFileSync('input.txt');

let a = data.toString().split('\n\n'); // Split the string with two new line

// console.log(a);
let array: number[] = [];
for (let i = 0; i < a.length; i++) {
  array.push(
    a[i]
      .split('\n') // again split the string to array by new line
      .map((i) => Number(i)) // Parse the string to number
      .reduce((a, b) => a + b) // Find of sum of a single elf
  );
}

//Part One answer 71300
// console.log(Math.max(...array));

function sumThreeLargest(array: number[]) {
  array.sort((a, b) => a - b);
  array.reverse();

  return array[0] + array[1] + array[2];
}

console.log(sumThreeLargest(array));
