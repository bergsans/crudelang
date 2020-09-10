const { red } = require('chalk');

class TokenError extends Error {
  constructor(char) {
    super(red(`Invalid token: ${char}`));
  }
}

const isDigit = (char) => /[0-9]/.test(char);

function tokenize(input, currentPosition = 0, tokens = []) {
  if(currentPosition === input.length) {
    return [...tokens, { type: 'EOF' }];
  } else if(isDigit(input[currentPosition])) {
    if(isDigit(input[currentPosition + 1])) {
      let tempInt = input[currentPosition];
      while(isDigit(input[currentPosition + 1])) {
        currentPosition++;
        tempInt += input[currentPosition];
      }
      return tokenize(
        input,
        currentPosition + 1,
        [...tokens, { type: 'INTEGER', value: tempInt }]
      );
    } else {
      return tokenize(
        input,
        currentPosition + 1,
        [...tokens, { type: 'INTEGER', value: input[currentPosition] }]
      );
    }
  } else {
    throw new TokenError(input[currentPosition]);
  }
}

module.exports = {
  tokenize
};
