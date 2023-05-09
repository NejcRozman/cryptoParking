/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  '*': true,
  // "user/*":false,
  // "user/findUser":true


  user: {
    'signup': true,
    create: true,
    slotpage: true,
    createslot: 'userCanSeeProfile',
    reserve: true,
    show: 'userCanSeeProfile',
    edit: 'userCanSeeProfile',
    update: 'userCanSeeProfile',
    destroy: 'admin',
    '*': 'admin'
  }

};
