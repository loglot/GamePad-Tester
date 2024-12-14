var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")


import { DrawUtils } from "./drawUtils.js"

window.addEventListener("gamepadconnected", function() {
    console.log("Gamepad Connected");
  })
  window.addEventListener("gamepaddisconnected", function() {
      console.log("Gamepad Disconnected");
    })
var draw = new DrawUtils()

function tick(){
    ctx.rect(0,0,10000,10000)
    ctx.fillStyle="rgb(167,199,216)"
    ctx.fill()
    var x = 500
    var y = 300
    var r = 20
    let gamepad = [];
    if (navigator.getGamepads) gamepad = navigator.getGamepads();
    else if (navigator.webkitGetGamepads) gamepads = navigator.webkitGetGamepads();
    if(gamepad[0]!=null){
        var xSet=Math.abs(gamepad[0].axes[0])>=.1 ? gamepad[0].axes[0]*100+x :0+x
        var ySet=Math.abs(gamepad[0].axes[1])>=.1 ? gamepad[0].axes[1]*100+y :0+y
        draw.Circle(xSet,ySet,r+4,"#33363f")
        draw.Circle(xSet,ySet,r,"#afafbf")


        var xSet=Math.abs(gamepad[0].axes[2])>=.1 ? gamepad[0].axes[2]*100+x :0+x
        var ySet=Math.abs(gamepad[0].axes[3])>=.1 ? gamepad[0].axes[3]*100+y :0+y
        draw.Circle(xSet,ySet,r+4,"#33363f")
        draw.Circle(xSet,ySet,r,"#bfafaf")
    
    }
    draw.Circle(x,y,r+4,"#33363f")
    draw.Circle(x,y,r,"#afbfaf")
    draw.resizeCanvasForWindowSize(canvas, ctx)

    requestAnimationFrame(tick)
}
requestAnimationFrame(tick)