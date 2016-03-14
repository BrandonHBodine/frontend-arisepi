'use strict';
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'ServerController as server'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'SignupController as signup'
    }).when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupController as signup'
    })
    .otherwise({
      redirectTo: '/'
    });
});
