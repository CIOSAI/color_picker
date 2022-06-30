import { useEffect, useState } from 'react';
import './ColorBlock.css';
import PlusSymbol from './PlusSymbol';

interface ColorBlockAdderProps {
  onMouseClick(): void
}

export function ColorBlockAdder(prop:ColorBlockAdderProps){
  const [hovering, setHovering] = useState(false)

  return (
    <div className="ColorBlockAdder"
      onMouseEnter={()=>{setHovering(true)}}
      onMouseLeave={()=>{setHovering(false)}}
      onMouseDown={()=>{prop.onMouseClick()}}
    >
      <PlusSymbol hovering={hovering}/>
    </div>
  );
}