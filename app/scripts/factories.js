'use strict';

var app = angular.module('arisePi');

app.factory('authInterceptor', ['$rootScope', '$q', '$window', authInterceptor]);

function authInterceptor($rootScope, $q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.jwt) {
        console.log('The jwt has been sent: ' + JSON.parse($window.localStorage.jwt));
        config.headers.Authorization = 'Bearer ' + JSON.parse($window.localStorage.jwt);
      }
      return config;
    },

    response: function(response) {
      if (response.status === 401) {
        console.log('Error 401 Unauthorized');
      }
      return response || $q.when(response);
    }
  };
}

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);
