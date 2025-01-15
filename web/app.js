var express = require('express');
var user = require('./user-handler')
var path = require('path');

var app = express();

const port = 3000

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
        require('./api/signIn').signIn(req.body.username, req.body.passwd).then(data => {
            if(data.code !== undefined){
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
    // .post((req, res) => {
    //     user.signUp(req.body.username, req.body.email, req.body.passwd).then(data => {
    //         if (data.code !== 800){
    //             res.render('new', { code: data.code })
    //             return
    //         }
    //         res.cookie('token', data.token)
    //         res.redirect("/")
    //     })
    // })
    .post((req, res) => {
        const body = req.body
        require('./api/signUp').signUp(body.username, body.email, body.passwd).then(data => {
            if (data.code !== 800){
                res.render('new', { code: data.code })
                return
            }
            
            res.cookie('token', data.token)
            res.redirect('/')
        })
    })

app.use('/settings', require('./api/auth/auth').authenticateToken, (req, res) => {
    res.render('settings')
})

app.get('/api/getDetails/:username', (req, res) => {
    require('./api/getDetails').getDetails(req.params.username).then(details => {
        res.json(details)
    })
})

app.post('/api/signin', (req, res) => {
    require('./api/signIn').signIn(req.body.username, req.body.passwd).then(token => {
        res.json(token)
    })
})

app.listen(port, () => {console.log("Server list1en port " + port)});
