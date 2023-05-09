/**
 * Module dependencies
 */

// ...


/**
 * user/show.js
 *
 * Show user.
 */
module.exports = async function show(req, res) {
  let p = req.param("id");
  let user = await User.findOne({id: p}, function foundUser(err, user) {
    if (err) return res.negotiate(err);
    if (!user) return res.negotiate(err);


    res.view({
      user: user
    });
  });

};
