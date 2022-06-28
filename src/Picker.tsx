import './Picker.css';
import { HueDial } from './HueDial';

export function Picker(){


  return (
    <div className="PickerPanel">
      <HueDial onHueChanged={hue => {console.log(hue)}}></HueDial>
      <br></br>
      <input type={"button"} id="sb"></input>
    </div>
  );
}