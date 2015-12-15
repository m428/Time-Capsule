'use strict'
angular.module('TimeCapsule')
.controller('UsersController', UsersController);

UsersController.$inject = ['$http'];

function UsersController($http) {
  let self = this;
  self.all = [];
  self.addUser = addUser;
  self.newUser = {};
  self.loginUser = loginUser;
  self.userlogin = {};

  // getUsers(); // Call login/welcome page instead
  // function getUsers() {
  //   $http
  //     .get('http://localhost:3000/users')
  //     .then(function(response) {
  //       self.all = response.data.users;
  //     })
  // }

  function addUser() {
    $http
      .post('http://localhost:3000/users', self.newUser)
      .then(function(response) {
        // getUsers();
      });
      self.newUser = {};
      console.log("adding user")
  }

  function loginUser() {
    console.log('logging in')
    $http
      .post('http://localhost:3000/users/login', self.userLogin)
      .then(function(response) {
      localStorage.setItem('userToken', response.data.token)
    });
  }

} // end UsersController
