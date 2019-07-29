var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1; 
 
app.use(bodyParser.json());

app.get('/', function(req,res)
{
    
res.send('Todo API root');
});

app.get('/todos', function(req,res){
    res.json(todos);

});
// GET /todos
app.get('/todos/:id',function(req,res){

    var todoId = parseInt(req.params.id,10)  ;
    var matchedTodo = _.findWhere(todos,{id: todoId});
 
    // todos.forEach(function(todo){
    //     if( todoId === todo.id) {
    //         matchedTodo = todo;
    //     }
    // });

    if(matchedTodo) {
        res.json(matchedTodo);

    }else {
        res.status(404).send();
    }
   // res.send('Asking for todo with id of ' + req.params.id )
});
//POST /todos
app.post('/todos', function(req,res)
{
var  body = req.body;
if (!_.isBoolean(body.completed) ||!_.isString(body.description) || body.description.trim().length ===0)   {
    return res.status(400).send();
}
//add id field
body.id = todoNextId++;
// push into the array
todos.push(body);
// console.log('description:' + body.description);  

res.json(body);
});
//Delete /todos/:id

app.delete('/todos/:id', function(req,res)
{
    var todoId = parseInt(req.params.id,10) ;
    var matchedTodo = _.findWhere(todos,{id: todoId});

    if(!matchedTodo){
        res.status(404).json({"error": "no todo found with that id"});
    }else{
        todos = _.without(todos,matchedTodo);
        res.json(matchedTodo);
    }
    
 
});


    

app.listen(PORT,function ()
 
{
  
    console.log('Express listening on port' + PORT + '!');
});