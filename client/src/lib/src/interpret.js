const { tokenize } = require('./tokenizer.js');
const { parse } = require('./parser.js');
const { evaluate } = require('./evaluate.js');

function interpret(input) {
  return evaluate(parse(tokenize(input)));
}

module.exports = {
  interpret
};
