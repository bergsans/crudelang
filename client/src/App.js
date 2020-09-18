import React, {useState, useEffect} from 'react';
import Editor from 'react-prism-editor'

import './App.css';

export default function App() {
  const [code, setCode] = useState(`
x = 0;
while(x < 10) {
  print(x);
  x = x + 1;
}
    ${'\n'.repeat(20)}`);
  return (
    <div className="App">
        <div className="Editor">
          <Editor
            theme={'default'}
            language={'c'}
            code={code}
            lineNumber={true}
            changeCode={code => setCode(code)}
          />
        </div>
        <div className="Output">
          <canvas id="output" />
        </div>
    </div>
  );
}
