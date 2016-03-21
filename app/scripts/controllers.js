'use strict';

var app = angular.module('arisePi');

app.controller('MainController', ['$interval', 'authentication', MainController]);
app.controller('SignupController', ['$http', 'authentication', 'mdlElementRegister', SignupController]);
app.controller('LoginController', ['$http', 'authentication', 'mdlElementRegister', LoginController]);
app.controller('AddClockController', ['$http', 'authentication', 'mdlElementRegister', AddClockController]);

function MainController($interval, authentication) {
  var vm = this;
  vm.title = 'Arise Pi Main CTRL';
  vm.loggedIn = authentication.isLoggedIn();
  vm.logout = authentication.logout;

  $interval(updateTime, 1000);
  function updateTime() {
    var date = new Date();
    vm.time = date.toLocaleTimeString();
  }

}

function SignupController($http, authentication, mdlElementRegister) {
  mdlElementRegister.update();
  var vm = this;
  vm.title = 'Signup';
  vm.user = {};
  vm.submit = authentication.signup;
}

function LoginController($http, authentication, mdlElementRegister) {
  mdlElementRegister.update();
  var vm = this;
  vm.title = 'Login';
  vm.user = {};
  vm.submit = authentication.login;
}

function AddClockController($http, authentication, mdlElementRegister) {
  mdlElementRegister.update();
  var vm = this;
  vm.title = 'Add a Pi Clock';
  vm.clock = {};
}
