const { red } = require('chalk');

class UnsafeDivision extends Error {
  constructor(node) {
    super(red(`Division by zero is unsafe. You cannot divide ${node.left.value} with ${node.right.value}`));
  }
}

function visitBinaryExpression(node) {
  if(node.op.type === 'MULT') {
    return evaluate(node.left) * evaluate(node.right);
  } else if(node.op.type === 'DIV') {
    if(evaluate(node.right) === 0) {
      throw new UnsafeDivision(node);
    } else {
      return Math.round(evaluate(node.left) / evaluate(node.right));
    }
  } else if(node.op.type === 'PLUS') {
    return evaluate(node.left) + evaluate(node.right);
  } else if(node.op.type === 'MINUS') {
    return evaluate(node.left) - evaluate(node.right);
  }
}

function visitExpression(node) {
  if(node.type === 'Expression') {
    return visitExpression(node.value)
  } else if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value);
  } else if(node.type === 'INTEGER') {
    return evaluate(node.value);
  }
}

function evaluate(node) {
  if(node.type === 'Expression') {
    return visitExpression(node.value);
  } else if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value);
  } else if(node.type === 'INTEGER') {
    return parseInt(node.value);
  }

}

module.exports = {
  evaluate
};
