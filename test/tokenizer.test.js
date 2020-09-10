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
