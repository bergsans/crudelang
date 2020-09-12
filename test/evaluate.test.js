const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js')
const { evaluate } = require('../src/evaluate.js');

const interpret = (input) => evaluate(parse(tokenize(input)));

test('eval 1', () => {
  expect(interpret('1')).toEqual(1);
});

test('eval 1 + 1', () => {
  expect(interpret('1 + 1')).toEqual(2);
});

test('eval 1 + (1 + 1)', () => {
  expect(interpret('1 + (1 + 1)')).toEqual(3);
});
