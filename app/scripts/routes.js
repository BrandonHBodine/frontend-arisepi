'use strict';
var app = angular.module('arisePi');

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'ServerController',
      contorllerAs: 'server'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'SignupController',
      controllerAs: 'signup'
    }).when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupController',
      controllerAs: 'signupCtrl'
    }).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
