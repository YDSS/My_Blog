var mongoose = require('mongoose'),
    settings = require('./settings.js');

// connect to mongoDB with mongoose
var db = mongoose.createConnection();

db.open(settings.host, settings.db, settings.port, settings.options, function() {
    console.log('mongoDB connected!');
    console.log('host: ' +settings.host + ' db: ' + settings.db + ' port:' +
      settings.port );
  });

module.exports = db;
