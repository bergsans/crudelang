const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js');

test('parse 1', () => {
  expect(parse(tokenize('1'))).toEqual({
    type: 'INTEGER',
    value: '1'
  });
});

test('parse 1 + 1', () => {
  expect(parse(tokenize('1 + 1'))).toEqual({
    left: {
      type: 'INTEGER',
      value: '1'
    },
    op: {
      type: 'PLUS',
      value: '+'
    },
    right: {
      type: 'INTEGER',
      value: '1'
    }
  });
});

test('parse 1 + 1 + 1', () => {
  expect(parse(tokenize('1 + 1 + 1'))).toEqual({
    left: {
      type: 'INTEGER',
      value: '1'
    },
    op: {
      type: 'PLUS',
      value: '+'
    },
    right: {
      left: {
        type: 'INTEGER',
        value: '1'
      },
      op: {
        type: 'PLUS',
        value: '+'
      },
      right: {
        type: 'INTEGER',
        value: '1'
      }
    }
  });
});
