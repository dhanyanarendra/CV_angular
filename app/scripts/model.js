angular.module('PeershapeElectionAngularApp')

.factory('User', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/user/",

  {
    format: 'json'
  },
  {
    save: {
      method: "Post",
      url: ENV.api_path + "api/v1/users"
    }


  });
});

angular.module('PeershapeElectionAngularApp')

.factory('Member', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/authenticate/",

  {
    format: 'json'
  },
  {
    save: {
      method: "Post",
      url: ENV.api_path + "api/v1/authenticate"
    }
  });
});


angular.module('PeershapeElectionAngularApp')

.factory('resetPassword', function ($resource, ENV,localStorageService) {
  return $resource(ENV.api_path + "api/v1/forgot_password/",

  {
    format: 'json'
  },
  {
    forgot_password: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/forgot_password"
    },
    reset_password: {
      method: "Put",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/reset_password"
    }
  });
});


angular.module('PeershapeElectionAngularApp')

.factory('campaign', function ($resource, ENV,localStorageService) {
  return $resource(ENV.api_path + "api/v1/user/:id/campaign/",

  {
    format: 'json',
    id: '@id',
    camp_id: '@camp_id'


  },
  {
    campaign: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/user/:id/campaign"
    },

    getCampaignDetails: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/campaigns"
    }

  });
});

angular.module('PeershapeElectionAngularApp')

.factory('feed', function ($resource, ENV,localStorageService) {
  return $resource(ENV.api_path + "api/v1/campaign/:id/feeds/",

  {
    id: '@id',
    campaign_id: '@campaign_id',
    format: 'json'

  },
  {
     feed: {
      method: "Post",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/users/:id/campaign/:campaign_id/feed"
    },

    listfeed: {
      method: "get",
      headers: { 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/users/:id/campaign/:campaign_id/feeds"

    },

    getVolunteers: {
      method: "get",
      headers:{ 'Authorization': localStorageService.get('auth-token') },
      url: ENV.api_path + "api/v1/feeds/:feed_id/users"
    }

  });
});


angular.module('PeershapeElectionAngularApp')

.factory('profile', function ($resource, ENV, localStorageService) {
  return $resource(ENV.api_path + "api/v1/users/:id/campaign/:campaign_id/",

  {
    id: '@id',
    campaign_id: '@campaign_id',
    user_id: '@user_id',
    format: 'json'
  },
  {
    getDetails: {
      method: "get",
      url: ENV.api_path + "api/v1/users/:id/get_campaign_for_user"
    },

     deleteCamp: {
      method: "delete",
      url: ENV.api_path + "api/v1/campaign/:campaign_id"
    },

     inviteuser: {
      method: "post",
      url: ENV.api_path + "api/v1/users/:id/invites"
    },

      listcordinator: {
      method: "get",
      url: ENV.api_path + "api/v1/campaign/:campaign_id/cordinators"
    },

      deleteuser: {
      method: "delete",
      url: ENV.api_path + "api/v1/user/:user_id"
    }

  });
});


