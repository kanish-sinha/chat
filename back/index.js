var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const Msg = require('./models/messages');
require('./startup/connection')();
let users = {};
io.on('connection', socket => {
    //let userName = socket.handshake.query.userName;
    socket.on('new-user-joined', name => {
        //console.log(name)
        users[socket.id] = name;
        socket.emit('user-joined', name);
    });
    socket.on('send', async(message) => {
        let msg = new Msg({ msg: message });
        // await msg.save();
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
    })

})
server.listen(8080, {
    cors: {
        origin: '*',
    }
});