/**
 * Module dependencies
 */

// ...


/**
 * user/destroy.js
 *
 * Destroy user.
 */
module.exports = async function destroy(req, res) {
  let p = req.param("id");
  let user = await User.findOne({id: p}, function foundUser(err, user) {
    if (err) return res.negotiate(err);
    if (!user) return res.negotiate(err);

    User.destroy({id: p}, function userDestroyed(err){
      if (err) return res.negotiate(err);
    });
    res.redirect("/");
  });
  };
