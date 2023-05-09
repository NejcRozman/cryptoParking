/**
 * Module dependencies
 */

// ...


/**
 * user/edit.js
 *
 * Edit user.
 */
module.exports = async function edit(req, res) {
  let p = req.param("id");
  let user = await User.findOne({id: p}, function foundUser(err, user) {
    if (err) return res.negotiate(err);
    if (!user) return res.negotiate("User doesn't exist.");


    res.view({
      user: user
    });
  });
};
