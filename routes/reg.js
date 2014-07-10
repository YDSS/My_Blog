var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../public/models/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('reg/reg', {});
});

router.post('/', function(req, res) {
  if(req.body.repeat != req.body.password) {
    req.flash('error', 'the two passwords are not equal!');
    return res.redirect('/reg');
  }
  //generate hash code for password to encrypt
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name: req.body.username, 
    password: password,
    type: 'admin'
  });

  //retieve whether username exists
  User.get(newUser.name, function(err, user) {
   if (err) {
    req.flash('error', err);
    return res.redirect('/reg');
   }
   if (user) {
    req.flash('error', 'Username already exists.');
    return res.redirect('/reg');
   } 
   //add user if username not exists
   newUser.createUser(function(err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    req.session.user = newUser;
    req.flash('success', 'register succeed');
    res.redirect('/home'); 
   });
  });
});

module.exports = router;
