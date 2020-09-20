import React, {useState, useEffect, useRef} from 'react';
import Editor from 'react-prism-editor'

import { interpret } from '../src/lib/src/interpret.js';

import './App.css';

export default function App() {
  const canvasRef = useRef(null);
  const [once, setOnce] = useState(false);
  const [code, setCode] = useState(`print("check the dev console!");
y = 10;
x = 100;
while(y < 500) {
  x = 100;
  y = y + 105;
  while(x < 600) {
    smallerRectX = x + 5;
    smallerRectY = y + 5;
    rectangle(x, y, 100, 100, "black");
    rectangle(smallerRectX, smallerRectY, 90, 90, "red");
    x = x + 105;
  }
}
circle(360, 375, 30, "blue");
${'\n'.repeat(40)}
`);

const textCrudelang = `
 ██████╗██████╗ ██╗   ██╗██████╗ ███████╗██╗      █████╗ ███╗   ██╗ ██████╗
██╔════╝██╔══██╗██║   ██║██╔══██╗██╔════╝██║     ██╔══██╗████╗  ██║██╔════╝
██║     ██████╔╝██║   ██║██║  ██║█████╗  ██║     ███████║██╔██╗ ██║██║  ███╗
██║     ██╔══██╗██║   ██║██║  ██║██╔══╝  ██║     ██╔══██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║╚██████╔╝██████╔╝███████╗███████╗██║  ██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
`;
  const clear = () => {
    const canvas = canvasRef.current;
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F5F2F0';
    ctx.fillRect(0,0,canvas.width, canvas.height);
  };

  useEffect(() => {
    if(!once) {
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
                <div className="Button" onClick={(code) => interpret(code)}>
                  RUN <span className={'arrow'}>&#9654;</span>
                </div>
                <div className="Button" onClick={clear}>
                  CLEAR <span className={'arrow'}>&#9642;</span>
                </div>
            </header>
            <div className="EWrap">
            <Editor
              theme={'default'}
              language={'c'}
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
            width={window.innerWidth/2}
          />
        </div>
    </div>
  );
}
