'use strict';
var app = angular.module('arisePi');

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
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
    }).when('/add-pi-clock', {
      templateUrl: 'views/add-pi-clock.html',
      controller: 'AddClockController',
      controllerAs: 'addClockCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
