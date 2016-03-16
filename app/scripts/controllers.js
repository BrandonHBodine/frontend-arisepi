'use strict';

var app = angular.module('arisePi');

app.controller('MainController', [MainController]);
app.controller('SignupController', ['$http', SignupController]);
app.controller('LoginController', ['$http', LoginController]);

function MainController() {
  var vm = this;
  vm.title = 'Arise Pi';
}

function SignupController($http) {
  var vm = this;
  vm.title = 'Signup';
  vm.user = {};
  vm.submit = function() {
    $http({
      method: 'POST',
      url: '//localhost:8080/users/signup',
      data: vm.user
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };
}

function LoginController($http) {
  var vm = this;
  vm.title = 'Login';
  vm.user = {};
  vm.submit = function() {
    console.log('Sent!');
    $http({
      method: 'POST',
      url: '//localhost:8080/users/login',
      data: vm.user
    }).then(function successCallback(response) {
      var token = JSON.stringify(response.data);
      window.sessionStorage.setItem('jwt', token);
      console.log(token);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('An error occured while authenticating: ' + response);
    });
  };
}
