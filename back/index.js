const Msg = require('./models/messages');
let ios = require('socket.io')
require('./startup/connection')();
const io = require('socket.io')(8080, {
    cors: {
        origin: '*',
    }
});
let users = {};
io.on('connection', socket => {
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