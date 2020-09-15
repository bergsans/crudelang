const head = (ts) => ts[0];

function parse(tokens, body=[], node) {

  let token = tokens.length > 1
    ? tokens.shift()
    : head(tokens);

  if(token.type === 'END') {
    return node;
  } else if(token.type === 'INTEGER') {
    return parse(tokens, body, token);
  } else if(token.type === 'ASSIGN') {
    return parse(tokens);
  } else if(token.type === 'IDENTIFIER' && tokens[0].type === 'ASSIGN') {
    return parse(tokens, body.concat({
      type: 'Assignment',
      name: token.value,
      value: parse(tokens)
    }));
  } else if(token.type === 'IDENTIFIER' && token.value === 'return') {
    return parse(tokens, body.concat({
      type: 'ReturnStatement',
      value: parse(tokens)
    }));
  } else if(token.type === 'IDENTIFIER' && token.value === 'if') {
    return {
      type: 'IfStatement',
      test: parse(tokens),
      consequent: parse(tokens)
    };
  } else if(token.type === 'IDENTIFIER') {
    return parse(tokens, body, token);
  } else if(token.type === 'OPEN_SCOPE') {
    return parse(tokens, []);
  } else if(token.type === 'CLOSE_SCOPE') {
    return node;
  }
  else if(token.type === 'OPEN_PAREN') {
    return {
      type: 'Expression',
      value: parse(tokens, body, node)
    };
  } else if(token.type === 'CLOSE_PAREN') {
    return node;
  } else if(['MULT','DIV', 'PLUS', 'MINUS', 'GT'].includes(token.type)) {
    return {
      type: 'BinaryExpression',
      value: {
        left: node,
        op: token,
        right: parse(tokens)
      }
    };
  }

  if(token.type === 'EOF') {
    return node
      ?  [...body, node]
      : body;
  }
}

module.exports = {
  parse
};
