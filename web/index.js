var express = require('express');
var mongoose = require("mongoose")
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

app.get('/login', (req, res) => {
    res.render('login')
})

app.route('/new')
    .get((req, res) => {
        res.render('new')
    })
    .post((req, res) => {
        res.render('new', { code: 860 })
    })

app.listen(port, () => {console.log("Server listen port " + port)});
