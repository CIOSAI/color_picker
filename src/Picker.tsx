import './Picker.css';
import { HueDial } from './HueDial';

export function Picker(){

  return (
    <div className="PickerPanel">
      <HueDial></HueDial>
      <br></br>
      <input type={"button"} id="sb"></input>
    </div>
  );
}