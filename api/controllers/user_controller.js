'use strict'

let jwt = require('jsonwebtoken');
let express = require('express');
let User = require('../models/User');
let router = express.Router();
let expressjwt = require('express-jwt');
let app = express();
let config = require('../config'); //  require config file to get secret - move to bash profile
app.set('soSecret', config.secret); // set secret variable
// let routes = require('../routes/user_routes');

//////////////////////////////////////////////////////////////////////////////////////
///// make test user (GET http://localhost:3000/user/tester) /////////////////////////
function makeTestUser(req, res) {
  console.log('hit user/tester');
  var testUser = new User({
    username: 'test',
    password: 'password',
    email: 'test@email.com'
  });
  // save test user
  testUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
};

/////////////////////////////////////////////////////////////////////////////////////
///// create user (POST http://localhost:3000/user/signup) //////////////////////////
// not protected - see user_routes.js
function createUser(req, res) {
  console.log('hit user/signup');
  console.log(req.body);
  let userObj = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  console.log('inside createUser');
  userObj.save((err, user) => {
    if (err) {
      return res.status(401).send({message: err.errmsg});
    } else {
      return res.status(200).send(user);
    }
    console.log(user);
  });
}

/////////////////////////////////////////////////////////////////////////////////////
///// show all users (GET http://localhost:3000/user/users) /////////////////////////
function showAllUsers(req, res) {
  User.find({}, function(err, users) {
    console.log('hit /user/show')
    res.send(users);
  });
}

// TEST
/////////////////////////////////////////////////////////////////////////////////////
///// edit user (PUT http://localhost:3000/user/edit) ///////////////////////////////
// function editUser(req, res) {
//   let userParams = req.body.user;
//   User.findOne({email: userParams.email} , function (err, user) {
//     user.update(
//       {email: userParams.email},
//       {email: userParams.newEmail, username: userParams.newUserName},
//       function (err, user) {
//         resend.send(user);
//     });
//   });
// }

// TEST
/////////////////////////////////////////////////////////////////////////////////////
///// delete user (DELETE http://localhost:3000/user/delete) ////////////////////////
// function deleteUser(req, res) {
//   console.log('hit delete')
//   let userParams = req.body.username;
//   User.findOne({ username: userParams.username}, function (err, user) {
//     if (err) {
//       console.log('user not deleted');
//       console.log(user);
//       return;
//     } User.remove(function(err, user) {
//       res.send({"record" : "deleted"});
//     });
//   });
// }

/////////////////////////////////////////////////////////////////////////////////////
///// authentication (POST http://localhost:3000/user/authenticate) /////////////////
// not protected
// code below checks user and password and passes back a token in JSON response
// mongoose finds the user and jsonwebtoken creates the token
function auth(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    console.log('inside auth function in users controller')
    if(!user) {
      console.log(req.body.username);
      // check for user in database
      res.send({ success: false, message: 'Authentication failed. User not found.' });
      console.log(res.body + ' - this is the res body');
    } else if (user) {
      console.log(user + ' this is our user right before user.authenticate');
  user.authenticate(req.body.password, function (err, isMatch) {
    console.log('inside user.authenticate');
    if (isMatch) {
      return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, app.get('soSecret'))});
      res.send({
        succes: true,
        message: 'Enjoy the token',
        token: token
      });
        console.log('Enjoy the token');
        console.log(req.body + ' this is the request body');
    } else {
        console.log('Invalid credentials');
        }
      });
    };
  });
}

/////////////////////////////////////////////////////////////////////////////////////
///// logout (GET http://localhost:3000/user/logout) ////////////////////////////////
// function logout()


module.exports = {
  makeTestUser: makeTestUser,
  createUser: createUser,
  showAllUsers: showAllUsers,
  auth: auth // don't forget comma later
  // editUser: editUser,
  // deleteUser: deleteUser,
  // logout: logout
}
