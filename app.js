var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./public/system/settings');
var flash = require('connect-flash');
var Db = require('./public/system/connectMongo');

//routers
var index = require('./routes/index');
var home = require('./routes/home');
var users = require('./routes/users');
var reg = require('./routes/reg');
var blog = require('./routes/blog'); 
var login = require('./routes/login');
var logout = require('./routes/logout');
var news = require('./routes/news');
var community = require('./routes/community');
var mark = require('./routes/marked');

var app = express();

// view engine setup
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.locals.pretty = true; //output pretty html

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname,'/sea-modules'));
app.use(session({
  secret: settings.cookieSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port,
    username: settings.user,
    password: settings.pass
  }),
  cookie: { maxAge: 60000 }
}));
app.use(flash());

//view support,dynamicHelper
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.error = req.flash('error'); 
  res.locals.succ = req.flash('success');
  next();
});

app.use('/', index);
app.use('/home', home);
app.use('/users', users);
app.use('/reg', reg);
app.use('/blog', blog);
app.use('/login', login);
app.use('/logout', logout);
app.use('/news', news);
app.use('/community', community);
app.use('/marked', mark);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// server
var server = app.listen(18080, function() {

  console.log('server is online with port 18080...');

  Db.on('error', function (err) {
    console.error.bind(console, 'connection error:');
    //listen BAE mongodb,if except throws then close the connection
    //why have to do this?Clause it'll be disconnected if it free after 30s by BAE 
    Db.close();
  });

  //when close, reopen a connect
  Db.on('close', function() {
    Db.open(settings.host, settings.db, settings.port, settings.options);
  });

});

module.exports = app;
