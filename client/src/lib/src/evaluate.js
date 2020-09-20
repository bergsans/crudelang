const { UnsafeDivision, UndefinedNode } = require('./Error.js');

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

function visitWhile(node, env) {
  if (node.test.value.value.op.type === 'GT') {
    while (evaluate(node.test.value.value.left, env) > evaluate(node.test.value.value.right, env)) {
      evaluate(node.consequent, env);
    }
  } else if (node.test.value.value.op.type === 'LT') {
    while (evaluate(node.test.value.value.left, env) < evaluate(node.test.value.value.right, env)) {
      evaluate(node.consequent, env);
    }
  }
}

function print(output, env) {
  const out = output.args.reduce((str, v) => `${str}${evaluate(v, env)}`, '');
  console.log(out);
}

function rectangle(node, env) {
  const canvas = document.querySelector('#output');
  const ctx = canvas.getContext('2d');
  const x = evaluate(node.args[0], env);
  const y = evaluate(node.args[1], env);
  const w = evaluate(node.args[2], env);
  const h = evaluate(node.args[3], env);
  const color = evaluate(node.args[4], env);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function circle(node, env) {
  const canvas = document.querySelector('#output');
  const ctx = canvas.getContext('2d');
  const x = evaluate(node.args[0], env);
  const y = evaluate(node.args[1], env);
  const r = evaluate(node.args[2], env);
  const color = evaluate(node.args[3], env);
  ctx.fillStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}

function evaluate(input, env = {}) {

  if (input === undefined) {
    throw new UndefinedNode();
  } if (input.type === 'Scope') {
    if (!Array.isArray(input.body)) {
      return evaluate(input.body, env);
    }
    const evaluatedExpressions = input.body.map((x) => evaluate(x, env));
    return evaluatedExpressions.find((x) => x !== undefined);
  } if (input.type === 'ReturnStatement') {
    return evaluate(input.value, env);
  } if (input.type === 'IfStatement') {
    return visitIfStatement(input, env);
  } if (input.type === 'PrintStatement') {
    print(input, env);
  } if(input.type === 'RectangleStatement') {
    rectangle(input, env);
  } if(input.type === 'CircleStatement') {
    circle(input, env);
  }
  else if (input.type === 'While') {
    return visitWhile(input, env);
  } else if (input.type === 'Assignment') {
    env[input.name] = evaluate(input.value, env);
  } else if (input.type === 'Expression') {
    return visitExpression(input.value, env);
  } else if (input.type === 'BinaryExpression') {
    return visitBinaryExpression(input.value, env);
  } else if (input.type === 'INTEGER') {
    return parseInt(input.value, 10);
  } else if (input.type === 'STRING') {
    return input.value.replace(/\"/g, '');
  } else if (input.type === 'IDENTIFIER') {
    return env[input.value];
  }
}

module.exports = {
  evaluate,
};
