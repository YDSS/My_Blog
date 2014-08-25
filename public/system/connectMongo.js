var mongoose = require('mongoose'),
    settings = require('./settings.js');

// connect to mongoDB with mongoose
var db = mongoose.createConnection();
db.open(settings.host, settings.db, settings.port, settings.options, function() {
  console.log('mongoDB connected!');
  console.log('host: ' +settings.host + ' db: ' + settings.db + ' port:' +
    settings.port );
});

db.on('error', function (err) {
  console.error.bind(console, 'connection error:');
  //listen BAE mongodb,if except throws then close the connection
  //why have to do this?Clause it'll be disconnected if it free after 30s by BAE 
  db.close();
});
//when close, reopen a connect
db.on('close', function() {
  db.open(settings.host, settings.db, settings.port, settings.options);
});

module.exports = db;
