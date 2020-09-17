const head = (ts) => ts[0];

function parse(tokens, body = [], node) {
  const token = tokens.length > 1
    ? tokens.shift()
    : head(tokens);

  if (token.type === 'EOF') {
    return body;
  } if (token.type === 'OPEN_SCOPE') {
    if (body.length > 0 && body[body.length - 1].type === 'IfStatement') {
      body[body.length - 1].consequent = parse(tokens);
      return parse(tokens, body);
    } if (body.length > 0 && body[body.length - 1].type === 'While') {
      body[body.length - 1].consequent = parse(tokens);
      return parse(tokens, body);
    }
    return parse(tokens, body.concat({
      type: 'Scope',
      body: parse(tokens),
    }));
  } if (token.type === 'CLOSE_SCOPE') {
    return body;
  } if (token.type === 'END') {
    return node;
  } if (token.type === 'INTEGER') {
    return parse(tokens, body, token);
  } if (token.type === 'STRING') {
    return parse(tokens, body, token);
  } if (token.type === 'ASSIGN') {
    return parse(tokens);
  } if (token.type === 'IDENTIFIER' && tokens[0].type === 'ASSIGN') {
    return parse(tokens, body.concat({
      type: 'Assignment',
      name: token.value,
      value: parse(tokens),
    }));
  } if (token.type === 'IDENTIFIER' && token.value === 'return') {
    return parse(tokens, body.concat({
      type: 'ReturnStatement',
      value: parse(tokens),
    }));
  } if (token.type === 'IDENTIFIER' && token.value === 'if') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'IfStatement',
      test: parse(tokens),
    })));
  } if (token.type === 'IDENTIFIER' && token.value === 'print') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'PrintStatement',
      msg: parse(tokens),
    })));
  } if (token.type === 'IDENTIFIER' && token.value === 'while') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'While',
      test: parse(tokens),
    })));
  } if (token.type === 'IDENTIFIER') {
    return parse(tokens, body, token);
  } if (token.type === 'OPEN_PAREN') {
    return {
      type: 'Expression',
      value: parse(tokens, body, node),
    };
  } if (token.type === 'CLOSE_PAREN') {
    return node;
  } if (['MULT', 'DIV', 'PLUS', 'MINUS', 'GT', 'LT'].includes(token.type)) {
    return {
      type: 'BinaryExpression',
      value: {
        left: node,
        op: token,
        right: parse(tokens),
      },
    };
  }
}

module.exports = {
  parse,
};
