var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res) {
  res.render('index/index', { 
    title: "YDS's Blog",
    success: req.flash('success') 
  });
});

module.exports = router;
