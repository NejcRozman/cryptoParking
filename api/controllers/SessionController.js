/**
 * SessionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let bcrypt = require('bcrypt');

module.exports = {

  create: async function(req, res) {

    if (!req.param('email') || !req.param('password')){
      res.send("You must enter both a username and password");
    }

    let user = await User.findOne({email: req.param('email')}, function foundUser (err, user) {
      if (err) return res.serverError(err);

      if(!user) {
        res.send('The email address not found.');
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
        if (err) return res.serverError(err);

        if (!valid) {
          res.send("Pasword missmatch!")
        }

        req.session.authenticated = true;
        req.session.User = user;

        if (req.session.User.admin) {
          res.send("admin");
        } else {
          res.send(user.id);
        }


        // return res.view('user/show?id=' + user.id, {
        //   user: user
        // });
      })




    })
  },

  destroy: function (req, res) {

    req.session.destroy();

    res.redirect('/');
  }

};

