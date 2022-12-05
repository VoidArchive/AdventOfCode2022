import { readFileSync } from 'fs';
const data = readFileSync('input.txt').toString().split('\n');
const testData = [
    '2-4,6-8',
    '2-3,4-5',
    '5-7,7-9',
    '2-8,3-7',
    '4-8,2-6',
    '6-6,4-6',
];
function partOne() {
    let partOneSum = 0;
    for (let item of data) {
        const [a, b] = item
            .split(',')
            .map((item) => item.split('-').map(Number))
            .sort((a, b) => b[1] - b[0] - (a[1] - a[0]));
        if (b[1] <= a[1] && b[0] >= a[0]) {
            partOneSum += 1;
        }
    }
    return partOneSum;
}
function partTwo() {
    let partTwoSum = 0;
    for (let item of data) {
        const [a, b] = item
            .split(',')
            .map((item) => item.split('-').map(Number))
            .sort((a, b) => a[0] - b[0]);
        console.log(a, b);
        if (b[0] <= a[1]) {
            partTwoSum += 1;
        }
    }
    return partTwoSum;
}
console.log(partTwo());
