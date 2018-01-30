const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  if(err) return console.log('Unable to connect to MongoDB server');

  const db = client.db('TodoApp');
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //     _id: new ObjectID('5a707821a41e23303042daff')
  //   }).toArray().then(
  //     (docs) => {
  //     console.log('todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('unable to print docs', err);
  //   }
  // );

  // db.collection('Todos').find().count().then(
  //   (count) => {
  //     console.log(`Todos count: ${count}`);
  //   },
  //   (err) => {
  //     console.log('unable to print docs', err);
  //   }
  // );
  db.collection('Users')
    .find(
      {
        name: 'Sebastian'
      }
    ).toArray()
    .then(
      (docs) => {
        console.log(`Users (${docs.length})`);
        console.log(JSON.stringify(docs, undefined, 2));
      },
      (err) => {
        console.log('Unable to find', err);
      }
    );
});
