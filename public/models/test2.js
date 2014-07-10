var mongoose = require('mongoose');
var db = exports.Db = mongoose.createConnection();
var options = {
          db: { native_parser: true },
                server: { poolSize: 5 },
                user: 'iGneBgGPE9viIkYXyofSNVGg',
                pass: 'iA03AjqitekUv4HHcbytXVnYeiboOh6h'
              }
    var isDev = false;
    var host = isDev ? 'localhost' : 'mongo.duapp.com';
    var port = isDev ? '27017' : '8908';
    var database = isDev ? 'foo' : 'dVaYeHzOatfiEYtMUZbP';
    var user = isDev ? 'foo' : 'iGneBgGPE9viIkYXyofSNVGg';
    var pass = isDev ? 'bar' : 'iA03AjqitekUv4HHcbytXVnYeiboOh6h';
        db.open(host, database, port, options, function(err) {
          debugger;
          console.log('sucess!!!!!!!!!!!!!!');
        });
                db.on('error', function (err) {
                  logger.error("connect error :" + err);
                  db.close();
                });
                db.on('close', function () {
                logger.info("connect close retry connect ");
        });
