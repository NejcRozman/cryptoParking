/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function(req, res) {

    let p = req.allParams();
    //Create a user with the params sent from the sign up form
    let user = await User.create(p)
      .intercept('E_UNIQUE', ()=> {return res.send("emailAlreadyInUse")})
      .fetch();

    //After successfully creating the user redirect to the show action
    return res.send("User created!");

  }
};

