import { readFileSync, writeFileSync } from 'fs';
const data = readFileSync('input.txt');
let a = data.toString().split('\n\n'); // Split the string with two new line
let array = [];
for (let i = 0; i < a.length; i++) {
    let b = a[i].split('\n');
    array.push({ text: b[0], author: b[1] });
}
// console.log(array);
writeFileSync('data.json', JSON.stringify(array));
