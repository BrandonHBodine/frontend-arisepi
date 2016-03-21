'use strict';
var app = angular.module('arisePi');

// Handle Auth
app.service('authentication', ['$window', '$http', '$location', authentication]);
app.service('mdlElementRegister', [mdlElementRegister]);

function authentication($window, $http, $location) {

  // Get and set tokens, use with interceptor
  var saveToken = function(token) {
    // Set local storage to token
    $window.localStorage.jwt = token;
  };

  var getToken = function() {
    return $window.localStorage.jwt;
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
      saveToken(token);
      $location.path('/');
      isLoggedIn();
      console.log(JSON.stringify(response));

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('An error occured while authenticating: ' + response);
    });
  };

  var logout = function() {
    console.log('User has been logged out');
    $window.localStorage.removeItem('jwt');
    isLoggedIn();
  };

  var isLoggedIn = function(){
    var token = getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      // Will return false if the token has expired
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }

  };

  var userInfo = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        email: payload.email
      };
    }
  };

  return {
    saveToken: saveToken,
    getToken: getToken,
    signup: signup,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    userInfo: userInfo
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
