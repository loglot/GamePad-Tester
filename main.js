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
var connected = false
let gamepad = [];

function tick(){
    draw.resizeCanvasForWindowSize(canvas, ctx)
    ctx.rect(0,0,10000,10000)
    ctx.fillStyle="rgb(167,199,216)"
    ctx.fill()
    var x = 2514/2
    var y = 1377/2
    var r = 70
    var rChange=7
    var dist=150
    var activeRSub = 20        
    if(gamepad[0]!=null){
        connected = true            
    } else { 
        connected = false
    }

    var buttons=controllerCheck("buttons")

    if (navigator.getGamepads) {gamepad = navigator.getGamepads(); connected = true}
    else if (navigator.webkitGetGamepads) gamepads = navigator.webkitGetGamepads();
    draw.Rect(2514/2+300-10,(1377/2+500)-1010,120,1020,"#33363f")
    draw.Rect(2514/2-300-10-100,(1377/2+500)-1010,120,1020,"#33363f")
    if(gamepad[0]!=null){
        var xSet=Math.abs(gamepad[0].axes[0])+Math.abs(gamepad[0].axes[1])>=.1 ? gamepad[0].axes[0]*dist+x :0+x
        var ySet=Math.abs(gamepad[0].axes[0])+Math.abs(gamepad[0].axes[1])>=.1 ? gamepad[0].axes[1]*dist+y :0+y
        draw.Circle(xSet,ySet,r+rChange-activeRSub,"#33363f")
        var color = "#afafbf"
        if(gamepad[0].buttons[10].pressed){
            color = "#7f7fcf"
        }
        draw.Circle(xSet,ySet,r-activeRSub,color)


        var xSet=Math.abs(gamepad[0].axes[2])+Math.abs(gamepad[0].axes[3])>=.1 ? gamepad[0].axes[2]*dist+x :0+x
        var ySet=Math.abs(gamepad[0].axes[2])+Math.abs(gamepad[0].axes[3])>=.1 ? gamepad[0].axes[3]*dist+y :0+y
        draw.Circle(xSet,ySet,r+rChange-activeRSub,"#33363f")
        var color = "#bfafaf"
        if(gamepad[0].buttons[11].pressed){
            color = "#cf7f7f"
        }
        draw.Circle(xSet,ySet,r-activeRSub,color)

        draw.Rect(2514/2+300,(1377/2+500)-gamepad[0].buttons[7].value*1000,100,gamepad[0].buttons[7].value*1000, `rgb(${gamepad[0].buttons[7].value*100+155},155,155)`)


        draw.Rect(2514/2-300-100,(1377/2+500)-gamepad[0].buttons[6].value*1000,100,gamepad[0].buttons[6].value*1000, `rgb(${gamepad[0].buttons[6].value*100+155},155,155)`)

            gamepad[0].vibrationActuator.playEffect("trigger-rumble", {
                startDelay: 0,
                duration: 200,
                weakMagnitude: gamepad[0].buttons[7].value,
                strongMagnitude: gamepad[0].buttons[6].value,
              });
    
        
    }
    draw.Circle(x,y,r+rChange,"#33363f")
    draw.Circle(x,y,r,"#afbfaf")

    requestAnimationFrame(tick)
}

function controllerCheck(type="axes", num=0){
    if(connected){
        if(type=="axes"){
            var axesArray = []
            for(let i = 0; i < 4; i++){
                axesArray[i] = gamepad[0].axes[i]
            }
            return(axesArray)

        }
        if(type=="buttons"){
            var buttonArray = []
            for(let i = 0; i <= 15; i++){
                buttonArray[i]=gamepad[0].buttons[i].pressed
            }
            return(buttonArray)
        }
    } else {
        if(type=="axes"){
            return([0,0,0,0])
        }
        if(type=="buttons"){
            var buttonArray = []
            for(let i = 0; i <= 15; i++){
                buttonArray[i]=false
                
            }
            return(buttonArray)
        }

    }
}
requestAnimationFrame(tick)