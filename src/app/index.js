'use strict';

angular.module('lauraBrot', [
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'mm.foundation',
  'xeditable'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }).run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
;
