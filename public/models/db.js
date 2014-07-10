var settings = require('../settings'),
    db = require('mongodb').Db,
    Server = require('mongodb').Server;

module.exports = new db(settings.db, new Server(settings.host, 27017));
