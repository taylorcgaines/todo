const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express')
var models = require("./models")

app.listen(3000, function() {
  console.log("here I go!")
})

app.engine('mustache', mustache())
app.set('view engine', 'mustache');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  models.toDos.findAll({
    where: {
      done: false
    }
  }).then(function(notdone) {
    models.toDos.findAll({
        where: {
          done: true
        }
      })
      .then(function(done) {
        res.render("home", {
          notdone: notdone,
          done: done
        })
      })
  })
})

app.post('/toDo', function(req, res) {
  const todo = models.toDos.build({
    task: req.body.newTodo,
    done: false
  })
  todo.save().then(function() {
    res.redirect("/")
  })
})

app.post('/toDone', function(req, res) {
  models.toDos.findOne({
    where:{
      id: parseInt(req.body.newToDone)
    }
  })
  .then(function(foundItem){
      foundItem.done = true;
      foundItem.save()
    })
    res.redirect("/")
  })
