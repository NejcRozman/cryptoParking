module.exports = function (req, res, ok) {

  let sessionUserMatchesId = req.session.User.id === req.param('id');
  let isAdmin = req.session.User.admin;

  if (!(sessionUserMatchesId || isAdmin)) {
    res.redirect('/');
  } else {
    ok();
  }

};
