const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
//
// var id = '5a73ea62bf3e7c10d0284d1aa';
//
// if(!ObjectID.isValid(id)){
//    console.log('ID is not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos:',todos);
// });
//
// Todo.findOne({ _id: id}).then( (todo) => {
//   console.log('Todo', todo);
// });

//
// Todo.findById(id).then( (todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((err) => console.log(err));


var id = '5a7187a72e09f616487d8e68';

User.findById(id).then(
  (user) => {
    if(!user){
      return console.log('User was not found!');
    }
    console.log('User', user);
  }
).catch((err) => console.log(err));
