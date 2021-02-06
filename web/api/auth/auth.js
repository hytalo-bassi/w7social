var { verify } = require("jsonwebtoken")

const SECRET_TOKEN = JSON.parse(require('fs').readFileSync('web/config.json')).SECRET_TOKEN

function authenticateToken(req, res, next) {
    console.log(req.headers)
    const token = req.headers.cookie.split('token=')[1]
    if (token === '') return res.sendStatus(401)
  
    verify(token, SECRET_TOKEN, (err, data) => {
      if (err) return res.sendStatus(403)
      next()
    })
}
module.exports = { authenticateToken }