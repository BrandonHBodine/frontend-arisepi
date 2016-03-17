'use strict';

var app = angular.module('arisePi');

app.factory('authInterceptor', ['$rootScope', '$q', '$window', authInterceptor]);

function authInterceptor($rootScope, $q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.jwt) {
        console.log('The jwt has been sent: ' +$window.localStorage.jwt);
        config.headers.Authorization = 'Bearer ' + $window.localStorage.jwt;
      }
      return config;
    },
    response: function(response) {
      if (response.status === 401) {
        console.log('Shit your interceptor is not working :()');
      }
      return response || $q.when(response);
    }
  };
}

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
