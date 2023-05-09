/**
 * Module dependencies
 */

// ...


/**
 * user/edit.js
 *
 * Update user.
 */
module.exports = async function update(req, res) {
  let p = req.param("id");
  let pars = req.allParams()
  let user = await User.update({id: p}, pars, function userUpdated(err, user) {
    if (err) {
      return res.redirect("/user/edit?id=" + {id:p});
    }
    res.redirect("/user/show?id=" + p);
  });

};
