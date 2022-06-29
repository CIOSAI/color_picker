import { useEffect, useState } from 'react';
import './ColorBlock.css';
import {Picker} from './Picker';

export function ColorBlock(){
  const [hexString, setHexString] = useState("#ffffff")
  const [dropDownOffTrigger, setDropDownOffTrigger] = useState(0)
  const [dropDownVisible, setDropDownVisible] = useState(true)
  const [hovering, setHovering] = useState(false)

  let mouseClicked = (evt:globalThis.MouseEvent) =>{
    setDropDownOffTrigger(evt.timeStamp)
  }

  useEffect(()=>{
    setDropDownVisible(false)
    document.addEventListener("mousedown", evt=>{mouseClicked(evt)})
  }, [])

  useEffect(()=>{
    setDropDownVisible(hovering)
  }, [dropDownOffTrigger])

  return (
    <div className="ColorBlock" 
      style={{
        backgroundColor: hexString
      }}
      onMouseEnter={()=>{setHovering(true)} }
      onMouseLeave={()=>{setHovering(false)} }
    >
      <p className="hexString"
        onMouseDown={()=>{setDropDownVisible(true)}}
      >{hexString}</p>
      <div className="dropDown" style={{display: dropDownVisible?"block":"none"}}>
        <Picker onColorChanged={(hex:string)=>{setHexString(hex)}}/>
      </div>
    </div>
  );
}