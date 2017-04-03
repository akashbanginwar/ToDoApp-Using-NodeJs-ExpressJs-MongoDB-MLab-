var express = require('express');
var todoController = require('./controllers/todoController')
var app = express();


//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(8000);
console.log('you are on port 8000');
