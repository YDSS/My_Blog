var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = marked;

