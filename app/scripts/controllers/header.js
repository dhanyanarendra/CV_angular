'use strict';

/**
* @ngdoc function
* @name PeershapeElectionAngularApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the PeershapeElectionAngularApp
*/
angular.module('PeershapeElectionAngularApp')
.controller('HeaderCtrl', function ($scope, $rootScope, localStorageService, $location) {
  var vm = this;
  window.scrollTo(0,0)

  $scope.userSignedIn = localStorageService.get('user-signed-in') || false;
  if (localStorageService.get('auth-token') === null){
    if ($location.$$path === '/dashboard_new_post' || $location.$$path === '/my_profile' ) {
      $location.path('/signup');
    }
  }

  vm.logout = function(){
    localStorageService.clearAll();
    $scope.userSignedIn = false;
    $location.path('/signin')
  }

  vm.logo = function(){
    if(localStorageService.get('auth-token') === null){
      $location.path('/signin')
    }else{
      $location.path('/dashboard_new_post')
    }

  }

  vm.profile = function(){
    $location.path('/my_profile')
  }

  vm.dashboard = function(){
    $location.path('/dashboard_new_post')
  }

});

