function visitBinaryExpression(node) {
  if(node.op.type === 'MULT') {
    return evaluate(node.left) * evaluate(node.right);
  } else if(node.op.type === 'DIV') {
    return evaluate(node.right) !== 0
      ? Math.round(evaluate(node.left) / evaluate(node.right))
      : null;
  } else if(node.op.type === 'PLUS') {
    return evaluate(node.left) + evaluate(node.right);
  } else if(node.op.type === 'MINUS') {
    return evaluate(node.left) - evaluate(node.right);
  }
}

function visitExpression(node) {
  if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value);
  } else if(node.type === 'INTEGER') {
    return evaluate(node.value);
  }
}

function evaluate(node) {
  if(node.type === 'INTEGER') {
    return node.value;
  } else if(node.type === 'Expression') {
    return visitExpression(node.value);
  } else if(node.type === 'BinaryExpression') {
    return visitBinaryExpression(node.value);
  }
}

module.exports = {
  evaluate
};
