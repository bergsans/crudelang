const head = (ts) => ts[0];

function parse(tokens, node) {
  const token = head(tokens);
  if(token.type !== 'EOF') {
    if(token.type === 'INTEGER') {
      tokens.shift();
      return parse(tokens, token );
    } else if(token.type === 'PLUS') {
      tokens.shift();
      node = {
        left: node,
        op: token,
        right: parse(tokens)
      };
      return parse(tokens, node);
    }
  } else {
    return node;
  }
}

module.exports = {
  parse
};
