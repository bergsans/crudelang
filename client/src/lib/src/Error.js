const { red } = require('chalk');

export class UnsafeDivision extends Error {
  constructor(node) {
    super(red(`Division by zero is unsafe. You cannot divide ${node.left.value} with ${node.right.value}`));
  }
}

export class UndefinedNode extends Error {
  constructor(node) {
    super(red('Error in evaluation. Node is undefined.'));
  }
}

