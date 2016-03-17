'use strict';
var app = angular.module('arisePi');


// Handle Auth
app.service('authentication', ['$window', '$http', authentication]);
app.service('mdlElementRegister', [mdlElementRegister]);

function authentication($window, $http) {
  // Get and set tokens, use with interceptor
  var saveToken = function(token) {
    // Set session storage to token
    $window.sessionStorage.jwt = token;
  };

  var getToken = function() {
    return $window.sessionStorage.jwt;
  };

  var signup = function(user) {
    // user is an object save from a form
    return $http({
      method: 'POST',
      url: '//localhost:8080/users/signup',
      data: user
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('Congratulations you have been signed up : ' + JSON.stringify(response));
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  var login = function(user) {
    // user is an object save from a form
    return $http({
      method: 'POST',
      url: '//localhost:8080/users/login',
      data: user
    }).then(function successCallback(response) {
      // Token is stored in response.data
      var token = JSON.stringify(response.data);
      saveToken('jwt', token);
      console.log(JSON.stringify(response));
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('An error occured while authenticating: ' + response);
    });
  };

  var logout = function() {
    $window.sessionStorage.removeItem('jwt');
  };
  return {
    saveToken: saveToken,
    getToken: getToken,
    signup: signup,
    login: login,
    logout: logout
  };
}

// Update MDL on page render
function mdlElementRegister() {
  return {
    update: function() {
      componentHandler.upgradeAllRegistered();
    }
  };
}
