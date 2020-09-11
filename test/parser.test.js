const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js');

test('parse 1', () => {
  expect(parse(tokenize('1'))).toEqual({});
});
test('parse 1 + 1', () => {
  expect(parse(tokenize('1 + 1'))).toEqual({});
});
test('parse 1 + 1 + 1', () => {
  expect(parse(tokenize('1 + 1 + 1'))).toEqual({});
});
