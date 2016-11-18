'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('PeershapeElectionAngularApp')
 .controller('signinCtrl', function (signinService, campaignService, $scope, $window, $location, localStorageService, $timeout, $rootScope) {

  var vm = this;
  vm.resetpwdForm = {};
  vm.signinForm = {};
  vm.inputType = "password";
  vm.confirmpasswordflag = false;
  vm.done = false;
  vm.submitform = false;
  vm.errorMsgFlag = false;
  vm.errorMsgFlagForVolenteer = false;
  vm.flashmsg = false;


  // $rootScope.userRole = false;

  if(localStorageService.get("auth-token")) {
   if ($location.$$path === '/signin') {
    $location.path('/dashboard_new_post');
  }
}


vm.togglePwd = function () {
  if (vm.inputType == 'password')
    vm.inputType = 'text';
  else
    vm.inputType = 'password';

}
vm.signup =function(){
  $location.path('/signup')
}

vm.clearfrm = function(){
  vm.done = false;
  vm.submitform = false;
  vm.emptyform =false;
  vm.spaceErr = false;
  vm.IsMatch=false;
}

vm.removeErrormsg= function(){
  vm.errorMsgFlag = false;
  vm.errorMsgFlagForVolenteer = false;
}

vm.forgotpassword = function(){
  $location.path('/forgot_password')
}

vm.login = function(){
  vm.emailErr = false;
  vm.submitted = true;
  if (vm.signinForm.userid.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
    vm.signinForm.email = vm.signinForm.userid
    vm.signinForm.user_name = null
    var params = {
      email: vm.signinForm.email,
      user_name: null,
      password: vm.signinForm.password,
      campain: $rootScope.campaigndata

    }
  }
  else {
    vm.signinForm.user_name = vm.signinForm.userid;
    vm.signinForm.email = null
    var params = {
      email: null,
      user_name: vm.signinForm.user_name,
      password: vm.signinForm.password,
      campain: $rootScope.campaigndata
    }
  }

  signinService.getData(params).then(function(response) {
    $rootScope.userDetails = response.data;

    if(response.status === 200)
    {
      $rootScope.camp_id = response.data.campain.id
      localStorageService.set('camp_id', response.data.campain.id);
      localStorageService.set('first_name', response.data.data.first_name);
      localStorageService.set('user_id', response.data.data.id);
      localStorageService.set('auth-token', response.data.data.auth_token);
      localStorageService.set('user-signed-in', true);
      localStorageService.set('email', response.data.data.email);
      localStorageService.set('createTime', response.data.data.created_at);

      if((response.data.campain && response.data.campain.id)|| response.data.roles[0].name === "cordinator"){
        localStorageService.set('candidate_name',response.data.campain.candidate_name);
        $location.path('/dashboard_new_post');

      }
      else if(response.data.roles[0].name === "admin") {
        $location.path('/create_campaign');
      }
      else {
        $location.path('/users');
      }

      vm.signupForm = {} ;
    }

    else if(response.status === 401){
        vm.errorMsgFlagForVolenteer = true;
    }
    else{
      vm.errorMsgFlag = true;
    }

    campaignService.getData(params).then(function(response) {
      localStorageService.get('camp_id',response.data.id);
    });
  });

}

vm.pwdreset = function(){
  vm.emailErr = false;
  vm.submitform = true;
  var params = {
    email : vm.resetpwdForm.email
  }
  if(params.email !== undefined){
   signinService.postData(params).then(function(response) {
    vm.password_reset_token = response.data.password_reset_token;
    localStorageService.set('password_reset_token', response.data.password_reset_token);
    $location.path('/signin')
    vm.err = true;
    vm.alertmsg = true;
    vm.resetpwdForm ={};
    vm.submitform = false;
    localStorageService.set('alertmsg', vm.alertmsg);

  });
 }
}

vm.submit = function(){
  vm.done = true;
  vm.IsMatch=false;
  vm.success = false;
  // vm.resetpwd = localStorageService.get('password_reset_token');
  vm.resetpwd = $location.$$absUrl.split('?')[1]
  var params = {
    password_reset_token : vm.resetpwd,
    password : vm.password,
    password_confirmation : vm.password_confirmation

  }
  if (params !== undefined){
    signinService.putData(params).then(function(response) {
      vm.IsMatch=false;
      vm.pwd1 = params.password;
      vm.pwd2 = params.password_confirmation;
      if (vm.pwd1 != vm.pwd2) {
        vm.IsMatch=true;
        return false;
      }
      if(response.status == 200){
        localStorageService.remove('password_reset_token');
        vm.status = response.status;
        localStorageService.set('updatepwd', vm.status);
        if (response.status == 200) {
          vm.flashmsg = true;
          $timeout (function() {
            vm.flashmsg = false;
          }, 5000)
          window.scrollTo(0,0);
        }
        $timeout (function () {$location.path('/sigin');}, 2000);

      }

      if(response.data.error){
        if(response.data.error.password){
          if(response.data.error.password[0] === "Your password can't contain spaces"){
            vm.spaceErr = true;
            vm.charErr = false;
          }
          else if(response.data.error.password[0] === "is too short (minimum is 8 characters)"){
            vm.charErr = true;
            vm.spaceErr = false;
          }
          else{
            vm.spaceErr = false;
            vm.charErr = false;
          }
        }
      }
    });
  }
}

vm.keyPresslogin = function(e){
  if (e.keyCode == 13){
    angular.element('#sign-btn').focus();
    vm.login();
    vm.submitted = true;
  }
}

});
