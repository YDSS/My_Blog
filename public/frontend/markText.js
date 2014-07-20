define(function(require, exports, module) {
  
  var jQuery = require('jquery');

  function MarkText(container, rows) {

    this.container = $(container);
    this.rows = rows;

  }

  //render page
  MarkText.prototype.render = function() {

    this.init();

  }

  //create view and css
  MarkText.prototype.init = function() {

    this._dom();
    this._css();
    this._event();

  }

  //create elements as view of MVC
  MarkText.prototype._dom = function() {

    this.container.append('<div id="wrap"><textarea id="content" ' + 
                          'name="content" rows=' + this.rows + 
                          ' wrap="hard"></textarea></div>');
    this.container.append('<div id="display" name="display"' + 
                          ' height="550px"></div>');
    this.container.append('<button id="preview" name="preview" ' +
                          'type="button">Preview</button>');
    
  }

  //add classes on elements
  MarkText.prototype._css = function() {

    var wrap = $('#wrap'),
        display = $('#display'),
        btn = $('#preview'),
        content = $('#content');

    //display textarea
    MarkText.show(true);

    //put bootstrap class on elements
    content.addClass('form-control');
    display.addClass('panel panel-default');
    btn.addClass('btn btn-primary');

  }

  //decide which element to show,textarea and wrap can't 
  //be showned simultaneously
  MarkText.show = function(flag) {

    //if flag true, textarea show
    $('#wrap').css('display', flag ? '' : 'none');
    $('#display').css('display', flag ? 'none' : ''); 

  }
     
  //control function preview and show, decide which to exec
  var i = 0;

  //put events on elements
  MarkText.prototype._event = function() {

    $('#preview').on('click', function() {
      i++;
      i%2 == 1 ? MarkText.preview() : MarkText.show(true);
    });   
  }

  MarkText.preview = function() {

    var text = $('#content').val();

    $.post('/marked',
        {
          text: text
        },
        function(result, status) {
          if (status === 'success') {
            var str = result.html;
            console.log(str);
            $('#display').html(str);
            MarkText.show(false);
          }
        });

  }

  module.exports = MarkText;
});
