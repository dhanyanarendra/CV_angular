'use strict';

/**
* @ngdoc function
* @name startApp.Service:Getapiservice
* @description
* # Getapi
* Controller of the startApp
*/

angular.module('PeershapeElectionAngularApp')
.factory('signinService', function ($http, ENV, Member, localStorageService) {
  var obj = {
    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path + "api/v1/authenticate_for_web/", {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);


    },

    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.post(ENV.api_path + "api/v1/forgot_password/", {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },


    putData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.put(ENV.api_path + "api/v1/reset_password/", {user: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    }
  };

  return obj;
});
