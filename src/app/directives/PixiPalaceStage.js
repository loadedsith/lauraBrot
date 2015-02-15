angular.module('lauraBrot')
  .directive('pixiPalaceStage', [function () {//$timeout, $interval, 
    'use strict'; 
    console.log('PixiPalaceStage reporting in');



    return {
      scope:{
        width:'=',
        height:'=',
        pixels:'='
      },
      link: function(scope, element) { //scope, element, attrs
        
       
      },
      restrict: 'A'
    };

  }]);