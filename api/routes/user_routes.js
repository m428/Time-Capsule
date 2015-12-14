'use strict'

let express = require('express');
let router = express.Router();
let user = require('../controllers/user_controller');
let expressJWT = require('express-jwt');
let config = require('../config');
let secret = config.secret;

////////////////////////////////////////////////////////////////////////////////
///// unprotected user routes //////////////////////////////////////////////////
router.route('/signup') // TEST
  .post(user.createUser);

router.route('/authenticate') // TEST
  .post(user.auth);

router.route ('/tester')
  .get(user.makeTestUser)


////////////////////////////////////////////////////////////////////////////////
///// protected user routes ////////////////////////////////////////////////////
router.route('/show')
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  .get(user.showAllUsers)

// router.route('/edit') // TEST
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  // .put(user.editUser)

// router.route('/delete') // TEST
  // .all(expressJWT({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  // .delete(user.deleteUser)


module.exports = router;
