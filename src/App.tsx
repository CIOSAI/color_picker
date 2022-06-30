import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorBlock } from './ColorBlock';
import { ColorBlockAdder } from './ColorBlockAdder';

function App() {
  const handledColorBlockAdder = <ColorBlockAdder key={0} onMouseClick={()=>{addNewColorBlock()}}/>
  const [colorBlocks, setColorBlocks] = useState([handledColorBlockAdder])
  const [trashcanDropHover, setTrashcanDropHover] = useState(false)
  
  const removeColorBlock = (index:number) => {
    setColorBlocks(colorBlocks => [
               ...colorBlocks.slice(0, index),
               ...colorBlocks.slice(index + 1)
             ]);
  }

  let addNewColorBlock = () => {
    setColorBlocks(colorBlocks => [
      ...colorBlocks.slice(0, colorBlocks.length-1), 
      <ColorBlock index={new Date().getTime().toString()} key={new Date().getTime()}/>,
      handledColorBlockAdder
    ])
  }

  return (
    <div className="App">
      <div id="drawer">
        {colorBlocks}
      </div>
      <div id="colorTrashcan" 
        onDragEnter={()=>{setTrashcanDropHover(true)}}
        onDragLeave={()=>{setTrashcanDropHover(false)}}
        style={{
          color: trashcanDropHover?"#222":"#aaa",
          border: trashcanDropHover?"#222":"#aaa"
        }}
        onDragOver={evt=>{
          evt.preventDefault()
        }}
        onDrop={evt=>{
          evt.preventDefault()
          let data = evt.dataTransfer.getData("text")
          removeColorBlock(colorBlocks.findIndex((v:JSX.Element)=>v.props.index==data))
          setTrashcanDropHover(false)
        }}
      >
        <p>Delete Color</p>
      </div>
    </div>
  );
}

export default App;
