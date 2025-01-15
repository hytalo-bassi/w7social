var mongoose = require("mongoose")
const config = require("./cfparser").mongodb
const uri =
    `mongodb://${config.hostname}:${config.port}/user`

var users = mongoose.model('User', mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { versionKey: false }))

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { users, mongoose }