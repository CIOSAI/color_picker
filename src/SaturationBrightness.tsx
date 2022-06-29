import React, { MouseEvent } from "react";
import { useRef, useEffect, useState } from "react";
import { hsvToRgb, getColorString } from "./ColorConversion";

interface SatBriProps{
  hue: number
  onValueChanged(saturation: number, brightness: number): void
}

export function SatBri(prop:SatBriProps){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasSize = 90
  const cursorSize = 0.15 * canvasSize
  const cursorWidth = 0.1 * canvasSize
  const [rawX, setRawX] = useState(0)
  const [rawY, setRawY] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [brightness, setBrightness] = useState(0)
  const [dialing, setDialing] = useState(false)
  const dialingRef = useRef<boolean | null>(null); dialingRef.current = dialing

  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)

  let draw = (ctx:CanvasRenderingContext2D, s:number) =>{
    ctx.clearRect(0, 0, s, s)

    let density = 0.02
    for(let x=0; x<1; x+=density){
      for(let y=0; y<1; y+=density){
        ctx.fillStyle = getColorString(hsvToRgb(prop.hue, x, (1-y) ))
        ctx.fillRect(Math.floor(x*s), Math.floor(y*s), Math.ceil(density*s), Math.ceil(density*s) )
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", evt=>{updateRawCoord(evt)})
    document.addEventListener("mouseup", evt=>{setDialingState(false, evt as any)})
    if(canvasRef.current){
      let rect = canvasRef.current.getBoundingClientRect()
      setLeft(rect.left); setTop(rect.top)
    }
  }, [])

  useEffect(() => {
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d')
      if (context) draw(context, canvasSize)
    }
  }, [prop.hue, saturation, brightness])

  let setDialingState = (b:boolean, evt:MouseEvent) => {
    if(evt.button==0){
      setDialing(b)
    }
  }

  let updateRawCoord = (evt:globalThis.MouseEvent) => {
    setRawX(evt.clientX); setRawY(evt.clientY)
  }

  let clamp = (val:number, min:number, max:number) => Math.max(Math.min(val, max), min)

  useEffect(() => {
    console.log(left)
    if(dialingRef.current){
      let [x, y] = [(rawX-left)/canvasSize, (rawY-top)/canvasSize]
      setSaturation( clamp(x, 0, 1) )
      setBrightness( clamp(y, 0, 1) )
      prop.onValueChanged(saturation, (1-brightness))
    }
  }, [rawX, rawY])

  let adjust = cursorSize/2+cursorWidth
  let cursorX = saturation*canvasSize-adjust
  let cursorY = brightness*canvasSize-adjust
  return (
    <div id="sb">
      <canvas 
        ref={canvasRef} 
        id="SatBri"
        width={canvasSize} height={canvasSize} 
        onMouseDown={evt=>{setDialingState(true, evt)}}
      />
      <div 
        id="cursor" 
        style={{
          width:       cursorSize,
          height:      cursorSize,
          borderWidth: cursorWidth,
          left:        left-cursorWidth+cursorX, 
          top:         cursorY
        }}
      />
    </div>
  );
}