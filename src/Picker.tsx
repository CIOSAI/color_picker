import { useState } from 'react';
import './Picker.css';
import { HueDial } from './HueDial';
import { SatBri } from './SaturationBrightness';

export function Picker(){
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [brightness, setBrightness] = useState(0)

  return (
    <div className="PickerPanel">
      <HueDial onHueChanged={hue => {setHue(hue)}}></HueDial>
      <br></br>
      <SatBri hue={hue/(Math.PI*2)} onValueChanged={(sat, bri)=>{setSaturation(sat); setBrightness(bri)}}></SatBri>
    </div>
  );
}