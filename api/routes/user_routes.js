'use strict'

let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let expressJWT = require('express-jwt');
let user = require('../controllers/user_controller');
let config = require('../config');
let secret = config.secret;

router.route('/users')
////////////////////////////////////////////////////////////////////////////////
///// unprotected user routes //////////////////////////////////////////////////
// router.route('/signup') // TEST
  .post(user.createUser);

// router.route('/login') // TEST
  // .post(user.auth);

// router.route ('/tester')
  // .get(user.makeTestUser)


////////////////////////////////////////////////////////////////////////////////
///// protected user routes ////////////////////////////////////////////////////
// router.route('/show')
// .all(expressJWT({
//   secret: secret,
//   userProperty: 'auth'
// }))
  // .get(user.showAllUsers)

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
