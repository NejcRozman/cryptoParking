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
    if (err) return next(err);
    if (!user) return next(err);


    return res.send(user);

  });

};
