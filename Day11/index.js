import { readFileSync } from 'fs';
const data = readFileSync('input.txt').toString();
const M = [];
const makeOp = (s) => {
    const [b, c] = s.split(' ').slice(-2);
    if (b === '+')
        return (n) => n + +c;
    if (c === 'old')
        return (n) => n * n;
    return (n) => n * +c;
};
const nums = (s) => (s.match(/-?\d+/g) || []).map(Number);
data.split('\n\n').forEach((l) => {
    const arr = l.split('\n');
    const items = nums(arr[1]);
    const op = makeOp(arr[2]);
    const [divisor, yes, no] = nums(arr.slice(3).join('\n'));
    M.push({ items, op, divisor, yes, no });
});
const calc = (round, cb) => {
    const inspected = Array(M.length).fill(0);
    const items = M.map((m) => m.items.map((n) => Array(M.length).fill(n)));
    for (let r = 0; r < round; r++) {
        M.forEach((m, i) => {
            items[i].forEach((ns) => {
                const _n = ns.map((n, i) => cb(m.op(n), i));
                const to = _n[i] % m.divisor === 0 ? m.yes : m.no;
                items[to].push(_n);
                inspected[i] += 1;
            });
            items[i] = [];
        });
    }
    inspected.sort((a, b) => b - a);
    return inspected[0] * inspected[1];
};
console.log(calc(20, (n) => Math.floor(n / 3)));
console.log(calc(10000, (n, i) => n % M[i].divisor));
