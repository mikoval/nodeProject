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
  res.render('draw.ejs', { title: 'Hey', message: 'Drawing!' })
})


var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);
var rooms = {};

function newConnection(socket){
    var room = socket.handshake.headers.referer.split("/").pop()
    console.log("new connection : "  + socket.id + " joined room: " + room );

    socket.join(room)
    socket.on('mouse', mouseMsg);
    socket.on('text', textMsg);
    //console.log(io.sockets.adapter.rooms[room].sockets);   
    function mouseMsg(data){
        socket.broadcast.to(room).emit('mouse', data);
    }
    function textMsg(data){
        console.log("got message")
        socket.broadcast.to(room).emit('text', data);
    }
}