var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db_name = 'dVaYeHzOatfiEYtMUZbP';
var db_host =  'mongo.duapp.com';
var db_port =  '8908';  
var username = 'iGneBgGPE9viIkYXyofSNVGg';
var password = 'iA03AjqitekUv4HHcbytXVnYeiboOh6h';
 
var db = new Db(db_name, new Server(db_host, db_port, {}), {w: 1});
debugger;
db.open(function(err, db) {
  debugger;
  db.authenticate(username, password, function(err, result) { 
    if (err) {
      db.close();
      res.end('Authenticate failed!');
      return;   
    }
    res.end('success!');
    //db.collection('test_insert', test); 
  });  
});
