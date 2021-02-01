var express = require('express');
var user = require('./user-handler')
var path = require('path');

var app = express();

const port = 80

app.set('view engine', 'pug')
app.set('views', __dirname+'/public/views')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        user.signIn(req.body.email, req.body.passwd).then(data => {
            if (data.code !== undefined){
                res.render('login', { code: data.code })
                return
            }
            res.cookie('token', data.token)
            res.redirect('/')
        })
    })

app.route('/new')
    .get((req, res) => {
        res.render('new')
    })
    .post((req, res) => {
        user.signUp(req.body.username, req.body.email, req.body.passwd).then(data => {
            if (data.code !== 800){
                res.render('new', { code: data.code })
                return
            }
            res.cookie('token', data.token)
            res.redirect("/")
        })
    })

app.listen(port, () => {console.log("Server list1en port " + port)});