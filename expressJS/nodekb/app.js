const express = require('express'); //bringing in a variable called express
const path = require('path');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
//const { check, validationResult } = require('express-validator/check');
const  expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const  passport = require('passport');
const config = require('./config/database');
//Connect to database
mongoose.connect(config.database, {useNewUrlParser:true, useUnifiedTopology: true});
let db = mongoose.connection;

//Check connection
db.once('open', function () {
    console.log('Connected to MongoDB.')
});

//Check for DB errors
db.on('error', function () {
    console.log(err);
});

//Init App
const app = express(); //calling it here

// Bring in Models
let Article = require('./models/article');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
//Passport config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

//Home Route
app.get('/', function (req, res) {
    Article.find({}, function(err, articles) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
    /*let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Nimesh Silva',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Nimesh Silva',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article Three',
            author: 'Nimesh Silva',
            body: 'This is article three'
        },
    ];*/
});

//Route Files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users);


//Start Server
app.listen(3000, function () {
    console.log('Server started on port 3000.', 'http://localhost:3000')
});