const mongoose = require('mongoose');
const config = require('config')
let url = config.get('data');
module.exports = function() {
    mongoose.connect(url)
        .then(() => console.log('Connected succesfully :', url))
        .catch((err) => console.err('connection failed :', err))
}