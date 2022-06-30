import { useEffect, useState } from 'react';
import './ColorBlock.css';
import {Picker} from './Picker';

interface ColorBlockProps{
  index: string,
  initialColor?: string
}

export function ColorBlock(prop:ColorBlockProps){
  const [hexString, setHexString] = useState(prop.initialColor?prop.initialColor:"#ffffff")
  const [dropDownOffTrigger, setDropDownOffTrigger] = useState(0)
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [dialing, setDialing] = useState(false)

  let mouseClicked = (evt:globalThis.MouseEvent) =>{
    setDropDownOffTrigger(evt.timeStamp)
  }

  useEffect(()=>{
    document.addEventListener("mousedown", evt=>{mouseClicked(evt)})
  }, [])

  useEffect(()=>{
    setDropDownVisible(hovering)
  }, [dropDownOffTrigger])

  return (
    <div className="ColorBlock" 
      draggable = {!dialing}
      onDragStart = {evt => {
        evt.dataTransfer.setData("text", prop.index + " " + hexString)
        setDropDownVisible(false)
      }}
      style={{
        backgroundColor: hexString
      }}
      onMouseEnter={()=>{setHovering(true)} }
      onMouseLeave={()=>{setHovering(false)} }
    >
      <p className="hexString"
        onMouseDown={()=>{setDropDownVisible(true)}}
      >{hexString}</p>
      <div className="dropDown" 
        onMouseEnter={()=>{setDialing(true)} }
        onMouseLeave={()=>{setDialing(false)} }
        style={{display: dropDownVisible?"block":"none"}}>
        <Picker initialColor={prop.initialColor} onColorChanged={(hex:string)=>{setHexString(hex)}}/>
      </div>
    </div>
  );
}