const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  if(err) return console.log('Unable to connect to MongoDB server');

  const db = client.db('TodoApp');
  console.log('Connected to MongoDB server');

  //delete many
  // db.collection('Todos').deleteMany({text : "Someting to do"}).then((result) => {
  //   console.log(result);
  // })

 //deleteOne
 // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
 //   console.log(result);
 // });

 //findOneAndDelete
 // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
 //   console.log(result);
 // });

// db.collection('Users').findOneAndDelete({_id: new ObjectID('5a7088e729b4413f3cc549f9')}).then((result) => {
//   console.log(result);
// });

db.collection('Users').deleteMany({name: 'Sebastian'}).then((result) => {
  console.log(result);
});
 //db.close();
});
