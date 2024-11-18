// const tester = {
//   a: 'a',
//   b: 'b',
//   c: 'c',
// };

// const sub = {
//   ...tester,
//   d: 'd2',
//   c: 'c2',
// };

// const sub2 = {
//   c: 'c2',
//   d: 'd2',
//   ...tester,
// };

// console.log(sub);
// console.log(sub2);

const ttlDvlmDt = '2020-06-01 ~ 2022-12-31';
const startDe = new Date(ttlDvlmDt.split(' ~ ')[0]);
const endDe = new Date(ttlDvlmDt.split(' ~ ')[1]);

console.log(startDe);
console.log(endDe);

// format test
