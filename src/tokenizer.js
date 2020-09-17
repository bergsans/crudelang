const { red } = require('chalk');

class TokenError extends Error {
  constructor(char) {
    super(red(`Invalid token: ${char}`));
  }
}

const isEOF = (char) => char === undefined;

const tokenChecks = {
  isDigit: (char) => /[0-9]/.test(char),
  isMultiplication: (char) => /\*/.test(char),
  isDivision: (char) => char === '/',
  isSubstraction: (char) => /-/.test(char),
  isAddition: (char) => /\+/.test(char),
  isLesserThan: (char) => /</.test(char),
  isGreaterThan: (char) => />/.test(char),
  isWhiteSpace: (char) => char === ' ' || char === '\n' || char === '\t',
  isLeftParen: (char) => /\(/.test(char),
  isRightParen: (char) => /\)/.test(char),
  isAlphabetic: (char) => /[A-Za-z]/.test(char),
  isAssignment: (char) => /=/.test(char),
  isEndOfStatement: (char) => char === ';',
  isOpenBlock: (char) => char === '{',
  isCloseBlock: (char) => char === '}',
  isQuote: (char) => /[A-Za-z 0-9".!:,]/.test(char),
};

const TOKEN_TYPES = {
  isDigit: 'INTEGER',
  isMultiplication: 'MULT',
  isDivision: 'DIV',
  isSubstraction: 'MINUS',
  isAddition: 'PLUS',
  isLesserThan: 'LT',
  isGreaterThan: 'GT',
  isWhiteSpace: 'WHITE_SPACE',
  isLeftParen: 'OPEN_PAREN',
  isRightParen: 'CLOSE_PAREN',
  isAlphabetic: 'IDENTIFIER',
  isAssignment: 'ASSIGN',
  isEndOfStatement: 'END',
  isOpenBlock: 'OPEN_SCOPE',
  isCloseBlock: 'CLOSE_SCOPE',
  isQuote: 'STRING',
};

const removeWhiteSpace = (token) => token.type !== 'WHITE_SPACE';

function collectCharacters(fnName, input, currentPosition) {
  let tempValue = input[currentPosition];
  while (currentPosition + 1 < input.length && tokenChecks[fnName](input[currentPosition + 1])) {
    currentPosition++;
    tempValue += input[currentPosition];
  }
  return tempValue;
}

function tokenize(input, currentPosition = 0, tokens = []) {
  if (isEOF(input[currentPosition])) {
    return [...tokens, { type: 'EOF' }].filter(removeWhiteSpace);
  }

  const token = Object
    .entries(tokenChecks)
    .find(([_name, fn]) => fn(input[currentPosition]));
  if (token) {
    const [name] = token;
    return tokenize(
      input,
      ['isDigit', 'isAlphabetic', 'isQuote'].includes(name)
        ? currentPosition + collectCharacters(name, input, currentPosition).length
        : currentPosition + 1,
      [
        ...tokens,
        {
          type: TOKEN_TYPES[name],
          value: ['isDigit', 'isAlphabetic', 'isQuote'].includes(name)
            ? collectCharacters(name, input, currentPosition)
            : input[currentPosition],
        },
      ],
    );
  }
  throw new TokenError(input[currentPosition]);
}

module.exports = {
  tokenize,
};
