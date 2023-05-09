/**
 * Module dependencies
 */

// ...


/**
 * user/reserve.js
 *
 * Reserve user.
 */
module.exports = async function reserve(req, res) {
  let p = req.param("slotid");


  res.view({slotid: p});

};
