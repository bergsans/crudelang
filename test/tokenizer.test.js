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

test('a', () => {
  expect(tokenize('a')).toEqual([
    {
      type: 'IDENTIFIER',
      value: 'a'
    },
    {
      type: 'EOF'
    }
  ]);
});

test('aaa', () => {
  expect(tokenize('aaa')).toEqual([
    {
      type: 'IDENTIFIER',
      value: 'aaa'
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

test('x = 3', () => {
  expect(tokenize('x = 3')).toEqual([
    {
      type: 'IDENTIFIER',
      value: 'x'
    },
    {
      type: 'ASSIGN',
      value: '='
    },
    {
      type: 'INTEGER',
      value: '3'
    },
    {
      type: 'EOF'
    }
  ]);
});

test('throws at invalid character', () => {
  expect(() => tokenize('?')).toThrow('Invalid token: ?');
});
