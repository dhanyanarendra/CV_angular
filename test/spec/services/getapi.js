'use strict';

describe('Dataservice', function() {
  var dataservice, httpBackend;
  dataservice = null;
  httpBackend = null;
  beforeEach(module('PeershapeElectionAngularApp'));

  beforeEach(inject(function(_Dataservice_, $httpBackend) {
    dataservice = _Dataservice_;
    httpBackend = $httpBackend;
  }));

  describe('Service API returns success', function() {
    it("returns a promise that will give the success callback", function() {

      var apiResponse, result;

      apiResponse = { "records": [{"Name":"Around the Horn","City":"London","Country":"UK"},
        {"Name":"Bottom-Dollar Marketse","City":"Tsawassen","Country":"Canada"},
        {"Name":"Cactus Comidas para llevar","City":"Buenos Aires","Country":"Argentina"},
        {"Name":"Comércio Mineiro","City":"São Paulo","Country":"Brazil"} ] };

      httpBackend.expectGET("http://www.w3schools.com/angular/customers.php").respond(function() {
        return [200, apiResponse];
      });

      result = dataservice.getData();
      result.then(function(response) {
        expect(response).toEqual(apiResponse);
      });

      httpBackend.flush();
    });
  });
});