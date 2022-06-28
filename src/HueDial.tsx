import React, { MouseEvent } from "react";
import { useRef, useEffect, useState } from "react";
import { hslToRgb } from "./ColorConversion";

interface HueDialProps{
  onHueChanged(hue: number): void;
}

export function HueDial(prop:HueDialProps){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasSize = 90
  const [hue, setHue] = useState(0)
  const [dialing, setDialing] = useState(false)

  let getColorString = (arr:number[]) => {
    let colorString = "rgb("
    colorString += arr[0]; colorString += ', '
    colorString += arr[1]; colorString += ', '
    colorString += arr[2];
    colorString += ")"
    return colorString
  }

  let draw = (ctx:CanvasRenderingContext2D, s:number) =>{
    ctx.clearRect(0, 0, s, s)

    let gradient = ctx.createConicGradient(-Math.PI/2, s/2, s/2)
    for(let i=0; i<1; i+=0.05){
      gradient.addColorStop(i, getColorString(hslToRgb(i, 1, 0.5)))
    }
    ctx.strokeStyle = gradient
    ctx.lineWidth = s*0.15
    ctx.beginPath()
    ctx.arc(s/2, s/2, s*0.3, 0, Math.PI*2)
    ctx.stroke()

    let angle = hue-Math.PI/2
    ctx.strokeStyle = getColorString(hslToRgb(hue/(Math.PI*2), 1, 0.5))
    ctx.lineWidth = s*0.15
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(s/2+Math.cos(angle)*s*0.2, s/2+Math.sin(angle)*s*0.2)
    ctx.lineTo(s/2+Math.cos(angle)*s*0.4, s/2+Math.sin(angle)*s*0.4)
    ctx.stroke()
  }

  useEffect(() => {
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d')
      if (context) draw(context, canvasSize)
    }
  }, [hue])

  let setDialingState = (b:boolean, evt:MouseEvent) => {
    if(evt.button===0){
      setDialing(b)
    }
  }

  let dial = (evt:MouseEvent) => {
    if(!dialing) return
    let rect = evt.currentTarget.getBoundingClientRect()
    let [x, y] = [(evt.clientX-rect.x)/canvasSize, (evt.clientY-rect.y)/canvasSize]
    setHue( -Math.atan2(x-0.5, y-0.5)+Math.PI )
    prop.onHueChanged(hue)
  }

  return (
    <canvas ref={canvasRef} id="hueDial" 
    width={canvasSize} height={canvasSize} 
    onMouseDown={evt=>{setDialingState(true, evt)}}
    onMouseUp={evt=>{setDialingState(false, evt)}}
    onMouseMove={evt=>{dial(evt)}}
    ></canvas>
  );
}