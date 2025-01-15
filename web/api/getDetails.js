var mongoose = require("mongoose")

const config = JSON.parse(require("fs").readFileSync("web/config.json"))
const uri =
    `mongodb://${config.mongodb.hostname}:${config.mongodb.port}/user`

const model = mongoose.model('users', mongoose.Schema({
    username: String,
    details: Object
}))

async function getDetails(username){
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    
    let res = {};

    await model.findOne({username: username}).then(data => {
        if ( data !== null ) {
            res = data.details
        }
    })

    mongoose.connection.close()
    return res
}
module.exports = { getDetails }