const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')

app.listen(3000,function(){
  console.log("here I go!")
})

app.engine('mustache', mustache() )
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [];
var toDoneList = [];

app.get('/', function(req,res){
    res.render("home",{
      pageTitle: "Home!",
      todoList: todoList,
      toDoneList: toDoneList
    })
})

app.post('/toDo', function(req,res){
  // Grabs the field by its name from the request
  let todo = req.body.newTodo;
  todoList.push(todo)
  console.log("todo",todoList)
  res.redirect("/")
})

app.post('/toDone', function(req,res){
  let toDone = req.body.newToDone;
  toDoneList.push(toDone)
  let getMeOut = todoList.indexOf(toDone)
  todoList.splice(getMeOut,1)
  console.log("toDone", toDoneList)

  res.redirect("/")
})
