'use strict';

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

var scaleX = 0;
var scaleY = 0;
export class DrawUtils {
    
    Bean(x, y, width, height, color) {

        ctx.beginPath();
        ctx.arc(x - 10, (y + 10) - (height / 2), width / 2 +5, 0, ( Math.PI/180 ) * 180, ( Math.PI/180 ) * 180,  false);
        ctx.fillStyle = "rgba(0, 0, 0, .2)";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x - 10, (y + (height - (width / 2)) + 10) - (height / 2), width / 2 +5, 0, Math.PI, false);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect((x - 15) - (width / 2), y - (height / 2) + 10, width + 10 , height - width / 2 );
        ctx.fill();
        ctx.closePath();    


        ctx.beginPath();
        ctx.rect((x - 5) - (width / 2) , (y - 5) - (height / 2), width + 10 , height - width / 2 + 10);
        ctx.fillStyle = "#33363f";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x, (y + (height - (width / 2))) - (height / 2) , width / 2 + 5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x, y - (height / 2), width / 2 +5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        // Draw inside color of bean

        ctx.beginPath();
        ctx.rect(x - (width / 2), y - (height / 2), width, height - width / 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x, (y + (height - (width / 2))) - (height / 2), width / 2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x, y - (height / 2), width / 2, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
        
    }

    
    Text(text, x, y, strokeColor = 'black', fillColor = 'white', Ctx = ctx, size = 80) {
        Ctx.font = `${size}px Sans-serif`;
        Ctx.strokeStyle = strokeColor;
        Ctx.lineWidth = 8;
        Ctx.lineJoin="miter";
        Ctx.miterLimit=2;
        Ctx.strokeText(text, x, y);
        Ctx.fillStyle = fillColor;
        Ctx.fillText(text, x, y);

    }

    Line(x1, y1, x2, y2, color, width = 20, outline = true, oColor = "black", weight = 5, drawTime = ctx, cap = "round") {
        if(outline) {
            drawTime.beginPath();
            drawTime.moveTo(x1, y1);
            drawTime.lineTo(x2, y2);
            drawTime.lineWidth = width + weight
            drawTime.strokeStyle = oColor;
            drawTime.lineCap = "round";
            drawTime.stroke();
        }
        drawTime.beginPath();
        drawTime.moveTo(x1, y1);
        drawTime.lineTo(x2, y2);
        drawTime.lineWidth = width
        drawTime.strokeStyle = color;
        drawTime.lineCap = "round";
        drawTime.stroke();

    }
 
    Circle(x, y, rad, color = "rgba(255, 0, 0, .5)", CTX = ctx) {
        CTX.beginPath();
        //ctx.arc()
        CTX.arc(x, y, rad, 0, 2 * Math.PI);
        CTX.fillStyle = color;
        CTX.fill();
        CTX.closePath();
        //this.Text("orb", 100, 100)
    }

    Rect(x = 0, y = 0, width = 0, height = 0, color = "#000000", drawingTool = ctx) {
        drawingTool.beginPath();
        drawingTool.rect(x, y, width, height) 
        drawingTool.fillStyle = color;
        drawingTool.fill()
        drawingTool.closePath();
    }


    originalWidth = canvas.width;
    originalHeight = canvas.height;
    resizeCanvasForWindowSize(canvas, ctx) {
        var currentWidth = canvas.width;
        var currentHeight = canvas.height;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var desiredWidth = windowWidth-50;
        var aspectRatio = this.originalWidth / this.originalHeight;
        var desiredHeight = desiredWidth / aspectRatio;
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        scaleX = (desiredWidth / this.originalWidth);
        scaleY = (desiredHeight / this.originalHeight);

        ctx.setTransform(scaleY, 0, 0, scaleX, 0, 0)

        currentWidth = canvas.width;
        currentHeight = canvas.height;
        if (currentHeight >= windowHeight-50) {
            desiredHeight = windowHeight-50;
            aspectRatio = this.originalWidth / this.originalHeight;
            desiredWidth = desiredHeight * aspectRatio;
            canvas.width = desiredWidth;
            this.width = desiredWidth
            this.height = desiredHeight
            canvas.height = desiredHeight;
            scaleX = (desiredWidth / this.originalWidth);
            scaleY = (desiredHeight / this.originalHeight);
            ctx.setTransform(scaleY, 0, 0, scaleX, 0, 0)        
        }
    }

}