var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../public/models/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login/login', { 
    title: "YDS's blog"
  });
});

router.post('/', function(req, res) {
  var md5 =crypto.createHash('md5');  
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user) {
    debugger;
    if (!user) {
      req.flash('error', 'user not exists');
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', 'password not correct');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', 'login successed');
    res.redirect('/home');
  });
});

module.exports = router;
