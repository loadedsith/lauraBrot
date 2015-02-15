angular.module('lauraBrot')
  .directive('pixiPalaceStage', ['PixiPalaceService',function (PixiPalaceService) {//$timeout, $interval, 
    'use strict'; 
    console.log('PixiPalaceStage reporting in');



    return {
      scope:{
        width:'=',
        height:'=',
        pixels:'='
      },
      link: function(scope, element) { //scope, element, attrs
        var pixiService = PixiPalaceService;
        
        pixiService.stage  =  new pixiService.pixi.Stage(0x66FF99);

        pixiService.renderer  = pixiService.pixi.autoDetectRenderer(scope.width, scope.height);

        scope.colors = [
         0xFF700B,
         0xFF0000,
         0xFFFF00,
         0xFFFFFF,
         0x00FFFF,
         0x0000FF,
         0x000000
        ];
        
        scope.pixelsTexture = function (pixels) {
          var count = 0;
          if(pixels!==null){
            for (var i = pixels.length - 1; i >= 0; i--) {
              var pixelsY = pixels[i]
              for (var ii = pixelsY.length - 1; ii >= 0; ii--) {
                var pixel = pixelsY[ii];
                if(pixel.value>2){
                  scope.graphics.beginFill(scope.colors[pixel.value%6], 1);
                  scope.graphics.drawRect(i,ii,1,1);
                  
                }
                count++;
              }
            }
          }
          console.log('count', count);
        };
        
        scope.graphics = new pixiService.pixi.Graphics();

        // set a fill and line style again
        scope.graphics.lineStyle(10, scope.colors[0], 0)
        scope.graphics.beginFill(scope.colors[0], 1);
        pixiService.stage.addChild(scope.graphics);
        angular.element(element)[0].appendChild(pixiService.renderer.view);
        
        requestAnimFrame( animate );
        function animate() {
          if (typeof scope.pixels === 'function'){
            scope.pixelsTexture(scope.pixels())
          }else{
            requestAnimFrame( animate );
          }
          pixiService.renderer.render(pixiService.stage);
        }
      },
      restrict: 'A'
    };

  }]);