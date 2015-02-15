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
        colors: '=',
        dimentions: '='
      },
      link: function(scope, element) { //scope, element, attrs
        scope.getPixels = function () {
          return scope.results;
        };
        
        scope.clickThing = function ($event) {
          var width = scope.config.stopX - scope.config.startX;
          var height = scope.config.stopY - scope.config.startY; 
          var centerWidth = (scope.config.stopX + scope.config.startX) / 2;
          var centerHeight = (scope.config.stopY + scope.config.startY) / 2;
          
          width = width * 0.9 + width/$event.offsetX;;
          height = height * 0.9;
          
          scope.config.startX = centerWidth - (width / 2);
          scope.config.stopX = centerWidth + (width / 2);

          scope.config.startY = centerHeight - (height / 2);
          scope.config.stopY = centerHeight + (height / 2);
          
          scope.generateDisplay();
        };
        element.bind('click', scope.clickThing);
        
        scope.config = {
          startX: scope.startX || scope.start || -2,
          stopX: scope.stopX || scope.stop || 2,
          pointsX: scope.pointsX || scope.points || 40,
          startY: scope.startY || scope.start || -2,
          stopY: scope.stopY || scope.stop || 2,
          pointsY: scope.pointsY || scope.points || 40,
          colors: scope.colors || ['#ff00ff'],
          depth: scope.depth || 15
        };
        
        scope.canvas = document.createElement('canvas');
        
        
        scope.context = scope.canvas.getContext('2d');
        angular.element(element)[0].appendChild(scope.canvas);
        scope.pixelsTexture = function (pixels) {
          var count = 0;
          if(pixels!==null){
            for (var i = pixels.length - 1; i >= 0; i--) {
              var pixelsY = pixels[i]
              for (var ii = pixelsY.length - 1; ii >= 0; ii--) {
                var pixel = pixelsY[ii];
                if (pixel > 2) {
                  scope.context.fillStyle = scope.config.colors[pixel%scope.config.colors.length]||'#ff00ff';
                  scope.context.fillRect(i,ii,1,1); 
                }
                count++;
              }
            }
          }
        };
        scope.generateDisplay = function () {
          
          var points = MandleBrotService.mandlebrotPoints2D(scope.config);

          scope.canvas.height = scope.config.pointsX;
          scope.canvas.width = scope.config.pointsY;
          // set a fill and line style again
          scope.context.strokeStyle = scope.config.colors[0];
          scope.context.fillStyle = scope.config.colors[0];

          scope.results = points;
          
        };
        
        if (scope.dimentions === undefined || scope.dimentions !== 2) {
          angular.element(element)[0].innerHTML = JSON.stringify(MandleBrotService.mandlebrotPoints1D(scope.config.start, scope.config.stop, scope.config.points));
        }else{
          scope.generateDisplay()
        }
        requestAnimFrame( animate );
        function animate() {
          scope.pixelsTexture(MandleBrotService.mandlebrotPoints2D(scope.config))
          requestAnimFrame( animate );
        }
       
        scope.$watch('depth',function (newValue,oldValue) {
          scope.config.depth = Number(newValue);
          console.log('depth', scope.config.depth);
          scope.generateDisplay();
        });
        scope.$watch('startX',function (newValue,oldValue) {
          scope.config.startX = Number(newValue);
          console.log('startX', scope.config.startX);
          scope.generateDisplay();
        });
        scope.$watch('startY',function (newValue,oldValue) {
          scope.config.startY = Number(newValue);
          console.log('startY', scope.config.startY);
          scope.generateDisplay();
        });
        scope.$watch('stopX',function (newValue,oldValue) {
          scope.config.stopX = Number(newValue);
          console.log('stopX', scope.config.stopX);
          scope.generateDisplay();
        });
        scope.$watch('stopY',function (newValue,oldValue) {
          scope.config.stopY = Number(newValue);
          console.log('stopY', scope.config.stopY);
          scope.generateDisplay();
        });
        
        scope.$watch('pointsX',function (newValue,oldValue) {
          scope.config.pointsX = Number(newValue);
          scope.generateDisplay();
        })
        scope.$watch('pointsY',function (newValue,oldValue) {
          scope.config.pointsY = Number(newValue);
          scope.generateDisplay()
        })
      },
      restrict: 'A'
    };

  }]);