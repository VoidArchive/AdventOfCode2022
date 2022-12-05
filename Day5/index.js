import { readFileSync } from 'fs';
const crates = {
    1: [['N'], ['C'], ['R'], ['T'], ['M'], ['Z'], ['P']],
    2: [['D'], ['N'], ['T'], ['S'], ['B'], ['Z']],
    3: [['M'], ['H'], ['Q'], ['R'], ['F'], ['C'], ['T'], ['G']],
    4: [['G'], ['R'], ['Z']],
    5: [['Z'], ['N'], ['R'], ['H']],
    6: [['F'], ['H'], ['S'], ['W'], ['P'], ['Z'], ['L'], ['D']],
    7: [['W'], ['D'], ['Z'], ['R'], ['C'], ['G'], ['M']],
    8: [['S'], ['J'], ['F'], ['L'], ['H'], ['W'], ['Z'], ['Q']],
    9: [['S'], ['Q'], ['P'], ['W'], ['N']],
};
const testCrates = {
    1: [['N'], ['C'], ['R']],
    2: [['D'], ['N'], ['A']],
    3: [['M'], ['H'], ['Q']],
};
const testData = [
    'move 1 from 2 to 1',
    'move 3 from 1 to 3',
    'move 2 from 2 to 1',
];
const instruction = readFileSync('./input.txt').toString().split('\n');
const regexp = /^move (\d+) from (\d+) to (\d+)$/m;
function partOne() {
    let result = [];
    for (let i = 0; i < instruction.length; i++) {
        let data = instruction[i].match(regexp);
        if (data) {
            let move = Number(data[1]);
            let from = Number(data[2]);
            let to = Number(data[3]);
            while (move) {
                //@ts-ignore
                let temp = crates[from].pop();
                //@ts-ignore
                crates[to].push(temp);
                move--;
            }
        }
    }
    for (let i = 1; i <= 9; i++) {
        //@ts-ignore
        result += crates[i][crates[i].length - 1];
    }
    return result;
}
// console.log(partOne());
function partTwo() {
    let result = [];
    for (let i = 0; i < instruction.length; i++) {
        let data = instruction[i].match(regexp);
        if (data) {
            let move = Number(data[1]);
            let from = Number(data[2]);
            let to = Number(data[3]);
            //@ts-ignore
            if (move <= crates[from].length) {
                //@ts-ignore
                let temp = crates[from].splice(crates[from].length - move, move);
                // console.log(temp);
                //@ts-ignore
                crates[to].push(...temp);
            }
            //@ts-ignore
        }
    }
    for (let i = 1; i <= 9; i++) {
        //@ts-ignore
        result += crates[i][crates[i].length - 1];
    }
    return result;
}
console.log(partTwo());
