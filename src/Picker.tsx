import { useState } from 'react';
import './Picker.css';
import { HueDial } from './HueDial';
import { SatBri } from './SaturationBrightness';
import { hsvToRgb, getColorString } from './ColorConversion';

export function Picker(){
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [brightness, setBrightness] = useState(0)

  let hueNormalized = () => hue/(Math.PI*2)
//  style={
//   {backgroundColor: getColorString(hslToRgb(hueNormalized(), saturation, brightness))}
// }
  return (
    <div className="PickerPanel" style={
      {backgroundColor: getColorString(hsvToRgb(hueNormalized(), saturation, brightness))}
    }>
      <HueDial onHueChanged={hue => {setHue(hue)}}></HueDial>
      <br></br>
      <SatBri hue={hueNormalized()} onValueChanged={(sat, bri)=>{setSaturation(sat); setBrightness(bri)}}></SatBri>
    </div>
  );
}