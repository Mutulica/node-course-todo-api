require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {autenticate} = require('./middleware/autenticate.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', autenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then(
    (doc) => {
      res.send(doc);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', autenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  },
  (err) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', autenticate, (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findOne({ _id: id, _creator: req.user._id})
  .then(
    (todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.status(200).send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', autenticate, (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send({error: "Id is not valid"});
  }
  Todo.findOneAndRemove({_id: id, _creator: req.user._id}).then((todo) => {
    if(!todo) {
      return res.status(404).send({error: 'Id was not found!'});
    }
    res.status(200).send({todo});
  }).catch((err) => res.status(400).send(err));
});

app.patch('/todos/:id', autenticate,(req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send({error: 'Not a valid ID'});
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, { new: true})
  .then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  })
  .catch((err) => res.status(200).send());
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
   return  user.generateAuthToken();
 }).then((token) => {
   res.header('x-auth', token).send(user);
 }).catch((err) => res.status(400).send(err));
});

app.get('/users/me', autenticate,(req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var email = req.body.email;
  var pass = req.body.password;

  User.findByCredentials(email, pass).then((user) => {
    return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
     });
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.delete('/users/me/token', autenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch((err) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
