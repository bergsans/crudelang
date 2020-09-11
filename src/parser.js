const head = (ts) => ts[0];



function parse(tokens, node) {
  const token = head(tokens);
  if(token.type !== 'EOF') {
    if(token.type === 'OPEN_PAREN') {
      tokens.shift();
      return parse(tokens);
    } else if(token.type === 'CLOSE_PAREN') {
      tokens.shift();
      return node;
    }
    else if(token.type === 'INTEGER') {
      tokens.shift();
      return parse(tokens, token );
    } else if(token.type === 'PLUS') {
      tokens.shift();
      return parse(tokens, {
        left: node,
        op: token,
        right: parse(tokens)
      });
    }
  } else {
    return node;
  }
}

module.exports = {
  parse
};
