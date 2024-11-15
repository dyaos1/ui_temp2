const tester = {
  a: 'a',
  b: 'b',
  c: 'c',
};

const sub = {
  ...tester,
  d: 'd2',
  c: 'c2',
};

const sub2 = {
  c: 'c2',
  d: 'd2',
  ...tester,
};

console.log(sub);
console.log(sub2);
