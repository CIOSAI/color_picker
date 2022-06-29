import { useState } from 'react';
import './ColorBlock.css';
import {Picker} from './Picker';

export function ColorBlock(){
  const [hexString, setHexString] = useState("#000000")

  return (
    <div className="ColorBlock" style={
      {backgroundColor: hexString}
    }>
      <p className="hexString">{hexString}</p>
      <Picker onColorChanged={(hex:string)=>{setHexString(hex)}}/>
    </div>
  );
}