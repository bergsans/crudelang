const { tokenize } = require('../src/tokenizer.js');

test('empty input', () => {
  expect(tokenize('')).toEqual([{
    type: 'EOF'
  }]);
});

test('1', () => {
  expect(tokenize('1')).toEqual([
    {
      type: 'INTEGER',
      value: '1'
    },
    {
      type: 'EOF'
    }
  ]);
});

test('11', () => {
  expect(tokenize('11')).toEqual([
    {
      type: 'INTEGER',
      value: '11'
    },
    {
      type: 'EOF'
    }
  ]);
});

test.skip('11 + a', () => {
  const v = tokenize('11 + aaaa');
  console.log(v);
  expect(tokenize('11 + aaaa')).toEqual([
    {
      type: 'INTEGER',
      value: '11'
    },
    {
      type: 'PLUS',
      value: '+'
    },
    {
      type: 'IDENTIFIER',
      value: 'a'
    },
    {
      type: 'EOF'
    }
  ]);
});

test('11 + 4', () => {
  expect(tokenize('11 + 4')).toEqual([
    {
      type: 'INTEGER',
      value: '11'
    },
    {
      type: 'PLUS',
      value: '+'
    },
    {
      type: 'INTEGER',
      value: '4'
    },
    {
      type: 'EOF'
    }
  ]);
});

test('throws at invalid character', () => {
  expect(() => tokenize('?')).toThrow('Invalid token: ?');
});
