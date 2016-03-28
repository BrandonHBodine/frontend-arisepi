'use strict';

var app = angular.module('arisePi');

app.controller('MainController', ['$interval', 'authentication', MainController]);
app.controller('SignupController', ['$http', 'authentication', 'mdlElementRegister', SignupController]);
app.controller('LoginController', ['$http', 'authentication', 'mdlElementRegister', LoginController]);
app.controller('AddClockController', ['$http', 'authentication', 'piclocks', 'mdlElementRegister', AddClockController]);
app.controller('YourClocksController', ['$http', 'authentication', 'piclocks', 'mdlElementRegister', YourClocksController]);
app.controller('ClockController', ['$http', '$routeParams', 'authentication', 'piclocks', 'mdlElementRegister', ClockController]);

function MainController($interval, authentication) {
  var vm = this;
  vm.title = 'Arise Pi Main CTRL';

  vm.loggedIn = authentication.isLoggedIn();
  vm.logout = authentication.logout;
  vm.updateLoggedIn = updateLoggedIn;

  //Navbar function
  function updateLoggedIn() {
    vm.loggedIn = authentication.isLoggedIn();
    console.log(vm.loggedIn);
  }

  // Clock Fucntion
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

function AddClockController($http, authentication, piclocks, mdlElementRegister) {
  mdlElementRegister.update();
  var vm = this;
  vm.title = 'Add a Pi Clock';
  vm.clock = {};
  vm.submit = piclocks.addClock;
}

function YourClocksController($http, authentication, piclocks, mdlElementRegister) {
  mdlElementRegister.update();
  var vm = this;
  vm.title = 'Your Clocks';
  vm.yourClocks = [];
  piclocks.yourClocks().then(function successCallback(response) {
    vm.yourClocks = response.data;
    return response;
  }, function errorCallback(response) {
    console.log(response);
  });
}

function ClockController($http, $routeParams, authentication, piclocks, mdlElementRegister) {
  mdlElementRegister.update();
  var id = $routeParams.clockId;
  var vm = this;
  vm.id = id;
  vm.alarm = {};
  vm.alarms = [];
  vm.clockName = 'Unavaliable';
  vm.clockId = 'Unavaliable';
  vm.clockIp = 'Unavaliable';
  vm.getClock = piclocks.getClock;
  vm.yourAlarms = piclocks.yourAlarms;
  vm.addAlarm = piclocks.addAlarm;
  vm.deleteAlarm = piclocks.deleteAlarm;

  // Callbacks so we can envoke more complex functions with ng-click
  vm.parseClockData = function(response) {
    vm.clockName = response.data[0].name;
    vm.clockId = response.data[0].id;
    vm.clockIp = response.data[0].ip;
    return response;
  };

  vm.parseAlarmData = function(alarmRes) {
    vm.alarms = alarmRes.data;
  };

  vm.errorCallback = function(response) {
    console.log(response);
  };

  // Execute on pageload
  piclocks.getClock(id).then(vm.parseClockData, vm.errorCallback).then(function(response) {
    var ip = response.data[0].ip;
    piclocks.yourAlarms(ip).then(vm.parseAlarmData, vm.errorCallback);
  });


}
