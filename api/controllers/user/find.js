/**
 * Module dependencies
 */

// ...


/**
 * user/find.js
 *
 * Index user.
 */
module.exports = async function find(req, res) {
  User.find(function foundUsers (err, users) {
    if (err) res.negotiate(err);

    res.view({
      users: users
    })
  })

};
