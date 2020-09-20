import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-prism-editor';

import { interpret } from './lib/src/interpret.js';
import { exampleCode } from './code-example.js';
import { textCrudelang } from './text-crudelang.js';

import './App.css';

export default function App() {
  const canvasRef = useRef(null);
  const [once, setOnce] = useState(false);
  const [code, setCode] = useState(exampleCode);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F5F2F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!once) {
      interpret(code);
      setOnce(true);
    }
  }, [once, code]);

  return (
    <div className="App">
      <div className="Editor">
        <header className="Header">
          <div className="Logo">
            <pre>{textCrudelang}</pre>
          </div>
          <div className="Button" onClick={() => interpret(code)}>
            RUN
            {' '}
            <span className="arrow">&#9654;</span>
          </div>
          <div className="Button" onClick={clear}>
            CLEAR
            {' '}
            <span className="arrow">&#9642;</span>
          </div>
        </header>
        <div className="EWrap">
          <Editor
            theme="default"
            language="c"
            code={code}
            lineNumber={true}
            changeCode={(code) => setCode(code)}
          />
        </div>
      </div>
      <div className="Output">
        <canvas
          ref={canvasRef}
          id="output"
          height={window.innerHeight}
          width={(window.innerWidth / 2)}
        />
      </div>
    </div>
  );
}
