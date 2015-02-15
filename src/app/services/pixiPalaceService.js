angular.module('lauraBrot')
  .service('PixiPalaceService', function () {//$timeout, $interval, 
    'use strict'; 
    
    console.log('PixiPalaceService Reporting in');
    var pixiPalace = this;
    if (PIXI === undefined) {
      console.log('PIXI is undefined, have you loaded pixi.js properly?');
    }else{
      pixiPalace.pixi = PIXI;
      pixiPalace.textures = [];
      pixiPalace.objects = [];
    }
    
});