const { tokenize } = require('../src/tokenizer.js');
const { parse } = require('../src/parser.js');

test.only('args', () => {
  const r = parse(tokenize(`
    x = 3;
    y = 4;
    print(1, 2, 3, 4);
    `));
  console.log(JSON.stringify(r, null,1))
  expect(r).toEqual(
    {
        "type": "Scope",
        "body": [
        {
          type: 'Assignment',
          name: 'x',
          value: {
            type: 'INTEGER',
            value: '4',
          },
        },
          {
            "type": "PrintStatement",
            "args": [
              {
                "type": "INTEGER",
                "value": "1"
              },
              {
                "type": "INTEGER",
                "value": "2"
              },
              {
                "type": "INTEGER",
                "value": "3"
              },
              {
                "type": "INTEGER",
                "value": "4"
              }
            ]
          }
        ]
      }
  );
});

test('parse', () => {
  const r = parse(tokenize(`
    x = 4;
    y = 5;
    if(x > 2) {
      y = 3;
      x = 10;
    }
    return x;
    `));
  console.log(JSON.stringify(r, null, 2));
  expect(r).toEqual(
    {
      type: 'Scope',
      body: [
        {
          type: 'Assignment',
          name: 'x',
          value: {
            type: 'INTEGER',
            value: '4',
          },
        },
        {
          type: 'Assignment',
          name: 'y',
          value: {
            type: 'INTEGER',
            value: '5',
          },
        },
        {
          type: 'IfStatement',
          test: {
            type: 'Expression',
            value: {
              type: 'BinaryExpression',
              value: {
                left: {
                  type: 'IDENTIFIER',
                  value: 'x',
                },
                op: {
                  type: 'GT',
                  value: '>',
                },
                right: {
                  type: 'INTEGER',
                  value: '2',
                },
              },
            },
          },
          consequent: [
            {
              type: 'Assignment',
              name: 'y',
              value: {
                type: 'INTEGER',
                value: '3',
              },
            },
            {
              type: 'Assignment',
              name: 'x',
              value: {
                type: 'INTEGER',
                value: '10',
              },
            },
          ],
        },
        {
          type: 'ReturnStatement',
          value: {
            type: 'IDENTIFIER',
            value: 'x',
          },
        },
      ],
    },
  );
});
