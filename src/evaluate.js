const { red } = require('chalk');

class UnsafeDivision extends Error {
  constructor(node) {
    super(red(`Division by zero is unsafe. You cannot divide ${node.left.value} with ${node.right.value}`));
  }
}

// if true, body...
function visitIfStatement(node) {
  if(node.compr.type === 'GT') {
    return evaluate(node.left) > evaluate(node.right);
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
  }
}

function evaluate(node) {
  if(node.body && node.body.length > 1) {
    for(node of node.body) {
      return evaluate(node);
    }
  } else if(node.type === 'Expression') {
    return visitExpression(node.value);
  } else if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value);
  } else if(node.type === 'IfStatement') {
    return visitIfStatement(node.value);
  } else if(['INTEGER', 'IDENTIFIER'].includes(node.type)) {
    return parseInt(node.value);
  }

}

module.exports = {
  evaluate
};
