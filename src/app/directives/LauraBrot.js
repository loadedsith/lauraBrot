angular.module('lauraBrot')
  .directive('lauraBrot', ['MandleBrotService',function (MandleBrotService) { 
    'use strict'; 
    console.log('LauraBrot reporting in');

    return {
      scope: {
        start: '=',
        stop: '=',
        points: '=',
        startX: '=',
        stopX: '=',
        pointsX: '=',
        startY: '=',
        stopY: '=',
        pointsY: '=',
        depth: '=',
        dimentions: '='
      },
      template:'<div pixi-palace-stage width="pointsY" height="pointsX" pixels="getPixels"></div><div>{{pa}}</div>',
      link: function(scope, element) { //scope, element, attrs
        scope.getPixels = function () {
          return scope.results;
        }
        if (scope.dimentions === undefined || scope.dimentions !== 2) {
          angular.element(element)[0].innerHTML = JSON.stringify(MandleBrotService.mandlebrotPoints1D(scope.start, scope.stop, scope.points));
        }else{
          var config = {
            startX: scope.startX || scope.start || -2,
            stopX: scope.stopX || scope.stop || 2,
            pointsX: scope.pointsX || scope.points || 40,
            startY: scope.startY || scope.start || -2,
            stopY: scope.stopY || scope.stop || 2,
            pointsY: scope.pointsY || scope.points || 40,
            depth:scope.depth||15
          }
          
          var points = MandleBrotService.mandlebrotPoints2D(config);
          var pa;
          for (var i = points.length - 1; i >= 0; i--) {
            var pointRow = points[i];
            for (var ii = pointRow.length - 1; ii >= 0; ii--) {
              var point = pointRow[ii];
              pa = (pa || '') + ',' + point.value;

            }
            pa = pa + "\n\r";
          }
          scope.pa = pa;
          scope.results = points;
        }
      },
      restrict: 'A'
    };

  }]);