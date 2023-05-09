module.exports = function (req, res, ok) {

  if (req.session.User && req.session.User.admin) {
    return ok();
  } else {

    res.redirect('/');
    //res.send('You must be an admin!');
  }

};
