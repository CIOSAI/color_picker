import { useEffect, useState } from 'react';
import './ColorBlock.css';
import PlusSymbol from './PlusSymbol';

export function ColorBlockAdder(){
  return (
    <div className="ColorBlockAdder">
      <PlusSymbol/>
    </div>
  );
}