const express = require('express'); //bringing in a variable called express
const path = require('path');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
//Connect to database
mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser:true, useUnifiedTopology: true});
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

//Bring in Models
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

//Get Single Article
app.get('/article/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('article', {
            article: article
        });
    });
});

//Add Route
app.get('/articles/add', function (req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//Add Submit POST Route
app.post('/articles/add', function (req, res) {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        res.redirect('/');
    }
    });
});
//Load Edit Form
app.get('/article/edit/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
});

//Start Server
app.listen(3000, function () {
    console.log('Server started on port 3000.', 'http://localhost:3000')
});