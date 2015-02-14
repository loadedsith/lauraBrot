angular.module('lauraBrot')
  .directive('pixiPalaceStage', ['PixiPalaceService',function (PixiPalaceService) {//$timeout, $interval, 
    'use strict'; 
    console.log('PixiPalaceStage reporting in');



    return {
      link: function(scope, element) { //scope, element, attrs
        var pixiService = PixiPalaceService;

        pixiService.stage  =  new pixiService.pixi.Stage(0x66FF99);
        pixiService.renderer  = pixiService.pixi.autoDetectRenderer(400, 300);

        angular.element(element)[0].appendChild(pixiService.renderer.view);

        requestAnimFrame( animate );
        function animate() {
          requestAnimFrame( animate );
          pixiService.renderer.render(pixiService.stage);
        }
      },
      restrict: 'A'
    };

  }]);