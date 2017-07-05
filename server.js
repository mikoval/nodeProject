var express = require('express');
var ttt = require('./tttUtility.js');
var connect4 = require('./Connect4Utility.js');
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
app.get('/connect-4-ai', function (req, res) {
  res.render('connect-4-ai.ejs')
})
app.get('/connect-4/:room', function (req, res) {
  res.render('connect-4.ejs')
})
app.get('/fluid', function (req, res) {
  res.render('fluid.ejs')
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
    socket.on('text', textMsg);
    socket.on("tttMove", tttMove)
    socket.on("tttRestart", tttRestart)
    socket.on("Connect4Move", Connect4Move)
    socket.on("Connect4Restart", Connect4Restart)
    //socket.on('tttMove', tttMove);
    if(type == "tic-tac-toe"){
      TTT(room);
    }
    if(type == "connect-4"){
      Connect4(room);
    }
    
    //drawing handlers
    function drawMouseMsg(data){
        socket.broadcast.to(room).emit('drawMouse', data);
    }
    function textMsg(data){
        console.log("got message")
        socket.broadcast.to(room).emit('text', data);
    }
    // drawing complete
    // ttt handlers
    function tttRestart(data){
      rooms[room].grid = createGrid(3,3);
      var sturn;
      var rand = Math.floor(Math.random()*2);
      if(rand == 0){sturn = "p1"}
      else{sturn = "p2"}
      rooms[room].turn = sturn;
      turn = rooms[room].turn
      io.to(room).emit("tttUpdate", rooms[room]);
      io.to(rooms[room][turn]).emit("tttTurn");
    }
    function tttMove(data){
      var x = data.x;
      var y = data.y;

      var game = rooms[room];
      var turn = game.turn;
      if(ttt.complete(game.grid)){return;}
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
      io.to(room).emit("tttUpdate", rooms[room]);
      var complete = ttt.complete(grid);
      if(complete){
        var val = ttt.checkState(grid);
        if ( val > 0){io.to(room).emit("tttComplete", {status: "O wins"});}
        else if ( val < 0){io.to(room).emit("tttComplete", {status: "X wins"});}
        else{ {io.to(room).emit("tttComplete", {status: "Tie Game"});}}
        
      }
      else{
        io.to(room).emit("tttUpdate", rooms[room]);
        io.to(rooms[room][turn]).emit("tttTurn");
      }
      


    }
    // TTT Complete
    // connect4 handlers
    function Connect4Restart(data){
      rooms[room].grid = createGrid(7,6);
      var sturn;
      var rand = Math.floor(Math.random()*2.0);

      if(rand == 0){sturn = "p1"}
      else{sturn = "p2"}
      console.log(rooms[room].turn+ " " + sturn);
      rooms[room].turn = sturn;
      var turn = rooms[room].turn
      io.to(room).emit("Connect4Update", rooms[room]);
      io.to(rooms[room][turn]).emit("Connect4Turn");
    }
    function Connect4Move(data){
      var move = data.move;

      var game = rooms[room];
      var turn = game.turn;
      if(connect4.complete(game.grid)){return;}
      if("" + game[turn] == "" + socket.id){
        if(game.grid[move][0] == "_"){
          if(turn == "p1"){
            connect4.makeMove(rooms[room].grid, move, turn)
            rooms[room].turn = "p2"
          }
          else{
            connect4.makeMove(rooms[room].grid, move, turn)
            rooms[room].turn = "p1";
          }
        }
      }

      var turn = rooms[room].turn;
      var grid = rooms[room].grid;


      io.to(room).emit("Connect4Update", rooms[room]);
      var complete = connect4.complete(grid);
      if(complete){
        var val = connect4.gameValue(grid);
        console.log(val);
        if ( val > 0){io.to(room).emit("Connect4Complete", {status: "Red wins"});}
        else if ( val < 0){io.to(room).emit("Connect4Complete", {status: "Black wins"});}
        else{ {io.to(room).emit("Connect4Complete", {status: "Tie Game"});}}
        
      }
      else{
        io.to(room).emit("Connect4Update", rooms[room]);
        io.to(rooms[room][turn]).emit("Connect4Turn");
      }
      


    }

    //connect 4 complete
 
}


//tic-tac-toe utility
function TTT(room) {

    var players = Object.keys(io.sockets.adapter.rooms[room].sockets);  
    var count = players.length;
    if(count == 2 && rooms[room] == undefined){
      console.log("creating game")
      var sturn;
      var rand = Math.floor(Math.random()*2);
      if(rand == 0){sturn = "p1"}
      else{sturn = "p2"}
      rooms[room] = {turn: sturn , grid: createGrid(3,3), status: "ready", p1: players[0], p2: players[1]}
      var turn = rooms[room].turn;
      
      io.to(room).emit("tttUpdate", rooms[room]);
      io.to(rooms[room][turn]).emit("tttTurn");
    } 
    else if (count == 2){
        var p1  = false;
        var p2 = false;
        game = rooms[room];
        if(players[0] ==  game.p1|| players[1] == game.p1){p1 = true}
        if(players[0] ==  game.p2|| players[1] == game.p2){p2 = true}
        if(!p1 && !p2){
          rooms[room].p1 = players[0];
          rooms[room].p2 = players[1];
        }
        else if (p1 && !p2){
          if(players[0] == game.p1){
            game.p2 = players[1]
          }
          else{
            game.p2 = players[0];
          }
        }
        else if (!p1 && p2){
          if(players[0] == game.p2){
            game.p1 = players[1]
          }
          else{
            game.p1 = players[0];
          }
        }
        var turn = rooms[room].turn;
      
        io.to(room).emit("tttUpdate", rooms[room]);
        io.to(rooms[room][turn]).emit("tttTurn");
    }
    else if (count > 2){
      io.to(room).emit("tttUpdate", rooms[room]);
      var turn = rooms[room].turn;
      io.to(rooms[room][turn]).emit("tttTurn");
    }
    else{
      io.to(room).emit("tttUpdate", {status:"not ready"});
    }
  
  }
//connect-4 utility
function Connect4(room) {
    console.log('here');
    var players = Object.keys(io.sockets.adapter.rooms[room].sockets);  
    var count = players.length;
    if(count == 2 && rooms[room] == undefined){
      console.log("creating game")
      var sturn;
      var rand = Math.floor(Math.random()*2);
      if(rand == 0){sturn = "p1"}
      else{sturn = "p2"}
      rooms[room] = {turn: sturn , grid: createGrid(7,6), status: "ready", p1: players[0], p2: players[1]}
      var turn = rooms[room].turn;
      
      io.to(room).emit("Connect4Update", rooms[room]);
      io.to(rooms[room][turn]).emit("Connect4Turn");
    } 
    else if (count == 2){
        var p1  = false;
        var p2 = false;
        game = rooms[room];
        if(players[0] ==  game.p1|| players[1] == game.p1){p1 = true}
        if(players[0] ==  game.p2|| players[1] == game.p2){p2 = true}
        if(!p1 && !p2){
          rooms[room].p1 = players[0];
          rooms[room].p2 = players[1];
        }
        else if (p1 && !p2){
          if(players[0] == game.p1){
            game.p2 = players[1]
          }
          else{
            game.p2 = players[0];
          }
        }
        else if (!p1 && p2){
          if(players[0] == game.p2){
            game.p1 = players[1]
          }
          else{
            game.p1 = players[0];
          }
        }
        var turn = rooms[room].turn;
      
        io.to(room).emit("Connect4Update", rooms[room]);
        io.to(rooms[room][turn]).emit("Connect4Turn");
    }
    else if (count > 2){
      io.to(room).emit("Connect4Update", rooms[room]);
      var turn = rooms[room].turn;
      io.to(rooms[room][turn]).emit("Connect4Turn");
    }
    else{
      io.to(room).emit("Connect4Update", {status:"not ready"});
    }
  
  }
//create grid
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
