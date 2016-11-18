'use strict';

/**
 * @ngdoc function
 * @name PeershapeElectionAngularApp.controller:GetapiCtrl
 * @description
 * # Getapi
 * Controller of the PeershapeElectionAngularApp
 */
angular.module('PeershapeElectionAngularApp')
  .controller('GetapiCtrl', function (Dataservice) {

  	var viewModel = this;
  	viewModel.dataObj = {};

  	Dataservice.getData().then(function(response) {
  		viewModel.dataObj = response.records;
  	});

  });
