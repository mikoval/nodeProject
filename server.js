var express = require('express');

var app = express();
var port = process.env.PORT || 8080;


var server = app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

app.use(express.static("public"));
console.log("node js server");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log("new connection : "  + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        console.log(data);
        socket.broadcast.emit('mouse', data);
    }
}