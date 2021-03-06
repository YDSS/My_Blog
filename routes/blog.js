var express = require('express');
var router = express.Router();
var Blog = require('../public/models/blog');
var toMarked = require('../lib/toMarked');

/* GET blog home page. */
router.get('/home', function(req, res) {
  res.render('blog/home', {});
});

/*read blog*/
router.get('/read', function(req, res) {
  Blog.read_all(function(err, docs) {
    debugger;
    if (err) return handleError(err);
   
    /*translate every content to markdown*/
    for (var i in docs) 
      docs[i].content = toMarked(docs[i].content);

    res.render('blog/read', {
      blogs: docs 
    });
  });
});

/*delete blog by id*/
router.post('/drop', function(req, res) {
  debugger;
  var id = req.query.id;
  if (!id) {
    req.flash('error', 'id is null');
    return res.redirect('/blog/read');
  }
  Blog.drop_by_id(id, function(err, doc) {
    if (err) return handleError(err);
    req.flash('success', 'delete success');
    return res.redirect('/blog/read');
  });
});

/*read a blog from read page*/
router.get('/readOne', function(req, res) { 
  var id = req.query.id;
  if (id == null || id == undefined || id =='') {
    req.flash('error', 'id not correct!');
    return redirect('/blog/read');
  }
  Blog.read_by_id(id, function(err, doc) {
    if (err) return handleError(err);
    debugger;

    /*translate every content to markdown*/
    doc.content = toMarked(doc.content);
      
    res.render('blog/readOne', {
      blog: doc,
    });
  });
});

/*write blog
 * flag, is to decide if write page readonly,so as read router*/
router.get('/write', function(req, res) {
  res.render('blog/write', {
    blog: { 
      title: '',
      content: ''
    },
    flag: 'w'
  });
});

router.post('/write', function(req, res) {
  debugger;
  var user = req.session.user;
  if (!user) {
    req.flash('error', 'You should log in first!');
    return res.redirect('/blog/write');
  }
  var blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.session.user.name 
  });
  blog.write(function(err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/blog/write');
    }
    req.flash('success', 'commit succeed');
    return res.redirect('/blog/read');
  });
});  

module.exports = router;
