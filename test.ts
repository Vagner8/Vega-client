const arr = [
  { a: 'a', b: 4 },
  { a: 'a', b: 5 },
];

console.log(
  arr.filter(item => item.a === 'a')[arr.length - 1]
);
