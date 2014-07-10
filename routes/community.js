var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('community', { 
    title: "YDS's blog", 
    items: ['222', 'YDS', '333']
  });
});

module.exports = router;
