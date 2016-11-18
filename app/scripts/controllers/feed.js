'use strict';

/**
* @ngdoc function
* @name startApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the startApp
*/
angular.module('PeershapeElectionAngularApp')
.controller('FeedCtrl', function (feedService, $scope, $window, $location, localStorageService, $rootScope) {

  var vm = this;
  window.scrollTo(0,0)
  vm.submitted = false;
  vm.feedArray = [];
  vm.volunteerArray = [];
  vm.form = false;
  vm.priority_value = false;
  vm.noFeed = false;
  vm.error = false;
  $scope.highlightIndex = 0;
  vm.feedValidation = false;
  $rootScope.usersCount = 0;
  $scope.timeValidation = false;


  vm.Priority = function() {
    vm.priority_value = !vm.priority_value;
  }

  $scope.timePickerOptions = {
    step: 20,
    timeFormat: 'g:ia',
    appendTo: 'body'
  }

  var token = localStorageService.get('auth-token');
  vm.camp_id = localStorageService.get('camp_id');
  vm.id = localStorageService.get('user_id');

  var params = {
    id: vm.id,
    campaign_id: vm.camp_id
  }

  feedService.getData(params).then(function(response) {
    vm.candidate_name = response.campaign.candidate_name;
    vm.feedArray = [].concat.apply([],response.data);
    $scope.first_name = localStorageService.get('first_name');
    $scope.created_by = response.data[0].created_by;
    if (vm.feedArray.length === 0) {
      vm.noFeed = true;
      vm.error = true;
    }
    else {
      vm.noFeed = false;
      vm.error = false;
      vm.length = vm.feedArray.length - 1;

      feedService.getVolunteers(vm.feedArray[0].id).then(function(response) {
        vm.volunteerDetails = {};
        vm.volunteerArr = [];
        if (response.data.data) {
          for(var i=0; i < response.data.data.length; i++) {

            vm.volunteerDetails = {
              "firstName": response.data.data[i].first_name,
              "lastName": response.data.data[i].last_name,
              "userImage": response.data.data[i].file.url,
              "usersCount": response.data.data.length
            }

            if (vm.volunteerDetails.firstName || vm.volunteerDetails.lastName){
            }
            else {
              vm.volunteerDetails.firstName = "Anonymous";
            }
            if(vm.volunteerDetails.userImage == null) {
              vm.volunteerDetails.userImage = "images/dp.png"
            }
            vm.volunteerArr.push(vm.volunteerDetails)
            $rootScope.usersCount= vm.volunteerDetails.usersCount;
          }
        }
        else {
          $rootScope.usersCount=0;
        }
      });
    }
  });

  feedService.getType(params).then(function(response) {
    vm.interest_name = response.data.data;
  });

  vm.feed_save = function(params) {

    var params = {
      id: vm.id,
      campaign_id: vm.camp_id,
      title: vm.title,
      quantity: vm.quantity,
      date: vm.date,
      start_time: vm.start_time,
      end_time: vm.end_time,
      location: vm.location,
      short_description: vm.short_description,
      like_count: vm.like_count,
      pledge: vm.pledge,
      like: vm.like,
      priority: vm.priority_value,
      done: vm.done,
      interest_id: $scope.displayinterestId
    }
    if(vm.start_time > vm.end_time){
      $scope.timeValidation = true;
      vm.form = true;
      window.scrollTo(0,0)
    }
    else{
      $scope.timeValidation = false;
      feedService.postData(params).then(function(response) {
        vm.feedArray.push(response.data)
        if (vm.feedArray.length === 0) {
          vm.noFeed = true;
        }
        else {
          vm.noFeed = false;
        }
        vm.created_at = response.data.created_at
        vm.userName = response.data.first_name
        vm.submitted = true;
        if (response.success !== "true") {
          vm.feedValidation = true;
          vm.form = true;
          window.scrollTo(0,0)

        }
        else if($scope.timeValidation == true){
          vm.form = true;
        }
        else{
          vm.form = false;
          vm.dashboardForm = {};
          feedService.getData(params).then(function(response) {
            vm.feedArray = [].concat.apply([],response.data);
            vm.feedValidation = false;
            $scope.highlightIndex = 0;
          });
        }
      });

    }
    feedService.getVolunteers(vm.feedArray[0].id).then(function(response) {
      vm.volunteerDetails = {};
      vm.volunteerArr = [];
      if (response.data.data) {
        for(var i=0; i < response.data.data.length; i++) {

          vm.volunteerDetails = {
            "firstName": response.data.data[i].first_name,
            "lastName": response.data.data[i].last_name,
            "userImage": response.data.data[i].file.url,
            "usersCount": response.data.data.length
          }

          if (vm.volunteerDetails.firstName || vm.volunteerDetails.lastName){
          }
          else {
            vm.volunteerDetails.firstName = "Anonymous";
          }
          if(vm.volunteerDetails.userImage == null) {
            vm.volunteerDetails.userImage = "images/dp.png"
          }
          vm.volunteerArr.push(vm.volunteerDetails)
          $rootScope.usersCount= vm.volunteerDetails.usersCount;
        }
      }
      else {
        $rootScope.usersCount=0;
      }
    });
    var elmnt = document.getElementById("scrollArea");
    elmnt.scrollLeft = 0;
    elmnt.scrollTop = 0;
  }

  $scope.setDisplayInterest = function (interest) {
    $scope.displayinterest = interest.name;
    $scope.displayinterestId = interest.id;
  }

   vm.refresh_feed = function(){
    $window.location.reload();
   }

  vm.DisplayformExpand=function() {
    vm.form = !vm.form;
    $scope.highlightIndex = -1;
    vm.title = '';
    vm.quantity='';
    vm.date='';
    vm.start_time='';
    vm.end_time='';
    vm.location='';
    vm.short_description = '';
    $scope.displayinterest = '';
    vm.priority_value= false;
    vm.feedValidation = false;
    $scope.timeValidation = false;

  }

  vm.Displayform = function(){
    vm.form = !vm.form;
    $scope.highlightIndex = 0;
    vm.submitted = false;
  }

  vm.keyPresslogin = function(e) {
    if (e.keyCode == 13){
      angular.element('#sign-btn').focus();
      vm.save();
      vm.submitted = true;
    }
  }


  $scope.filterValue = function($event){
    if(isNaN(String.fromCharCode($event.keyCode))){
      $event.preventDefault();
    }
  };


  $scope.select = function(feed, index) {
    $scope.highlightIndex = index;
    window.scrollTo(0,0)
    vm.form = false;

    feedService.getVolunteers(feed.id).then(function(response) {
      vm.volunteerDetails = {};
      vm.volunteerArr = [];
      if(response.data.data) {
        for(var i=0; i < response.data.data.length; i++) {

          vm.volunteerDetails = {
            "firstName":response.data.data[i].first_name,
            "lastName":response.data.data[i].last_name,
            "userImage":response.data.data[i].file.url,
            "usersCount":response.data.data.length
          }
          if (vm.volunteerDetails.firstName || vm.volunteerDetails.lastName) {
          }
          else {
            vm.volunteerDetails.firstName = "Anonymous";
          }
          if(vm.volunteerDetails.userImage == null) {
            vm.volunteerDetails.userImage = "images/dp.png"
          }
          vm.volunteerArr.push(vm.volunteerDetails)
          $rootScope.usersCount= vm.volunteerDetails.usersCount;
        }
      }
      else {
        $rootScope.usersCount = 0;
      }
    });
  }
});
