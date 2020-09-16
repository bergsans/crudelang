const { red } = require('chalk');

class UnsafeDivision extends Error {
  constructor(node) {
    super(red(`Division by zero is unsafe. You cannot divide ${node.left.value} with ${node.right.value}`));
  }
}

function visitBinaryExpression(node, env) {
  if(node.op.type === 'MULT') {
    return evaluate(node.left, env) * evaluate(node.right, env);
  } else if(node.op.type === 'DIV') {
    if(evaluate(node.right) === 0) {
      throw new UnsafeDivision(node);
    } else {
      return Math.round(evaluate(node.left, env) / evaluate(node.right, env));
    }
  } else if(node.op.type === 'PLUS') {
    return evaluate(node.left, env) + evaluate(node.right, env);
  } else if(node.op.type === 'MINUS') {
    return evaluate(node.left, env) - evaluate(node.right, env);
  }
}

function visitExpression(node, env) {
  if(node.type === 'Expression') {
    return visitExpression(node.value, env)
  } else if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value, env);
  }
}

function visitIfStatement(node, env) {
  console.log(node)
  if(node.test.value.value.op.type === 'GT') {
    if(evaluate(node.test.value.value.left, env) > evaluate(node.test.value.value.right, env)) {
      console.log('---------------- HERE --------------')
      return evaluate(node.consequent, env);
    } else {
      return;
    }
  }
}

function evaluate(input, env={}) {
  if(input === undefined) { return; }
  if(Array.isArray(input)) {
    const evaluatedExpressions = input.map((x) => evaluate(x, env))
    // remove side-effects and go for first return
    return evaluatedExpressions.find((x) => x !== undefined);
  } else if(input.type === 'Scope') {
    return evaluate(input.body, env);
  }

  else if(input.type === 'ReturnStatement') {
    return evaluate(input.value, env);
  } else if(input.type === 'IfStatement') {
    return visitIfStatement(input, env);
  } else if(input.type === 'Assignment') {
    console.log(input.value)
    env[input.name] = evaluate(input.value, env);
  } else if(input.type === 'Expression') {
    return visitExpression(input.value, env);
  } else if(input.type === 'BinaryExpression') {
    return visitBinaryExpression(input.value, env);
  } else if(input.type === 'INTEGER') {
    return parseInt(input.value, env);
  } else if(input.type === 'IDENTIFIER') {
    return env[input.value];
  }
}

module.exports = {
  evaluate
};
