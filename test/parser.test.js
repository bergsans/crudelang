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
    type: 'BinaryExpression',
    value: {
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

test('parse 1 + 1 + 1', () => {
  expect(parse(tokenize('1 + 1 + 1'))).toEqual({
    type: 'BinaryExpression',
    value: {
      left: {
        type: 'INTEGER',
        value: '1'
      },
      op: {
        type: 'PLUS',
        value: '+'
      },
      right: {
        type: 'BinaryExpression',
        value: {
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
      }
    }
  });
});

test('assignment x = 3;', () => {
  expect(parse(tokenize('x = 3;'))).toEqual({
    type: 'Assignment',
    name: 'x',
    value: {
      type: 'INTEGER',
      value: '3'
    }
  });
});

test('assignment x = 3; y = 1;', () => {
  expect(parse(tokenize('x = 3; y = 1;'))).toEqual([
  {
    type: 'Assignment',
    name: 'x',
    value: {
      type: 'INTEGER',
      value: '3'
    }
  },
  {
    type: 'Assignment',
    name: 'y',
    value: {
      type: 'INTEGER',
      value: '1'
    }
  },
  ]);
});

test('parse 1 + (1 + 1)', () => {
  expect(parse(tokenize('1 + (1 + 1)'))).toEqual({
    type: 'BinaryExpression',
    value: {
      left: {
        type: 'INTEGER',
        value: '1'
      },
      op: {
        type: 'PLUS',
        value: '+'
      },
      right: {
        type: 'Expression',
        value: {
          type: 'BinaryExpression',
          value: {
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
        }
      }
    }
  });
});
