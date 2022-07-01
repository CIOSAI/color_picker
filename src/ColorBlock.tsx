import { useEffect, useState } from 'react';
import './ColorBlock.css';
import {Picker} from './Picker';
import {hexToRgb} from './ColorConversion';

interface ColorBlockProps{
  index: string,
  initialColor?: string,
  onHexChanged(i:string, s:string): void
  onSwitched(ti:string, tc:string, si:string, sc:string): void
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

  useEffect(()=>{
    prop.onHexChanged(prop.index, hexString)
    console.log()
  }, [hexString])

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

      onDragEnter={()=>{setHovering(true)}}
      onDragLeave={()=>{setHovering(false)}}
      onDragOver={evt=>{
        evt.preventDefault()
      }}
      onDrop={evt=>{
        evt.preventDefault()
        let data = evt.dataTransfer.getData("text").split(" ")
        prop.onSwitched(prop.index, hexString, data[0], data[1])
        setHovering(false)
      }}
    >
      <p className="hexString"
        onMouseDown={()=>{setDropDownVisible(true)}}
        style={
          {color: (hexToRgb(hexString).reduce((prev, curr)=>prev+curr, 0)/3)>128?
            "#000":"#fff"}
        }
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