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
    if (err) next(err);

    return res.send(users);
    // res.view({
    //   users: users
    // })
  })

};
