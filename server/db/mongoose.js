var mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://admin:admin123@ds123258.mlab.com:23258/todoapp-api';
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
