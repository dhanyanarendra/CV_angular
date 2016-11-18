'use strict';

/**
* @ngdoc function
* @name startApp.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the startApp
*/
angular.module('PeershapeElectionAngularApp')
.controller('profileCtrl', function (profileService, $scope, $window, $location, localStorageService, $rootScope,$timeout) {

  var vm = this;
  window.scrollTo(0,0)
  vm.submitted = false;
  vm.id = localStorageService.get('user_id');
  vm.camp_id = localStorageService.get('camp_id');
  vm.first_name = localStorageService.get('first_name');
  vm.form = false;
  vm.noinvite = false;
  $rootScope.userRole = true;
  vm.flashmsg = false;
  $rootScope.cordinatorDetails = [];
  vm.imagedata = null;
  vm.imageFormat = false;
  vm.errorMsgFlagEmail = false;
  $scope.Emailtaken = false;

  $scope.file = {
    type: null
  }
  $rootScope.inputReadonly = true;

  var params = {
    id: vm.id,
    campaign_id: vm.camp_id
  }

  profileService.getData(params).then(function(response) {
    $rootScope.profiledata = response.data;
    vm.camp_id = localStorageService.set('camp_id',response.data.id);
  });


  profileService.listdata(params,vm.id).then(function(response) {
    if (response.data.roles[0].name === "admin" ) {
      $rootScope.userRole = true;
    }
    else {
      $rootScope.userRole = false;
    }

    if (response.data.data.file.url == null) {
      $rootScope.image = 'images/icon-default-profile-big.png';
    }
    else {
      $rootScope.image = response.data.data.file.url;
    }
    vm.profileform = response.data.data;
  });


  var params = {
    campaign_id: vm.camp_id
  }

  profileService.listcordinatordata(params).then(function(response) {
    if (response.success == true){
      $rootScope.cordinatorDetails = response.data;

    }

  });

  vm.edit =function(){
    $rootScope.save = true;
    $rootScope.inputReadonly = false;
  }
  vm.campaign_link = function(){
    $location.path('/create_campaign')
  }

  vm.Displayform = function(){
    vm.form = !vm.form
    vm.submitted = false;
    $scope.Emailtaken = false;

  }

  vm.removeErr = function(){
    if(vm.submitted == true){
      $scope.Emailtaken = false;
    }
  }

  vm.deleteinvite = function(id){
    var params = {
      user_id: id
    }
    profileService.deleteuser(params).then(function(response) {
      $window.location.reload();
      vm.camp_id = localStorageService.get('camp_id');
      var params = {
        campaign_id: vm.camp_id
      }
      profileService.listcordinatordata(params).then(function(response) {
        if (response.success == true){
          $rootScope.cordinatorDetails = response.data;
        }
      });
    });
  }

  $scope.getFile = function () {
    var reader = new FileReader();
    reader.readAsDataURL($scope.file);
    reader.onload = function(e) {
      $rootScope.image = $scope.file.name;
      $rootScope.imagedata = reader.result;
      $rootScope.imagedata = $rootScope.imagedata.split("base64,")[1];
      $scope.$apply();
      vm.saveprofile($rootScope.imagedata);
    }
  };




  vm.triggerUpload = function () {
    var fileuploader = angular.element("#imageField");
    fileuploader.trigger('click');
  }


  vm.saveprofile = function(frm) {
    vm.submitted = true;
    $rootScope.inputReadonly = true;
    vm.profileform.title = (vm.profileform.title == undefined) ? null : vm.profileform.title
    vm.profileform.first_name = (vm.profileform.first_name == undefined) ? null : vm.profileform.first_name
    vm.profileform.last_name = (vm.profileform.last_name == undefined) ? null : vm.profileform.last_name
    vm.profileform.phone = (vm.profileform.phone == undefined) ? null : vm.profileform.phone
    vm.profileform.email = (vm.profileform.email == undefined) ? null : vm.profileform.email
    var params = {
      email: vm.profileform.email,
      first_name: vm.profileform.first_name,
      last_name: vm.profileform.last_name,
      title: vm.profileform.title,
      phone: vm.profileform.phone,
      file: {
        data: $rootScope.imagedata,
        type: $scope.file.type
      },
      file_name: $rootScope.image
    }
    profileService.putData(params,vm.id).then(function(response) {
      localStorageService.set('first_name', response.data.data.first_name);
      vm.profileform = response.data.data;
      if (response.status == 200) {
        $rootScope.save = false;
        $window.location.reload();
      }
    });
  };

 vm.refresh_profile = function(){
    $window.location.reload();
   }

  vm.invite_user = function(inviteForm) {
    vm.submitted = true;
    if(inviteForm.$valid){
      var params = {
        id: vm.id,
        first_name: inviteForm.profile.first_name,
        last_name: inviteForm.profile.last_name,
        email: inviteForm.profile.email,
        short_description: inviteForm.profile.short_description
      }

      profileService.inviteuser(params).then(function(response) {
        $rootScope.emailData = response.data
        vm.form = false;
        if (response.success) {
          vm.flashmsg = true;
          $timeout (function() {
            vm.flashmsg = false;
          }, 5000)
          vm.email = '';
          $scope.Emailtaken = false;
          window.scrollTo(0,0);
        }
        else if (response.data.success == false) {
          if (response.data.errors.email[0] === "has already been taken") {
            $scope.Emailtaken = true;
            vm.form = true;
          }
        }
      });
    }
    else {
      window.scrollTo(90,90);
    }
    vm.first_name = '';
    vm.last_name = '';
    vm.short_description = '';
  }

  vm.deleteCamp = function(){
    var params = {
      campaign_id: $rootScope.profiledata.id,
      id: vm.id
    }

    profileService.deletecampService(params).then(function(response) {
      $window.location.reload();
    });

    profileService.getData(params).then(function(response) {
      $rootScope.profiledata = null;
    });
  }
});
