import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString();

// const testInput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

function checkDuplicate(data: string) {
  let hashSet = new Set(data);
  return hashSet.size !== data.length;
}

function solution(input: string) {
  // change right from 4 to 14 for part two
  let right = 14;
  for (let left = 0; left <= input.length; left++) {
    let data = input.slice(left, right);
    if (!checkDuplicate(data)) return right;
    else {
      right++;
    }
  }
}

console.log(solution(input));
