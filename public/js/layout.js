function SetWinHeight(obj) {
  var win = obj;
  var parent = win.parent.parent;
  if(win.parent && win.parent.clientHeight) {
    var height = win.parent.clientHeight;
    win.height = height;
  } else if (win.parent && win.parent.scrollHeight) {
    var height = win.parent.scrollHeight;
    win.height = win.parent.scrollHeight;
  }
} 
            

