# ToDoApp-Using-NodeJs-ExpressJs-MongoDB-MLab-
Using NodeJs, ExpressJs, MongoDB, MLab

//Controller


var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to a database

mongoose.connect('mongodb://<akash>:<akash>@ds149800.mlab.com:49800/todo');

//Create a Schema (this is like a blueprint of a database)

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'JavaScript'}, {item: 'AngularJs'}, {item: 'NodeJs'}, {item: 'MongoDB'}]

var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
