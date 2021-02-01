const { sign } = require("jsonwebtoken");
var mongoose = require("mongoose")

const config = JSON.parse(require("fs").readFileSync("web/config.json"))
const uri =
    `mongodb://${config.mongodb.hostname}:${config.mongodb.port}/user`

var users = mongoose.model('user', mongoose.Schema({
    username: String,
    email: String,
    password: String
}, { versionKey: false }))

async function signUp(username, email, password){
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    const password_hash = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex")

    let res = await users.find({
        '$or': [
            {username: username},
            {email: email}
        ]
    })

    let code;
    if (res.length === 0){
        var token = sign({username: username}, config.SECRET_TOKEN, {expiresIn: '1800s'});
        await users.insertMany({
            username: username,
            email: email,
            password: password_hash
        })
        code = 800
    } else {code = (res[0].username === username ? 806 : 866)}
    mongoose.connection.close()
    return {
        code: code,
        token: token
    }
}

async function signIn(email, password){
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    const password_hash = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex")
    
    let register = await users.find({
        email: email
    })
    var code;
    if (register.length > 0){
        if(register[0].password === password_hash){
            var token = sign({
                username: register[0].username
            }, 
            config.SECRET_TOKEN,
            { expiresIn: '1800s' })
        }else { code = 403 }
    }else { code = 401 }
    
    mongoose.connection.close()
    return {
        code: code,
        token: token
    }
}


module.exports = { signUp, signIn}