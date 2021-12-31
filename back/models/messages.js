const mongoose = require('mongoose');
const User = require('./user');
const msgSchema = new mongoose.Schema({
    msg: {
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Msg = mongoose.model('message', msgSchema)
module.exports = Msg;