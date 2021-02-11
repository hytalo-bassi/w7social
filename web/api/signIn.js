const { sign } = require("jsonwebtoken");
const dbconn = require('../utils/dbconn')
const SECRET_TOKEN = require('../utils/cfparser').SECRET_TOKEN

async function signIn(username, password){
    const password_hash = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex")
    
    let register = await dbconn.users.findOne({username: username})
    var code;
    var token;

    if (register !== null){
        if(register.password === password_hash){
            token = sign({username: username}, SECRET_TOKEN, { expiresIn: '1800s' })
        }else { code = 403 }
    }else { code = 401 }

    return {
        code: code,
        token: token
    }
}

module.exports = { signIn }