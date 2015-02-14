angular.module('lauraBrot')
  .service('MandleBrotService', function () {//$timeout, $interval, 
    'use strict'; 
    console.log('MandleBrotService Reporting in');
    var _this = this;
    _this.levelOne = function (point) {
      var result;
      if ((point * point) > 2){
        result = 1;
      } else {
        result = 0;
      }
      return result
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
      var currentPoint = start;
      var count = 0;
      var resultArray = [];
      while (count <= points) {
        var point = start + ((stop - start) / points) * count;
        console.log(
          'point: ((stop - start) / points) * count = ',
          '((' + stop + '-' + start + ') / ' +points + ') * ' + count + ') = ', 
          point);
        resultArray.push(_this.levelOne(point));
        count++;
      }
      return resultArray;
    };
    
    return _this;
});