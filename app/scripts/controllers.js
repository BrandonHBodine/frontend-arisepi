"use strict";

app.controller("MainController", [MainController]);
app.controller("SignupController", [SignupController]);

function MainController() {
  var vm = this;
  vm.title = 'Arise Pi';
}

function SignupController() {
  var vm = this;
  vm.title = 'Signup';
}
