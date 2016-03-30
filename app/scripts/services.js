'use strict';
var app = angular.module('arisePi');
var dev = 'http://localhost:8080';
var deploy = 'https://mighty-chamber-37987.herokuapp.com';
var host = deploy;
// Handle Auth
app.service('authentication', ['$window', '$http', '$location', authentication]);
// Handle Clocks
app.service('piclocks', ['$window', '$http', '$location', piclocks]);
// Special MDL function to ensure forms work
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
      url: host + '/users/signup',
      data: user
    }).then(function successCallback(response) {
      signupToast();
      $location.path('/');
      console.log('Congratulations you have been signed up : ' + JSON.stringify(response));
    }, function errorCallback(response) {
      errorToast('Signup failed please try again');
      console.log(response);
    });
  };

  var login = function(user) {
    // user is an object save from a form
    return $http({
      method: 'POST',
      url: host + '/users/login',
      data: user
    }).then(function successCallback(response) {
      // Token is stored in response.data
      var token = JSON.stringify(response.data);
      saveToken(token);
      loginToast(user.email);
      $location.path('/');
      isLoggedIn();
      console.log(JSON.stringify(response));
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      errorToast('Login failed please try again');
      console.log('An error occured while authenticating: ' + response);
    });
  };

  var logout = function() {
    console.log('User has been logged out');
    $window.localStorage.removeItem('jwt');
    actionToast('You have been logged out!');
    isLoggedIn();
  };

  var isLoggedIn = function() {
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
    if (isLoggedIn()) {
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return {
        email: payload.email
      };
    }
  };

  var signupToast = function() {
    var snackbarContainer = document.querySelector('#toast');
    var data = {
      message: 'Thanks for signing up please login to get started'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  var loginToast = function(email) {
    var snackbarContainer = document.querySelector('#toast');
    var data = {
      message: 'You are now logged in as ' + email
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  var errorToast = function(errorStr) {
    var snackbarContainer = document.querySelector('#toast');
    var data = {
      message: errorStr
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  var actionToast = function(textStr) {
    var snackbarContainer = document.querySelector('#toast');
    var data = {
      message: textStr
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  };

  return {
    saveToken: saveToken,
    getToken: getToken,
    signup: signup,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    userInfo: userInfo,
    loginToast: loginToast,
    signupToast: signupToast,
    errorToast: errorToast,
    actionToast: actionToast
  };
}

// Clock services
function piclocks($window, $http, $location) {

  var addClock = function(clock) {
    // user is an object save from a form
    return $http({
      method: 'POST',
      url: host + '/clocks/add',
      data: clock,
      headers: {
        Authorization: 'Bearer ' + JSON.parse($window.localStorage.jwt)
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('Congratulations you have Added a clock: ' + JSON.stringify(response));
      $location.path('/clocks');
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  var yourClocks = function() {
    // Pull JSON data of clocks associated with user
    return $http({
      method: 'GET',
      url: host + '/clocks/',
      headers: {
        Authorization: 'Bearer ' + JSON.parse($window.localStorage.jwt)
      }
    });
  };

  var getClock = function(id) {
    // Pull JSON data of alarms associated with clock
    return $http({
      method: 'GET',
      url: host + '/clocks/' + id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse($window.localStorage.jwt)
      }
    });
  };

  var yourAlarms = function(clockIp) {
    // Pull JSON data of alarms associated with clock
    return $http({
      method: 'GET',
      url: '//' + clockIp + '/alarms',
      headers: {
        Authorization: 'Bearer ' + JSON.parse($window.localStorage.jwt)
      }
    });
  };

  var addAlarm = function(clockIp, alarm, clockId) {
    var clockPath = '/clock/' + clockId;
    return $http({
      method: 'POST',
      url: '//' + clockIp + '/alarms/add',
      data: alarm
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('Congratulations you have Added a clock: ' + JSON.stringify(response));
      $location.url(clockPath);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  var deleteAlarm = function(clockIp, alarmId, clockId) {
    var clockPath = '/clock/' + clockId;
    return $http({
      method: 'DELETE',
      url: '//' + clockIp + '/alarms/' + alarmId
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('Alarm Deleted: ' + JSON.stringify(response));
      $location.url(clockPath);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  var checkClockLocation = function(clockIp){
    // Function to chekc weather the clock can be found on network
    return $http({
      method: 'GET',
      url: 'https://' + clockIp
    });
  };

  var turnOffLed = function(clockIp) {
    var ledPath = '//' + clockIp + '/ledControls/off';
    return $http({
      method: 'GET',
      url: ledPath
    });
  };

  var turnOffMp3 = function(clockIp) {
    var mp3Path = '//' + clockIp + '/mp3Controls/off';
    return $http({
      method: 'GET',
      url: mp3Path
    });
  };

  return {
    addClock: addClock,
    yourClocks: yourClocks,
    getClock: getClock,
    yourAlarms: yourAlarms,
    addAlarm: addAlarm,
    deleteAlarm: deleteAlarm,
    checkClockLocation: checkClockLocation,
    turnOffLed: turnOffLed,
    turnOffMp3: turnOffMp3
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
