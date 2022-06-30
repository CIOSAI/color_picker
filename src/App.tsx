import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorBlock } from './ColorBlock';
import { ColorBlockAdder } from './ColorBlockAdder';

function App() {
  return (
    <div className="App">
      <div id="drawer">
        <ColorBlock/>
        <ColorBlockAdder/>
      </div>
    </div>
  );
}

export default App;
