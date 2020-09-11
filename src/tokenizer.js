const { red } = require('chalk');

class TokenError extends Error {
  constructor(char) {
    super(red(`Invalid token: ${char}`));
  }
}

const isEOF = (char) => char === undefined

const tokenChecks = {
  isDigit: (char) => /[0-9]/.test(char),
  isAddition: (char) => /\+/.test(char),
  isWhiteSpace: (char) => / /.test(char),
  isLeftParen: (char) => /\(/.test(char),
  isRightParen: (char) => /\)/.test(char),
  isAlphabetic: (char) => /[A-Za-z]/.test(char)
};

const TOKEN_TYPES = {
  isDigit: 'INTEGER',
  isAddition: 'PLUS',
  isWhiteSpace: 'WHITE_SPACE',
  isLeftParen: 'OPEN_PAREN',
  isRightParen: 'CLOSE_PAREN',
  isAlphabetic: 'IDENTIFIER'
};

const removeWhiteSpace = (token) => token.type !== 'WHITE_SPACE';

function collectCharacters(fn, input, currentPosition) {
  let tempValue = input[currentPosition];
  while(fn(input[currentPosition + 1])) {
    currentPosition++;
    tempValue += input[currentPosition];
  }
  return tempValue;
}

function tokenize(input, currentPosition = 0, tokens = []) {
  if(isEOF(input[currentPosition])) {
    return [...tokens, { type: 'EOF' }].filter(removeWhiteSpace);
  }

  const token = Object
    .entries(tokenChecks)
    .find(([_name, fn]) => fn(input[currentPosition]));
  if(token) {
   const [name, fn] = token;
   return tokenize(
     input,
     name === 'isDigit'
      ? currentPosition + collectCharacters(fn, input, currentPosition).length
      : currentPosition + 1,
    [
       ...tokens,
       {
         type: TOKEN_TYPES[name],
         value: name === 'isDigit'
          ? parseInt(collectCharacters(fn, input, currentPosition))
          : input[currentPosition],
       }
    ]
   );
  }
  throw new TokenError(input[currentPosition]);
}

module.exports = {
  tokenize
};
