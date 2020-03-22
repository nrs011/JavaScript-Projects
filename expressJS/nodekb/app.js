const express = require('express'); //bringing in a variable called express

const app = express(); //calling it here
//routes
app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('Server started on port 3000.')
});