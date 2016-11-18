'use strict';

/**
 * @ngdoc overview
 * @name PeershapeElectionAngularApp
 * @description
 * # PeershapeElectionAngularApp
 *
 * Main module of the application.
 */
 angular
 .module('PeershapeElectionAngularApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'config',
  'LocalStorageModule',
  '720kb.datepicker',
  'ui.timepicker',
  'ui.mask'
  ])

 .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state("land", {
    url: "/signup",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/signup.html",
        controller: 'signupCtrl',
        controllerAs: 'signup'
      },

      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("signin", {
    url: "/signin",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/signin.html"

      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("resetPassword", {
    url: "/reset_password",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/reset_password.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })

  .state("forgotPassword", {
    url: "/forgot_password",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/forgot_password.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("resetPasswordSuccess", {
    url: "/reset_password_successful",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/reset_password_successful.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("dashboard", {
    url: "/dashboard",
    views: {
      "header": {
        templateUrl: "views/partials/header.html"
      },
      "content": {
        templateUrl: "views/contents/dashboard.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("dashboard-post", {
    url: "/dashboard_new_post",
    views: {
      "header": {
        templateUrl: "views/partials/header2.html",
        controller: "HeaderCtrl",
        controllerAs: "header"
      },
      "content": {
        templateUrl: "views/contents/dashboard_new_post.html",
        controller: "FeedCtrl",
        controllerAs: "feed"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("Create-campaign", {
    url: "/create_campaign",
    views: {
      "header": {
        templateUrl: "views/partials/header2.html"
      },
      "content": {
        templateUrl: "views/contents/create_campaign.html",
        controller: "CampaignCtrl",
        controllerAs: "campaign"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("Profile", {
    url: "/my_profile",
    views: {
      "header": {
        templateUrl: "views/partials/header2.html"
      },
      "content": {
        templateUrl: "views/contents/my_profile.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })
  .state("Manage-volunteers", {
    url: "/manage_volunteers",
    views: {
      "header": {
        templateUrl: "views/partials/header2.html"
      },
      "content": {
        templateUrl: "views/contents/manage_volunteers.html",
        controller: "managevolunteerCtrl",
        controllerAs: "managevolunteer"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })

  .state("privacy", {
    url: "/privacy",
    views: {
      "header": {
        templateUrl: "views/partials/header3.html",
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      },
      "content": {
        templateUrl: "views/contents/privacy.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })

  .state("terms", {
    url: "/terms",
    views: {
      "header": {
        templateUrl: "views/partials/header3.html",
        controller: 'HeaderCtrl',
        controllerAs: 'header'
      },
      "content": {
        templateUrl: "views/contents/terms.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })

   .state("contactUs", {
    url: "/contactUs",
    views: {
      "header": {
        templateUrl: "views/partials/header3.html"
      },
      "content": {
        templateUrl: "views/contents/contactUs.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })


   .state("aboutUs", {
    url: "/aboutUs",
    views: {
      "header": {
        templateUrl: "views/partials/header3.html"
      },
      "content": {
        templateUrl: "views/contents/aboutUs.html"
      },
      "footer": {
        templateUrl: "views/partials/footer.html"
      }
    }
  })

    .state("users", {
    url: "/users",
    views: {

      "header": {
        templateUrl: "views/partials/user_header.html"
      },
       "content": {
        templateUrl: "views/contents/users.html"
      }

    }
  });

  return $urlRouterProvider.otherwise('/signin');


});
