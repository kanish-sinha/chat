const userrout = require('./routs/userorut')
const express = require('express');
const app = express();
const cors = require('cors')
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
app.use(express.json());
app.use(cors());
const Msg = require('./models/messages');
const User = require('./models/user');
require('./startup/connection')();
let users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', async(name) => {
        const user = await User.findById(name)
        users[socket.id] = user.username;
        socket.emit('user-joined', name);
    });
    socket.on('send', async(message) => {
        let msg = new Msg({
            msg: message.message,
            sender: message.sender,
            reciever: message.reciever
        });
        await msg.save();
        socket.broadcast.emit('recieve', { message: message.message, name: users[socket.id] })
    })
    socket.on('active', (data) => {
        socket.emit('list', { name: users })
    })
})
app.get('/message/:sender/:receiver', async(req, res) => {
    let msgarr = [];
    let count = 0;
    let message = await Msg.find({ $or: [{ sender: req.params.sender }, { reciever: req.params.sender }] })
    for (let i = 0; i < message.length; i++) {
        if ((message[i].reciever == req.params.receiver) && (message[i].sender == req.params.sender) || (message[i].reciever == req.params.sender) && (message[i].sender == req.params.receiver)) {
            msgarr[count] = message[i];
            count++;
        }
    }
    res.json(msgarr)
})
app.get('/message/:id', async(req, res) => {
    let message = await Msg.find({ $or: [{ sender: req.params.id }, { reciever: req.params.id }] })
    res.json(message)
})
app.use('/user', userrout)
app.use('/user/:id', userrout)
server.listen(8080, {
    cors: {
        origin: '*',
    }
});