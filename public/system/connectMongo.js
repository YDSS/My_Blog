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

module.exports = db;
