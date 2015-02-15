'use strict';

angular.module('lauraBrot')
  .controller('MainCtrl', function ($scope) {
    console.log('MainCtrl');
    $scope.colors = ['#FF700B','#FF0000','#FFFF00','#FFFFFF','#00FFFF','#0000FF','#000000'];
    $scope.saveColor = function (color, index) {
      $scope.colors[index]=color;
    }
    $scope.startX = -2.1;
    $scope.startY = -2.1;
    $scope.stopX = 2.1;
    $scope.stopY = 2.1;
    $scope.depth = 24;
    $scope.pixelsHeight = 130;
    $scope.pixelsWidth = 130;
    $scope.autoSize = function () {
      $scope.pixelsHeight=angular.element('.display')[0].offsetHeight;
      $scope.pixelsWidth=angular.element('.display')[0].offsetWidth;
    }
  });
