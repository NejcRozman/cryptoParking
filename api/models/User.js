/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  //schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    encryptedPassword: {
      type: 'string'
    },


  },

  customToJSON: function() {
    return _.omit(this, ['password', 'confirmation', 'encryptedPassword', '_csrf']);
  },

  beforeCreate: function (values, next) {
   if (!values.password || values.password != values.confirmation){
      return next({err: ["Password doesn't match password confirmation"]});
    }
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      //values.online = true;
      next();
    });

  },

};

