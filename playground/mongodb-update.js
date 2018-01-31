const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

  if(err) return console.log('Unable to connect to MongoDB server');

  const db = client.db('TodoApp');
  console.log('Connected to MongoDB server');
//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID('5a717687578d22f1a563b732')
//   },
//   {
//     $set: {
//       completed: true
//     }
//   },
//   {
//     returnOriginal: false
//   }
// ).then(
//   (result) => {
//     console.log(result);
//   }
// );

db.collection('Users').findOneAndUpdate(
  {
    _id : new ObjectID('5a707a332a39002bc0b56e20')
  },
  {
    $set: {
      name: 'Sebastian'
    },
    $inc: {
      age: +1
    }
  },
  {
    returnOriginal: false
  }
)
.then(
  (result) => {
    console.log(result);
  }
);
  //db.close();
});
