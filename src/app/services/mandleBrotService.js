angular.module('lauraBrot')
  .service('MandleBrotService', function () {//$timeout, $interval, 
    'use strict'; 
    console.log('MandleBrotService Reporting in');
    var _this = this;
    _this.levelOne1d = function (point) {
      var result;
      if ((point * point) > 2){
        result = 1;
      } else {
        result = 0;
      }
      return result
    }
    _this.levelOne2d = function (pointX, pointY) {
      var result;
      if ((pointY * pointY)+(pointX * pointX) > 2){
        result = 0;
      } else {
        result = 1;
      }
      return result
    }
    _this.nthLevel2d = function (pointX, pointY, depth) {
      var result;
      
      depth = depth || 10;
      
      var a = pointX;
      var b = pointY;
      
      var i = 0;
      while (i < depth) {
        var aa = a * a;
        var bb = b * b;
        var twoab = 2 * a * b;
        a = aa - bb + pointX;
        b = twoab + pointY;
        if (aa + bb > 16){
          return i;
        }
        i++;
      }

      return i;
    }
    
    _this.mandlebrotPoints2D = function (config) {
      var startX = config.startX || -2;
      var stopX = config.stopX || 2;
      var pointsX = config.pointsX || 40; 
      var startY = config.startY || -2;
      var stopY = config.stopY || 2;
      var pointsY = config.pointsY || 40;
      var depth = config.depth || 1;
      
      var lauraBrot = [];

      if (startX > stopX) {
        var swapX;
        swapX = stopX;
        stopX = startX;
        startX = swapX;
      }
      if (startY > stopY) {
        var swapY;
        swapY = stopY;
        stopY = startY;
        startY = swapY;
      }
      
      var countX = 0;
      var resultX = [];
      while (countX <= pointsX) {
        var pointX = startX + ((stopX - startX) / pointsX) * countX;
        var countY = 0;
        var resultY = [];
        lauraBrot[countX] = [];
        while (countY <= pointsY) {
          var pointY = startY + ((stopY - startY) / pointsY) * countY;
          var value;
          if (depth === 1) {
            value = _this.levelOne2d(pointX, pointY);
          }else{
            value = _this.nthLevel2d(pointX, pointY, depth);
          }
          lauraBrot[countX].push( {
            value: value,
            x: pointX,
            y: pointY
          });
          countY++;
        }
        countX++;
      }

      return lauraBrot;
    }
    _this.mandlebrotPoints1D = function (start, stop, points) {
      if (points <= 0) {
        return [];
      }
      if (points === undefined) {
        points = 10;
        console.log('default number of points', 0);
      }
      if (start === undefined) {
        start = 0;
        console.log('default start value', 0);
      }
      if (stop === undefined) {
        stop = 1;
        console.log('default stop value', 1);
      }
      if (start > stop) {
        var swap;
        swap = stop;
        stop = start;
        start = swap;
      }
      var count = 0;
      var resultArray = [];
      while (count <= points) {
        var point = start + ((stop - start) / points) * count;
        // console.log(
        //   'point: ((stop - start) / points) * count = ',
        //   '((' + stop + '-' + start + ') / ' +points + ') * ' + count + ') = ', 
        //   point);
        resultArray.push(_this.levelOne1d(point));
        count++;
      }
      return resultArray;
    };
    
    return _this;
});