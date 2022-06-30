import { useEffect, useState } from 'react';
import './Picker.css';
import { HueDial } from './HueDial';
import { SatBri } from './SaturationBrightness';
import { hsvToRgb, rgbToHex, hexToRgb, rgbToHsv } from './ColorConversion';

interface PickerProps{
  onColorChanged(hex:string):void,
  initialColor?:string
}

export function Picker(prop:PickerProps){
  let initialHue = 0
  let initialSat = 0
  let initialBri = 1
  if(prop.initialColor){
    let [r, g, b] = hexToRgb(prop.initialColor)
    let [h, s, v] = rgbToHsv(r, g, b)
    initialHue = h*Math.PI*2; initialSat = s; initialBri = v
  }
  const [hue, setHue] = useState(initialHue)
  const [saturation, setSaturation] = useState(initialSat)
  const [brightness, setBrightness] = useState(initialBri)

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