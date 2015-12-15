angular.module('TimeCapsule', ['ui.router'])
.config(UserRouter);

function UserRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');

  $stateProvider
  .state('index', {
    url: '/'
    // templateUrl: 'index.html' // change to welcome.html
  })
  .state('signup', {
    url: '/users/signup',
    templateUrl: 'signup.html'
  })
  .state('login', { // authenticate
    url: '/users/login',
    templateUrl: 'login.html'
  });
} // end UserRouter
