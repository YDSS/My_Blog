var mongoose = require('mongoose'),
    Blog = require('./blog'),
    settings = require('../settings');
debugger;
var url = 'mongodb://' + settings.user + ':'+ settings.pass + '@' +
          settings.host + ':' + settings.port + '/' + settings.db;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connect success');

});
