var socket;

var drawing = false;
function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');
  background(51);
  socket = io()
  socket.on('drawMouse', newDrawing);
  socket.on('drawText', newText);
}


function newDrawing(data){
    noStroke();
    fill(data.color.r, data.color.g, data.color.b, data.transparancy);
    ellipse(data.x, data.y, data.radius, data.radius);

}
function mousePressed() {
  drawing = true;
}
function mouseReleased(){
    drawing = false;
}
function draw() {
    if(drawing){
        var color = "#" + document.getElementById("color-picker").value 
        color = hexToRgb(color);
        transparancy = parseInt(document.getElementById("transparency-picker").value );
        fill(color.r, color.g, color.b, transparancy);
        noStroke();
        var radius = parseInt(document.getElementById("radius-picker").value);

        ellipse(mouseX, mouseY, radius, radius)
        var data = {
            x:mouseX,
            y:mouseY, 
            radius:radius,
            color:color,
            transparancy:transparancy

        }
        socket.emit('drawMouse', data);
    }
    
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
