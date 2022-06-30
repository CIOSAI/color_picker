import React from "react";

interface PlusSymbolProps {
  hovering: boolean
}

function PlusSymbol(prop:PlusSymbolProps) {
  return (
    <svg className="plusSymbol"
      xmlns="http://www.w3.org/2000/svg"
      width={prop.hovering?"40":"30"}
      height={prop.hovering?"40":"30"}
      version="1.1"
      viewBox="0 0 26.458 26.458"
    >
      <g>
        <path
          fill={prop.hovering?"#222":"#666"}
          fillOpacity="1"
          stroke="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M7.938 0H18.52v7.938h7.937V18.52h-7.937v7.937H7.938v-7.937H0V7.938h7.938z"
        ></path>
      </g>
    </svg>
  );
}

export default PlusSymbol;