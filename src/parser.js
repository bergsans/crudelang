const head = (ts) => ts[0];

function parse(tokens, node) {
  const token = tokens.length > 1
    ? tokens.shift()
    : head(tokens);
  if(token.type === 'EOF') {
    return node;
  }

  if(token.type === 'END') {
    return node;
  } else if(token.type === 'ASSIGN') {
    return parse(tokens);
  } else if(token.type === 'IDENTIFIER' && tokens[0].type === 'ASSIGN') {
    return parse(tokens, {
      type: 'Assignment',
      name: token.value,
      value: parse(tokens)
    });
  } else if(token.type === 'OPEN_PAREN') {
    return {
      type: 'Expression',
      value: parse(tokens)
    };
  } else if(token.type === 'CLOSE_PAREN') {
    return node;
  } else if(token.type === 'INTEGER') {
    return parse(tokens, token);
  } else if(token.type === 'IDENTIFIER') {
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
