'use strict';

/**
 * @ngdoc function
 * @name startApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the startApp
 */
 angular.module('PeershapeElectionAngularApp')
 .controller('CampaignCtrl', function (campaignService, $scope, $window, $location, localStorageService, $rootScope) {
  window.scrollTo(0,0)
  var vm = this;
  vm.errormsg= false;
  vm.signinForm = {};
  vm.submitted = false;
  vm.usercamp = false;
  vm.campaigncreated = false;

  var token = localStorageService.get('auth-token');


  vm.save = function(params){
    vm.id = localStorageService.get('user_id');

    var params = {
      id: vm.id,
      candidate_name : vm.name,
      year : vm.year,
      state : vm.state,
      district : vm.area,
      election : vm.category,
      link : vm.link

    }

    campaignService.postData(params).then(function(response) {
      if(response.success == true){
        localStorageService.set('camp_id',response.data.id);
        $rootScope.campaigndata = response.data;
        $location.path('/dashboard_new_post');
        $rootScope.save = true;
      }
      else if(response.message === "User don't have permission to create"){
        vm.usercamp = true;

      }
      else if (response.status === 402){
        vm.campaigncreated = true;
      }

      else if(response.errors) {
        vm.errormsg = true;
      }

      else{
        vm.errormsg = false;
      }

      vm.submitted = true;


    });
  }

  $scope.filterValue = function($event){
    if(isNaN(String.fromCharCode($event.keyCode))){
      $event.preventDefault();
    }
  };

  vm.keyPresslogin = function(e){
    if (e.keyCode == 13){
      angular.element('#sign-btn').focus();
      vm.save();
      vm.submitted = true;
    }
  }

});