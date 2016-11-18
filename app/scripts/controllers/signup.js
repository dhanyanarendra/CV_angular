'use strict';

/**
 * @ngdoc function
 * @name PeershapeElectionAngularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the PeershapeElectionAngularApp
 */
 angular.module('PeershapeElectionAngularApp')
 .controller('signupCtrl', function (signupService, $scope, $location, localStorageService, $rootScope) {

  var vm = this;

  vm.signupForm = {};
  vm.inputType = "password";
  vm.submitted = false;
  vm.confirmpasswordflag = false;
  vm.errorMsgFlagUserName = false;
  vm.signupForm.email = $location.search().invite_email;
  $rootScope.inviteDetails=[];
  // $rootScope.userRole = false;

  var inviteeId = window.location.hash;
  var lastInvitee = inviteeId.split("=");
  var lastInviteeId = $location.search().invite_id


  if(localStorageService.get("auth-token")) {
    if ($location.$$path === '/signup') {
      $location.path('/dashboard_new_post');
    }
  }


vm.togglePwd = function () {
  if (vm.inputType == 'password')
    vm.inputType = 'text';
  else
    vm.inputType = 'password';
}


vm.keyPresssignup = function(e){
  if (e.keyCode == 13){
    angular.element('#signup-btn').focus();
    vm.register(); vm.submitted = true
  }
}

vm.removeEmail= function(){
  vm.errorMsgFlagUserName =false;
  vm.errorMsgFlagUserName = false;
}

vm.clearEmail = function(){
 vm.errorMsgFlagUserName = false;
}

vm.signin = function(){
  $location.path('/signin');
}

vm.register = function(frm){
  vm.submitted = true;
  if (frm.$valid) {
    if (vm.signupForm.password != vm.signupForm.confirmpassword) {
      vm.confirmpasswordflag = true;
    }
    else {

      var params = {
        email: vm.signupForm.email ,
        password: vm.signupForm.password,
        invite_id: lastInviteeId
      }

      signupService.getData(params).then(function(response) {

        if (response.status === 200) {
          $rootScope.camp_id = response.data.data.campaign_id
          localStorageService.set('camp_id', $rootScope.camp_id);
          localStorageService.set('first_name', response.data.data.first_name);
          localStorageService.set('email', response.data.data.email);
          localStorageService.set('user_id', response.data.data.id);
          localStorageService.set('auth-token', response.data.data.auth_token);
          if((response.data.campain && response.data.campain.id)|| (response.data.roles && response.data.roles[0].name === "cordinator")){
            localStorageService.set('candidate_name',response.data.campain.candidate_name);
           }

          if(response.data.data.campaign_id === null ){
           $location.path('/users');
         }
         else if(response.data.data.invite_id != null ) {
          $location.path('/dashboard_new_post');
        }
        else {
          $location.path('/create_campaign');
        }

        vm.signupForm = {};
      }
      else if(response.data.data) {
        if(response.data.data === "Email has already been taken") {
          vm.errorMsgFlagUserName = true;
        }
      }
    });

    }
  }
};

});
