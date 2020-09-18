const { red } = require('chalk');

class UnsafeDivision extends Error {
  constructor(node) {
    super(red(`Division by zero is unsafe. You cannot divide ${node.left.value} with ${node.right.value}`));
  }
}

class UndefinedNode extends Error {
  constructor(node) {
    super(red('Error in evaluation. Node is undefined.'));
  }
}

module.exports = {
  UndefinedNode,
  UnsafeDivision,
};
