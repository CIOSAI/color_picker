import { useEffect, useState } from 'react';
import './Picker.css';
import { HueDial } from './HueDial';
import { SatBri } from './SaturationBrightness';
import { hsvToRgb, rgbToHex } from './ColorConversion';

interface PickerProps{
  onColorChanged(hex:string):void
}

export function Picker(prop:PickerProps){
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [brightness, setBrightness] = useState(0)

  let hueNormalized = () => hue/(Math.PI*2)
//  style={
//   {backgroundColor: getColorString(hslToRgb(hueNormalized(), saturation, brightness))}
// }
  useEffect(()=>{
    let [r, g, b] = hsvToRgb(hueNormalized(), saturation, brightness)
    let hex = rgbToHex(Math.round(r), Math.round(g), Math.round(b))

    prop.onColorChanged(hex)
  }, [hue, saturation, brightness])

  return (
    <div className="PickerPanel">
      <HueDial 
        onHueChanged={hue => {setHue(hue)}}
      />
      <br/>
      <SatBri 
        hue={hueNormalized()} 
        onValueChanged={(sat, bri)=>{setSaturation(sat); setBrightness(bri)}}
      />
    </div>
  );
}