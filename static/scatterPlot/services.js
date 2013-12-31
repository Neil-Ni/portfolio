'use strict';

var services = angular.module('scatterPlotApp.services', [])

services.factory('StockModel', function ($http) {
    var obj = {content:null};

    $http.get('/static/scatterPlot/stocksTest.json').success(function(data) {
        // you can do some processing here
        obj.content = data;
    });    

    return obj;  
});


