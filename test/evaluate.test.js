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

test('eval 4 - 2', () => {
  expect(interpret('4 - 2')).toEqual(2);
});

test('eval 6 + (4 - 2)', () => {
  expect(interpret('6 + (4 - 2)')).toEqual(8);
});

test('eval 6 * 6', () => {
  expect(interpret('6 * 6')).toEqual(36);
});

test('eval 2 + 6 * 6', () => {
  expect(interpret('2 + 6 * 6')).toEqual(38);
});

test('eval 6 / 6', () => {
  expect(interpret('6 / 6')).toEqual(1);
});

test('eval 6 / 0', () => {
  expect(() => interpret('6 / 0')).toThrow('Division by zero is unsafe. You cannot divide 6 with 0');
});

test('2 * 2 * 2', () => {
  expect(interpret('2 * 2 * 2')).toEqual(8);
});

test('(2 * 2 * 2) / 2', () => {
  expect(interpret('(2 * 2 * 2) / 2 ')).toEqual(4);
});

test('64 / (2 * 2 * 2)', () => {
  expect(interpret('64 / (2 * 2 * 2)')).toEqual(8);
});

test('2 * (2 * (2 * 2))', () => {
  expect(interpret('2 * (2 * (2 * 2))')).toEqual(16);
});

test('11 + (((12 + 2)))', () => {
  expect(interpret('11 + (((12 + 2)))')).toEqual(25);
});

test('((2 * 2 * 2) / 2) * 3', () => {
  expect(interpret('((2 * 2 * 2) / 2) * 3')).toEqual(12);
});

