const express = require('express'); //bringing in a variable called express
const path = require('path');
const mongoose = require('mongoose');
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

//Add Route
app.get('/articles/add', function (req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//Start Server
app.listen(3000, function () {
    console.log('Server started on port 3000.', 'http://localhost:3000')
});