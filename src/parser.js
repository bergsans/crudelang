const head = (ts) => ts[0];

function parse(tokens, node) {
  const token = tokens.length > 1
    ? tokens.shift()
    : head(tokens);
  if(token.type === 'EOF') {
    return node;
  }

  if(token.type === 'OPEN_PAREN') {
    return {
      type: 'Expression',
      value: parse(tokens)
    };
  } else if(token.type === 'CLOSE_PAREN') {
    return node;
  } else if(token.type === 'INTEGER') {
    return parse(tokens, token);
  } else if(token.type === 'IDENTIFIER') {
    if(token.value === 'if') {
      return parse(tokens, {
        type: 'IfStatement',
        test: {
          left: node,
          compr: token,
          right: parse(tokens)
        }
      });
    }
    return parse(tokens, token);
  } else if(['MULT','DIV', 'PLUS', 'MINUS'].includes(token.type)) {
    return parse(tokens, {
      type: 'BinaryExpression',
      value: {
        left: node,
        op: token,
        right: parse(tokens)
      }
    });
  }
}

module.exports = {
  parse
};
