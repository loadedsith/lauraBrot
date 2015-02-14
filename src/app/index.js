'use strict';

angular.module('lauraBrot', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'mm.foundation'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
