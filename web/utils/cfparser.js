const config = JSON.parse(require("fs").readFileSync("web/config.json"))

var mongodb = config.mongodb
var SECRET_TOKEN = config.SECRET_TOKEN

module.exports = { mongodb, SECRET_TOKEN }