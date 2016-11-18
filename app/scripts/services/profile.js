'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('PeershapeElectionAngularApp')
 .factory('profileService', function ($http, ENV, localStorageService,profile) {
  var obj = {
    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return profile.getDetails(params).$promise.then(success, failure);

    },

      putData: function(params, id) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.put(ENV.api_path + "api/v1/users/"+id, {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    listdata: function(params,id) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.get(ENV.api_path + "api/v1/users/"+id, {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    deletecampService: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return profile.deleteCamp(params).$promise.then(success, failure);

    },

       inviteuser: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return profile.inviteuser(params).$promise.then(success, failure);

    },

        listcordinatordata : function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return profile.listcordinator(params).$promise.then(success, failure);

    },

      deleteuser : function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return profile.deleteuser(params).$promise.then(success, failure);

    }

  };
  return obj;
});


