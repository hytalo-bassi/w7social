const { sign } = require('jsonwebtoken')
const dbconn = require('../utils/dbconn')
const SECRET_TOKEN = require('../utils/cfparser').SECRET_TOKEN

async function signUp(username, email, password){
    const password_hash = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex")

    let res = await dbconn.users.findOne({
        '$or': [
            {username: username},
            {email: email}
        ]
    })

    let code = 800;
    let token;
    
    if (res === null){
        token = sign({username: username}, SECRET_TOKEN, {expiresIn: '1800s'});
        await dbconn.users.insertMany({
            username: username,
            email: email,
            password: password_hash
        })
    }else {code = (res.username === username ? 806 : 866)}

    return {
        code: code,
        token: token
    }
}

module.exports = { signUp }