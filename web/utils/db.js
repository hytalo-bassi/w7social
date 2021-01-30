const {MongoClient} = require("mongodb")

const config = JSON.parse(require("fs").readFileSync("web/config.json")).mongodb

class Database{
    constructor(hostname = config.hostname, port = config.port, database = config.database){
        const uri = 
            `mongodb://${hostname}:${port}/?poolSize=20&writeConcern=majority`

        var client = new MongoClient(uri,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        var db = client.db(database)

        this.client = client
        this.db = db
    }
    
    find(query, coll = 'user'){
        this.client.connect()

        var register = this.db.collection(coll)
        return register.find(query)
    }

    close(){
        this.client.close()
    }
}

var db = new Database()
db.find({username: 'hytalo-bassi'})
db.close()