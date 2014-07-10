var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  req.session.user = null;
  req.flash('success', 'logout sucessed');
  res.redirect('/home');
});

module.exports = router;
