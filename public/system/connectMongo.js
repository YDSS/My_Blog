var mongoose = require('mongoose'),
    settings = require('./settings.js');

// connect to mongoDB with mongoose
var db = mongoose.createConnection(),
    options = {
      db: { native_parser: true },
      server: { poolSize: 5 },
      user: settings.user,
      pass: settings.pass
    };
db.open(settings.host, settings.db, settings.port, options, function() {
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
  db.open(settings.host, settings.db, settings.port, options);
});

module.exports = db;
