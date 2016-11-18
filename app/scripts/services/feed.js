'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('PeershapeElectionAngularApp')
 .factory('feedService', function ($http, ENV, localStorageService,feed) {
  var obj = {
    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return feed.feed(params).$promise.then(success, failure);

    },


     getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return feed.listfeed(params).$promise.then(success, failure);

    },

      getType: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return $http.get(ENV.api_path + "api/v1/interests/", {interest: params}, {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    },

    getVolunteers: function(feed_id) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      // return feed.getVolunteers(feed_id).$promise.then(success, failure);

      return $http.get(ENV.api_path + "api/v1/feeds/"+feed_id+"/users", {headers: { 'Authorization': localStorageService.get('auth-token') }}).then(success, failure);

    }

  };
  return obj;
});


