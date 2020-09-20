import { tokenize } from './tokenizer.js';
import { parse } from    './parser.js';
import { evaluate } from './evaluate.js';

export function interpret(input) {
  return evaluate(parse(tokenize(input)));
}
