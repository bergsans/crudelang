const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js');
const { evaluate } = require('../src/evaluate.js');

const interpret = (input) => evaluate(parse(tokenize(input)));

test('return 1', () => {
  expect(interpret(`
    {
      return 1;
    }
  `)).toBe(1);
});

test('return 1 + 2 + 3 + 4', () => {
  expect(interpret(`
    {
      return 1 + 2 + 3 + 4;
    }
  `)).toBe(10);
});

test('x = 3; return x;', () => {
  expect(interpret(`
    {
      x = 3;
      y = 5;
      return x;
    }
  `)).toBe(3);
});

test('x = 3; x = x + 1; return x;', () => {
  expect(interpret(`
    {
      x = 3;
      x = x + 1;
      return x;
    }
  `)).toBe(4);
});

test('if > true (GT)', () => {
  const r = parse(tokenize(`
  {
    x = 4;
    y = 5;
    if(x > 2) {
      y = 3;
      x = 10;
    }
    return x;
  }
  `));
  expect(evaluate(r)).toEqual(10);
});

test('if > true (LT)', () => {
  const r = parse(tokenize(`
  {
    x = 4;
    y = 5;
    if(x < 100) {
      y = 3;
      x = 10;
    }
    return x;
  }
  `));
  expect(evaluate(r)).toEqual(10);
});

test('if > false (gt)', () => {
  const r = parse(tokenize(`
  {
    x = 4;
    y = 5;
    if(x > 20) {
      y = 3;
      x = 10;
    }
    return x;
  }
  `));
  expect(evaluate(r)).toEqual(4);
});

test('while', () => {
  const r = parse(tokenize(`
  {
    x = 4;
    while(x < 20) {
      x = x + 1;
    }
    return x;
  }
  `));
  expect(evaluate(r)).toEqual(20);
});
