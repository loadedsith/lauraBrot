angular.module('lauraBrot')
  .directive('lauraBrot', ['MandleBrotService',function (MandleBrotService) { 
    'use strict'; 
    console.log('LauraBrot reporting in');

    return {
      scope: {
        start: '=',
        stop: '=',
        points: '='
      },
      link: function(scope, element) { //scope, element, attrs
        angular.element(element)[0].innerHTML = JSON.stringify(MandleBrotService.mandlebrotPoints1D(scope.start, scope.stop, scope.points));
      },
      restrict: 'A'
    };

  }]);