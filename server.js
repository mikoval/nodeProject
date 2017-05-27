var express = require('express');

var app = express();
var port = process.env.PORT || 8080;


var server = app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.ejs', { title: 'Hey', message: 'Hello there!' })
})
app.get('/draw/:room', function (req, res) {
  res.render('draw.ejs')
})
app.get('/minesweeper', function (req, res) {
  res.render('minesweeper.ejs')
})
app.get('/tic-tac-toe-ai', function (req, res) {
  res.render('tic-tac-toe-ai.ejs')
})
app.get('/tic-tac-toe/:room', function (req, res) {
  res.render('tic-tac-toe.ejs')
})

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);
var rooms = {};

function newConnection(socket){
    var arr= socket.handshake.headers.referer.split("/")
    var room = arr.pop();
    var type = arr.pop();
    console.log("new connection : "  + socket.id + " joined room: " + room );
    socket.join(room)
    //console.log(io.sockets.adapter.rooms[room].sockets.length); 
    socket.on('drawMouse', drawMouseMsg);
    socket.on('drawText', drawTextMsg);
    socket.on("tttMove", tttMove)
    //socket.on('tttMove', tttMove);
    if(type == "tic-tac-toe"){
      TTT(room)
    }
    

    function drawMouseMsg(data){
        socket.broadcast.to(room).emit('drawMouse', data);
    }
    function drawTextMsg(data){
        console.log("got message")
        socket.broadcast.to(room).emit('drawText', data);
    }
    function tttMove(data){
      var x = data.x;
      var y = data.y;

      var game = rooms[room];
      var turn = game.turn;
      if("" + game[turn] == "" + socket.id){
        if(game.grid[x][y] == "_"){
          if(turn == "p1"){
            rooms[room].grid[x][y] = "X"
            rooms[room].turn = "p2"
          }
          else{
            rooms[room].grid[x][y] = "O"
            rooms[room].turn = "p1";
          }
        }
      }

      var turn = rooms[room].turn;
      var grid = rooms[room].grid
      var complete = tttComplete(grid);
      if(complete){
        var val = CheckState(grid);
        if ( val > 0){io.to(room).emit("tttComplete", {status: "O wins"});}
        else if ( val < 0){io.to(room).emit("tttComplete", {status: "X wins"});}
        else{ {io.to(room).emit("tttComplete", {status: "Tie Game"});}}
        io.to(room).emit("tttUpdate", rooms[room]);
      }
      else{
        io.to(room).emit("tttUpdate", rooms[room]);
        io.to(rooms[room][turn]).emit("tttTurn");
      }
      


    }


 
}
function createGrid(width, height){
    var arr = []
    for(var i = 0; i < width; i++)
    {   
        arr.push([])
        for(var j = 0; j < height; j++){
            arr[i].push("_");
        }
    }
    return arr;
}

function TTT(room){
  var players = Object.keys(io.sockets.adapter.rooms[room].sockets);  
  var count = players.length;
  if(count == 2 && rooms[room] == undefined){
    console.log("creating game")

    rooms[room] = {turn: "p1" , grid: createGrid(3,3), status: "ready", p1: players[0], p2: players[1]}
    var turn = rooms[room].turn;
    
    io.to(room).emit("tttUpdate", rooms[room]);
    io.to(rooms[room][turn]).emit("tttTurn");
  } 
  else if (count >= 2){
    io.to(room).emit("tttUpdate", rooms[room]);
  }
  else{
    io.to(room).emit("tttUpdate", {status:"not ready"});
  }
}
function tttComplete(grid){

  
    if(CheckState(grid) != 0){return true;}
    if(CheckState(grid) == 0 && getMoves(grid).length == 0){return true;}
    return false; 

}
function CheckState(grid){
    // check wins
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "O"){ match = false;}
        }
        if(match == true){return 10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){

        if(grid[x][x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "O"){ match = false;}
    }
    if(match == true){return 10}
    
    // check losses
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[x][y] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    for(var x = 0; x < grid.length; x++){
        match = true;
        for(y = 0; y < grid[0].length; y++){
            if(grid[y][x] != "X"){ match = false;}
        }
        if(match == true){return -10}
    }
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    
    match = true;
    for(var x = 0; x < grid.length; x++){
        if(grid[x][grid.length -1 - x] != "X"){ match = false;}
    }
    if(match == true){return -10}
    
    return 0;
}   
function getMoves(grid){
    var moves = []
    for(var x  = 0; x < grid.length; x++){
        for(var y = 0; y < grid[0].length; y++){
            if(grid[x][y] == "_"){ moves.push({x: x, y: y})}
        }
    }
    return moves;
}