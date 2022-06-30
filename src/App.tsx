import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorBlock } from './ColorBlock';
import { ColorBlockAdder } from './ColorBlockAdder';
import { Console } from 'console';

function App() {
  const handledColorBlockAdder = <ColorBlockAdder key={0} onMouseClick={()=>{addNewColorBlock()}}/>
  const [colorBlocks, setColorBlocks] = useState([handledColorBlockAdder])

  let addNewColorBlock = () => {
    setColorBlocks(colorBlocks => [
      ...colorBlocks.slice(0, colorBlocks.length-1), 
      <ColorBlock key={new Date().getTime()}/>,
      handledColorBlockAdder
    ])
  }

  return (
    <div className="App">
      <div id="drawer">
        {colorBlocks}
      </div>
    </div>
  );
}

export default App;
