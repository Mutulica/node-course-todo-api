const {SHA256} = require('crypto-js');
//Jason web token used for autentication
const jwt = require('jsonwebtoken');


var data = {
  id: 5
};
var token = jwt.sign(data, 'abc123');
console.log(token);


var decoded = jwt.verify(token, 'abc123');
console.log('Decoded', decoded);
//Using raw SHA encription
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.hash)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(token.hash === resultHash){
//   console.log('Data was not changed');
// }else{
//   console.log('Data was changed');
// }
