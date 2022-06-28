import React, { MouseEvent } from "react";
import { useRef, useEffect, useState } from "react";
import { hslToRgb, getColorString } from "./ColorConversion";

interface SatBriProps{
  hue: number
  onValueChanged(saturation: number, brightness: number): void
}

export function SatBri(prop:SatBriProps){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasSize = 90
  const [saturation, setSaturation] = useState(0)
  const [brightness, setBrightness] = useState(0)
  const [dialing, setDialing] = useState(false)

  let draw = (ctx:CanvasRenderingContext2D, s:number) =>{
    ctx.clearRect(0, 0, s, s)

    let density = 0.02
    for(let x=0; x<1; x+=density){
      for(let y=0; y<1; y+=density){
        ctx.fillStyle = getColorString(hslToRgb(prop.hue, x, (1-x/2)*(1-y) ))
        ctx.fillRect(Math.floor(x*s), Math.floor(y*s), Math.ceil(density*s), Math.ceil(density*s) )
      }
    }

    ctx.strokeStyle = "#cecece"
    ctx.lineWidth = s*0.1
    ctx.beginPath()
    ctx.ellipse(saturation*s, brightness*s, s*0.1, s*0.1,
    0, 0, Math.PI*2)
    ctx.stroke()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = s*0.07
    ctx.beginPath()
    ctx.ellipse(saturation*s, brightness*s, s*0.1, s*0.1,
    0, 0, Math.PI*2)
    ctx.stroke()
  }

  useEffect(() => {
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d')
      if (context) draw(context, canvasSize)
    }
  }, [prop.hue, saturation, brightness])

  let setDialingState = (b:boolean, evt:MouseEvent) => {
    if(evt.button===0){
      setDialing(b)
    }
  }

  let dial = (evt:MouseEvent) => {
    if(!dialing) return
    let rect = evt.currentTarget.getBoundingClientRect()
    let [x, y] = [(evt.clientX-rect.x)/canvasSize, (evt.clientY-rect.y)/canvasSize]
    setSaturation( x )
    setBrightness( y )
    prop.onValueChanged(saturation, brightness)
  }

  return (
    <canvas ref={canvasRef} id="SatBri" 
    width={canvasSize} height={canvasSize} 
    onMouseDown={evt=>{setDialingState(true, evt)}}
    onMouseUp={evt=>{setDialingState(false, evt)}}
    onMouseMove={evt=>{dial(evt)}}
    ></canvas>
  );
}