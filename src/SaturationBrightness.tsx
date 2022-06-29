import React, { MouseEvent } from "react";
import { useRef, useEffect, useState } from "react";
import { hslToRgb, getColorString } from "./ColorConversion";
import $ from "jquery";
import "jqueryui";

interface SatBriProps{
  hue: number
  onValueChanged(saturation: number, brightness: number): void
}

export function SatBri(prop:SatBriProps){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasSize = 90
  const [rectX, setRectX] = useState(0)
  const [rectY, setRectY] = useState(0)
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
      let rect = canvasRef.current.getBoundingClientRect()
      setRectX(rect.x)
      setRectY(rect.y)
    }
  }, [prop.hue, saturation, brightness])

  let setDialingState = (b:boolean, evt:MouseEvent) => {
    if(evt.button===0){
      setDialing(b)
    }
  }

  let clamp = (val:number, min:number, max:number) => Math.max(Math.min(val, max), min)
  let dial = (evt:MouseEvent) => {
    if(!dialing) return
    let [x, y] = [clamp((evt.clientX-rectX)/canvasSize, 0, 1), clamp((evt.clientY-rectY)/canvasSize, 0, 1)]
    setSaturation( x )
    setBrightness( y )
    console.log("hewwo")
    prop.onValueChanged(saturation, (1-x/2)*(1-brightness))
  }

  $("#cursor").draggable({containment: "#SatBri", drag: ()=>{console.log("bruh")}})
  return (
    <div id="sb">
    <canvas ref={canvasRef} id="SatBri" 
    width={canvasSize} height={canvasSize} 
    ></canvas>
    <div id="cursor" draggable={true} onDrag={evt=>{dial(evt)}}></div>
    </div>
  );

  // use document.getElementById('id').innerHTML = 'text' to change text in a paragraph, for example.

// var slider = {
  
//   get_position: function() {
//     var marker_pos = $('#marker').position();
//     var left_pos = marker_pos.left + slider.marker_size / 2;
//     var top_pos = marker_pos.top + slider.marker_size / 2;
    
//     slider.position = {
//       left: left_pos,
//       top: top_pos,
//       x: Math.round(slider.round_factor.x * (left_pos * slider.xmax / slider.width)) / slider.round_factor.x,
//       y: Math.round((slider.round_factor.y * (slider.height - top_pos) * slider.ymax / slider.height)) / slider.round_factor.y,
//     };

//   },
  
//   display_position: function() {
//     document.getElementById("coord").innerHTML = 'x: ' + slider.position.x.toString() + '<br> y: ' + slider.position.y.toString();
//   },
  
//   draw: function(x_size, y_size, xmax, ymax, marker_size, round_to) {
    
//     if ((x_size === undefined) && (y_size === undefined) && (xmax === undefined) && (ymax === undefined) && (marker_size === undefined) && (round_to === undefined)) {
//       x_size = 150;
//       y_size = 150;
//       xmax = 1;
//       ymax = 1;
//       marker_size = 20;
//       round_to = 2;
//     };
    
//     slider.marker_size = marker_size;
//     slider.height = y_size;
//     slider.width = x_size;
//     slider.xmax = xmax;
//     slider.ymax = ymax;
//     round_to = Math.pow(10, round_to);
//     slider.round_factor = {
//       x: round_to,
//       y: round_to,
//     };
    
//     $("#markerbounds").css({
//       "width": (x_size + marker_size).toString() + 'px',
//       "height": (y_size + marker_size).toString() + 'px',
//     });
//     $("#box").css({
//       "width": x_size.toString() + 'px',
//       "height": y_size.toString() + 'px',
//       "top": marker_size / 2,
//       "left": marker_size / 2,
//     });
//     $("#marker").css({
//       "width": marker_size.toString() + 'px',
//       "height": marker_size.toString() + 'px',
//     });

//     $("#coord").css({
//       "top": x_size + marker_size / 2
//     });
    
//     $("#widget").css({
//       "width": (x_size + marker_size).toString() + 'px',
//     });
    
//     slider.get_position();
//     slider.display_position();
    
//   },
  
// };

// $("#marker").draggable({ 
//   containment: "#markerbounds",
//   drag: function() {
//     slider.get_position();
//     slider.display_position();
//   },
// });

// //syntax for rendering is:
// //  slider.render(width, height, width-range, height-range, marker size, output decimal places)

// slider.draw(150,150,1,1,20,2);

// // check to make sure the defaults work:
// //slider.draw();
}