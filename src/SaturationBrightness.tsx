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

    ctx.fillRect(0, 0, s, s)
    let brightGradient = ctx.createLinearGradient(0, 0, 0, s)
    for(let i=0; i<1; i+=0.02){
      brightGradient.addColorStop(i, getColorString(hslToRgb(prop.hue, 0, i), 1))
    }
    ctx.fillStyle = brightGradient
    ctx.fillRect(0, 0, s, s)

    ctx.globalCompositeOperation = "destination-in"

    let saturationGradient = ctx.createLinearGradient(0, 0, s, 0)
    for(let i=0; i<1; i+=0.02){
      saturationGradient.addColorStop(i, getColorString(hslToRgb(prop.hue, i, 1-i/2), 1))
    }
    ctx.fillStyle = saturationGradient

    ctx.globalCompositeOperation = "source-over";

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