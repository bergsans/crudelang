const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js');

test('parse 1', () => {
  expect(parse(tokenize('1'))).toEqual([
    {
    type: 'INTEGER',
    value: '1'
    }
  ]);
});

test('parse 1 + 1', () => {
  expect(parse(tokenize('1 + 1;'))).toEqual({
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
  expect(parse(tokenize('1 + 1 + 1;'))).toEqual({
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

test('assignment x = 3 + 4 - 4;', () => {
  expect(parse(tokenize('x = 3 + 4 - 4;'))).toEqual([
    {
      "name": "x",
      "type": "Assignment",
      "value": {
        "type": "BinaryExpression",
        "value": {
          "left": {
            "type": "INTEGER",
            "value": "3"
          },
          "op": {
            "type": "PLUS",
            "value": "+"
          },
          "right": {
            "type": "BinaryExpression",
            "value": {
              "left": {
                "type": "INTEGER",
                "value": "4"
              },
              "op": {
                "type": "MINUS",
                "value": "-"
              },
              "right": {
                "type": "INTEGER",
                "value": "4"
              }
            }
          }
        }
      }
    }
  ]);
});

test('assignment x = 3; return x;', () => {
  expect(parse(tokenize('x = 3; return x;'))).toEqual([
  {
    type: 'Assignment',
    name: 'x',
    value: {
      type: 'INTEGER',
      value: '3'
    }
  },
  {
    type: 'ReturnStatement',
    value: {
      type: 'IDENTIFIER',
      value: 'x'
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
