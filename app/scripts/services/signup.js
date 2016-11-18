'use strict';

/**
 * @ngdoc function
 * @name PeershapeElectionAngularApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the PeershapeElectionAngularApp
 */

 angular.module('PeershapeElectionAngularApp')
 .factory('signupService', function ($http, ENV, User, localStorageService) {
  var obj = {
    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path + "api/v1/users/", {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    }
  };
  return obj;
});

