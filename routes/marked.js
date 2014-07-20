var express = require('express'),
    marked = require('marked');
var router = express.Router();

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

/*parse data from client to MarkDown*/
router.post('/', function(req, res) {
  var html = marked(req.body.text);
  debugger;
  res.send(200,
    {
      html: html
    }
  );
}); 

module.exports = router;
