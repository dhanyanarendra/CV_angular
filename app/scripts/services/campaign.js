'use strict';

/**
 * @ngdoc function
 * @name startApp.Service:Getapiservice
 * @description
 * # Getapi
 * Controller of the startApp
 */

 angular.module('PeershapeElectionAngularApp')
 .factory('campaignService', function ($http, ENV, localStorageService,campaign) {
  var obj = {
    postData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return campaign.campaign(params).$promise.then(success, failure);

    },

    getData: function(params) {
      function success (response) {
        return response;
      }
      function failure (response) {
        return response;
      }
      return campaign.getCampaignDetails(params).$promise.then(success, failure);

    },
  };
  return obj;
});