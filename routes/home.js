var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/homepage', { 
    title: "YDS's blog", 
    success: req.flash('success')
  });
});

module.exports = router;
