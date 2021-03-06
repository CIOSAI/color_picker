import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorBlock } from './ColorBlock';
import { ColorBlockAdder } from './ColorBlockAdder';

function App() {
  const handledColorBlockAdder = <ColorBlockAdder key={0} onMouseClick={(s)=>{addNewColorBlock(s)}}/>
  const [colorBlocks, setColorBlocks] = useState([handledColorBlockAdder])
  const [colorHexStrings, setColorHexStrings] = useState([["", ""]])
  const [trashcanDropHover, setTrashcanDropHover] = useState(false)
  
  const removeColorBlock = (index:number) => {
    setColorBlocks(colorBlocks => [
               ...colorBlocks.slice(0, index),
               ...colorBlocks.slice(index + 1)
             ]);
  }

  let addHexString = (arr:string[][], i:string, s:string):string[][] => {
    let keys = arr.map(v=>v[0])
    return keys.find(v=>v==i)?
      arr.map((v)=>{
        if(v[0]==i){
          return [i, s]
        }else{
          return v
        }
      }):
      [...arr, [i, s]].sort((a, b)=>Number(a[0])-Number(b[0]) )
  }

  let deleteHexString = (arr:string[][], i:string):string[][] => {
    let del = arr.map(v=>v[0]).indexOf(i)
    return [...arr.slice(0, del), ...arr.slice(del+1)]
  }

  let switchColorBlock = (ti:string, tc:string, si:string, sc:string)=>{
    // console.log(colorBlocks.findIndex((v:JSX.Element)=>v.props.index==ti))
    // removeColorBlock(colorBlocks.findIndex((v:JSX.Element)=>v.props.index==ti))
    // removeColorBlock(colorBlocks.findIndex((v:JSX.Element)=>v.props.index==si))
  }

  let addNewColorBlock = (s:string) => {
    setColorBlocks(colorBlocks => [
      ...colorBlocks.slice(0, colorBlocks.length-1), 
      <ColorBlock 
        onSwitched={(ti, tc, si, sc)=>{switchColorBlock(ti, tc, si, sc)}}
        onHexChanged={(i, s)=>{setColorHexStrings(colorHexStrings => 
          [...addHexString(colorHexStrings, i, s)]
        )}}
        initialColor={s} 
        index={new Date().getTime().toString()} 
        key={new Date().getTime()}
      />,
      handledColorBlockAdder
    ].sort((a, b)=>a.props.index-b.props.index))
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
          let data = evt.dataTransfer.getData("text").split(" ")[0]
          removeColorBlock(colorBlocks.findIndex((v:JSX.Element)=>v.props.index==data))
          setColorHexStrings(deleteHexString(colorHexStrings, data))
          setTrashcanDropHover(false)
        }}
      >
        <p>Delete Color</p>
      </div>
      <p>{
      "["+
      colorHexStrings.map((v, i, arr)=>{
        return v[1]
      }).reduce((prev, curr)=>
        prev+(curr.includes("#")?"'"+curr+"', ":""), "")
      +"]"
      }</p>
      <a href={'https://github.com/CIOSAI/color_picker'}>How to Use/Source Code</a>
    </div>
  );
}

export default App;
