'use strict';

var app = angular.module('scatterPlotApp');

app.controller('MainCtrl', function ($scope, $http, StockModel) {

  $scope.stockData = StockModel;





  $http.get('http://neilni.com/calculator/api').then(function(response) {
        $scope.items = response.data;
  });
  $scope.numerators = ['a_1', 'b_1'];
  $scope.denominators = ['a_2', 'b_2'];


  $scope.$watch('newDenominator', function(v){
    $scope.searchString = v;
  });

  $scope.printModel = function(){
	console.log($scope.stockData);
  }
  $scope.addNumerator = function() {
        $scope.numerators.push($scope.newNumerator);
        $scope.newNumerator = "";
	$scope.generateFinalExpression();
  }  
  $scope.addDenominator = function() {
        $scope.denominators.push($scope.newDenominator);
        $scope.newDenominator = "";
	$scope.generateFinalExpression();
  } 
 $scope.generateFinalExpression = function(){
 	var numeratorString = $scope.numerators.join().replace(/[,]/g,' \\times ');
 	var denominatorString = $scope.denominators.join().replace(/[,]/g,' \\times ');
  	$scope.finalExpression = "\\frac{"+numeratorString+"}{"+denominatorString+"}";
  }
});


app.filter('searchFor', function(){
  return function(arr, searchString){

  if(!searchString){
  return arr;
  }

  var result = [];

  searchString = searchString.toLowerCase();

  // Using the forEach helper method to loop through the array
  angular.forEach(arr, function(item){

	  if(item.name.toLowerCase().indexOf(searchString) !== -1){
	  result.push(item);
	  }

	  });

  return result;
  };

  });


