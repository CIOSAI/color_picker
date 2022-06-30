import { useEffect, useState } from 'react';
import './ColorBlock.css';
import PlusSymbol from './PlusSymbol';

interface ColorBlockAdderProps {
  onMouseClick(s:string): void
}

export function ColorBlockAdder(prop:ColorBlockAdderProps){
  const [hovering, setHovering] = useState(false)

  return (
    <div className="ColorBlockAdder"
      onMouseEnter={()=>{setHovering(true)}}
      onMouseLeave={()=>{setHovering(false)}}
      onMouseDown={()=>{prop.onMouseClick("#ffffff")}}

      onDragEnter={()=>{setHovering(true)}}
      onDragLeave={()=>{setHovering(false)}}
      // style={{
      //   color: trashcanDropHover?"#222":"#aaa",
      //   border: trashcanDropHover?"#222":"#aaa"
      // }}
      onDragOver={evt=>{
        evt.preventDefault()
      }}
      onDrop={evt=>{
        evt.preventDefault()
        let data = evt.dataTransfer.getData("text").split(" ")[1]
        prop.onMouseClick(data)
        setHovering(false)
      }}
    >
      <PlusSymbol hovering={hovering}/>
    </div>
  );
}