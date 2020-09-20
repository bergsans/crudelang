export function parse(tokens, body = [], node) {
  const token = tokens.length > 1
    ? tokens.shift()
    : tokens[0];

  if (token.type === 'EOF') {
    return {
      type: 'Scope',
      body: body.length > 0 ? [...body] : body,
    };
  } if (token.type === 'OPEN_PAREN') {
    if (body.length > 0 && ['PrintStatement', 'CircleStatement', 'RectangleStatement'].includes(body[body.length - 1].type)) {
      const args = [];
      while (tokens[0].type !== 'CLOSE_PAREN') {
        if (tokens[0].type !== 'ARG_SEP') {
          args.push(tokens[0]);
        }
        tokens.shift();
      }
      tokens.shift();
      tokens.shift();
      body[body.length - 1].args = args;
      return parse(tokens, body, node);
    }
  } if (token.type === 'OPEN_SCOPE') {
    if (body.length > 0 && body[body.length - 1].type === 'IfStatement') {
      body[body.length - 1].consequent = {
        type: 'Scope',
        body: parse(tokens),
      };
      return parse(tokens, body);
    } if (body.length > 0 && body[body.length - 1].type === 'While') {
      body[body.length - 1].consequent = {
        type: 'Scope',
        body: parse(tokens),
      };
      return parse(tokens, body);
    }
    return parse(tokens, body, node);
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
  } if (token.type === 'IDENTIFIER' && token.value === 'circle') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'CircleStatement',
    })));
  } if (token.type === 'IDENTIFIER' && token.value === 'print') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'PrintStatement',
    })));
  } if (token.type === 'IDENTIFIER' && token.value === 'rectangle') {
    return parse(tokens, parse(tokens, body.concat({
      type: 'RectangleStatement',
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
  } if (['MULT', 'DIV', 'PLUS', 'MINUS', 'GT', 'LT', 'EQUALS'].includes(token.type)) {
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

