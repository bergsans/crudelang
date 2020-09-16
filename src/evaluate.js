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

function visitBinaryExpression(node, env) {
  if (node.op.type === 'MULT') {
    return evaluate(node.left, env) * evaluate(node.right, env);
  } if (node.op.type === 'DIV') {
    if (evaluate(node.right) === 0) {
      throw new UnsafeDivision(node);
    } else {
      return Math.round(evaluate(node.left, env) / evaluate(node.right, env));
    }
  } else if (node.op.type === 'PLUS') {
    return evaluate(node.left, env) + evaluate(node.right, env);
  } else if (node.op.type === 'MINUS') {
    return evaluate(node.left, env) - evaluate(node.right, env);
  }
}

function visitExpression(node, env) {
  if (node.type === 'Expression') {
    return visitExpression(node.value, env);
  } if (node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value, env);
  }
}

function visitIfStatement(node, env) {
  if (node.test.value.value.op.type === 'GT') {
    if (evaluate(node.test.value.value.left, env) > evaluate(node.test.value.value.right, env)) {
      return evaluate(node.consequent, env);
    }
  } else if (node.test.value.value.op.type === 'LT') {
    if (evaluate(node.test.value.value.left, env) < evaluate(node.test.value.value.right, env)) {
      return evaluate(node.consequent, env);
    }
  }
}

function evaluate(input, env = {}) {
  if (input === undefined) {
    throw new UndefinedNode();
  } else if (Array.isArray(input)) {
    const evaluatedExpressions = input.map((x) => evaluate(x, env));
    return evaluatedExpressions.find((x) => x !== undefined);
  } else if (input.type === 'Scope') {
    return evaluate(input.body, env);
  } else if (input.type === 'ReturnStatement') {
    return evaluate(input.value, env);
  } else if (input.type === 'IfStatement') {
    return visitIfStatement(input, env);
  } else if (input.type === 'Assignment') {
    env[input.name] = evaluate(input.value, env);
  } else if (input.type === 'Expression') {
    return visitExpression(input.value, env);
  } else if (input.type === 'BinaryExpression') {
    return visitBinaryExpression(input.value, env);
  } else if (input.type === 'INTEGER') {
    return parseInt(input.value, env);
  } else if (input.type === 'IDENTIFIER') {
    return env[input.value];
  }
}

module.exports = {
  evaluate,
};
