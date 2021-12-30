const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/chat'
module.exports = function() {
    mongoose.connect(url)
        .then(() => console.log('Connected succesfully :', url))
        .catch((err) => console.err('connection failed :', err))
}