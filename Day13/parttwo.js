import * as fs from 'fs';
const firstDiv = [[2]];
const secondDiv = [[6]];
const padArrayToLength = (arr, len) => [
    ...arr,
    ...Array(Math.max(len, arr.length) - arr.length).fill(-1),
];
const areInOrder = (left, right) => {
    if (typeof left === 'number' && typeof right === 'number') {
        if (left < right)
            return 'good';
        if (right < left)
            return 'bad';
        return 'continue';
    }
    else if (typeof left !== 'number' && typeof right !== 'number') {
        const maxLength = Math.max(left.length, right.length);
        const lArr = padArrayToLength(left, maxLength);
        const rArr = padArrayToLength(right, maxLength);
        const answer = lArr.map((val, i) => areInOrder(val, rArr[i]));
        const firstBad = answer.findIndex((ans) => ans === 'bad');
        const firstGood = answer.findIndex((ans) => ans === 'good');
        if (firstBad != -1 && firstGood != -1) {
            if (firstBad < firstGood)
                return 'bad';
            else
                return 'good';
        }
        if (firstBad != -1)
            return 'bad';
        if (firstGood != -1)
            return 'good';
        return 'continue';
    }
    else {
        if (typeof left === 'number') {
            if (left === -1)
                return 'good';
            return areInOrder([left], right);
        }
        else {
            if (right === -1)
                return 'bad';
            return areInOrder(left, [right]);
        }
    }
};
const input = fs
    .readFileSync('input.txt', 'utf8')
    .split('\n\n')
    .map((a) => a.trim());
const packets = input
    .map((line) => line.split('\n').map((pack) => JSON.parse(pack)))
    .flat()
    .concat([firstDiv, secondDiv]);
const orderedSignal = packets.sort((a, b) => areInOrder(a, b) === 'good' ? -1 : 1);
const firstDivPos = orderedSignal.findIndex((packet) => JSON.stringify(packet) === JSON.stringify(firstDiv)) + 1;
const secondDivPos = orderedSignal.findIndex((packet) => JSON.stringify(packet) === JSON.stringify(secondDiv)) + 1;
const answer = firstDivPos * secondDivPos;
console.log(answer);
