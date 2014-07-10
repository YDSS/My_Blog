function checkIsLogin(res, req, dist, next) {
  debugger;
  if(!req.session.user) {
    req.flash('error', 'user not logged in');
    return res.redirect(dist);
  }
  next();
});

function checkNotLogin(res, req, next) {
  if(req.session.user) {
    req.flash('error', 'user has logged in');
    return res.redirect('/');
  }
  next();
});
